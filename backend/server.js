import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from './db.js';
import User from './models/User.js';
import Scan from './models/Scan.js';
import SearchHistory from './models/SearchHistory.js';

dotenv.config();

// ✅ Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load Crop Diseases Dataset
let cropDiseasesDataset = [];
const datasetPath = path.join(__dirname, 'crop_diseases_dataset.json');

try {
  if (fs.existsSync(datasetPath)) {
    cropDiseasesDataset = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
    console.log(`📊 Loaded ${cropDiseasesDataset.length} records from crop diseases dataset.`);
  } else {
    console.log(`⚠️ Crop diseases dataset not found at ${datasetPath}. Starting with empty dataset.`);
  }
} catch (error) {
  console.error(`❌ Failed to load crop diseases dataset:`, error);
}

const soilTypes = ["Alluvial", "Black Soil", "Red Soil", "Laterite", "Sandy", "Clayey", "Loamy", "Silty"];
const irrigationTypes = ["Drip", "Sprinkler", "Rainfed", "Canal Irrigation", "Tubewell"];
const fertilizerTypes = ["Organic Compost", "NPK (19:19:19)", "Urea (Nitrogen)", "DAP (Phosphorus)", "Potash", "None"];
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];


const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Request Logger
app.use((req, res, next) => {
  console.log(`📡 ${req.method} request to ${req.url}`);
  if (req.method === 'POST') console.log('📦 Body:', req.body);
  next();
});

// ✅ Health Check
app.get('/', (req, res) => {
  res.send('🚀 CropCare Backend is LIVE and connected to MongoDB!');
});

// ✅ Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden: Invalid token' });
    req.user = user;
    next();
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync('uploads/')) fs.mkdirSync('uploads/');
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// ✅ Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Auth: Register
app.post('/api/auth/register', async (req, res) => {
  const { name, full_name, email, password, land_size } = req.body;
  const displayName = name || full_name;

  try {
    if (!displayName) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      full_name: displayName,
      email,
      password: hashedPassword,
      land_size: land_size || 0
    });

    const token = jwt.sign({ id: user._id, email }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      token,
      user: { 
        id: user._id, 
        name: displayName,
        full_name: displayName, 
        email, 
        land_size: user.land_size 
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to register' });
  }
});

// ✅ Auth: Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      token,
      user: {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        location: user.location,
        crop_type: user.crop_type
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// ✅ Auth: Get Profile
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// ✅ Convert file → base64 (for Gemini)
function fileToGenerativePart(filePath, mimeType) {
  return {
    inlineData: {
      data: fs.readFileSync(filePath).toString("base64"),
      mimeType
    },
  };
}

app.post('/api/analyze', [authenticateToken, upload.single('image')], async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const filePath = path.join(__dirname, req.file.path);
    const imageUrl = `/uploads/${req.file.filename}`;

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest"
    });

    const prompt = `
You are an expert plant pathologist.
Analyze this crop leaf image.
Return ONLY valid JSON:
{
  "disease_name": "Name or 'Healthy Plant'",
  "confidence": number (0 to 1),
  "severity": "High | Medium | Low | None",
  "remedies": "Short treatment advice"
}
`;

    const imagePart = fileToGenerativePart(filePath, req.file.mimetype);
    const result = await model.generateContent([imagePart, prompt]);
    let responseText = result.response.text().trim();

    if (responseText.startsWith('```')) {
      responseText = responseText.replace(/```json|```/g, '').trim();
    }

    const parsed = JSON.parse(responseText);

    // ✅ Save to MongoDB
    const scan = await Scan.create({
      user_id: req.user.id,
      image_url: imageUrl,
      disease_name: parsed.disease_name,
      confidence: parsed.confidence,
      severity: parsed.severity,
      remedies: parsed.remedies
    });

    res.json({
      id: scan._id,
      image_url: imageUrl,
      ...parsed
    });

  } catch (error) {
    console.error("❌ Error analyzing image:", error);
    res.status(500).json({
      error: "Failed to analyze image",
      details: error.message
    });
  }
});

// ✅ YouTube API Proxy
app.get('/api/youtube/search', async (req, res) => {
  const { query } = req.query;
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'YouTube API Key not configured' });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${encodeURIComponent(query + ' agriculture farming tutorial')}&type=video&key=${API_KEY}`
    );
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    const videos = data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumb: item.snippet.thumbnails.high.url,
      channel: item.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));

    res.json(videos);
  } catch (error) {
    console.error("❌ YouTube API Error:", error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

// ✅ History API (Filtered by user)
app.get('/api/history', authenticateToken, async (req, res) => {
  try {
    const scans = await Scan.find({ user_id: req.user.id }).sort({ created_at: -1 });
    res.json(scans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// ✅ Gemini Disease Encyclopedia API (checks local datafile first, auto-stores if missing)
app.get('/api/knowledge/diseases', authenticateToken, async (req, res) => {
  const { crop } = req.query;
  
  if (!crop) {
    return res.status(400).json({ error: 'Crop parameter is required' });
  }

  try {
    const cleanCropQuery = crop.trim().toLowerCase();
    const foundDiseases = cropDiseasesDataset.filter(
      d => d.crop_name.toLowerCase() === cleanCropQuery || d.crop_name.toLowerCase().includes(cleanCropQuery)
    );

    if (foundDiseases.length > 0) {
      console.log(`📦 Found crop "${crop}" in local dataset with ${foundDiseases.length} diseases.`);
      const results = foundDiseases.map(d => ({
        name: d.disease_name || "Unknown Disease",
        crop: d.crop_name || "Unknown Crop",
        severity: d.severity || "Medium",
        symptoms: d.symptoms || "No symptoms described.",
        causes: d.causes || "Unknown cause.",
        prevention: d.prevention || "No prevention steps specified.",
        treatment: d.treatment || "No treatment steps specified.",
        image: d.image || `https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800`
      }));

      // Save to query history
      await SearchHistory.create({
        user_id: req.user.id,
        query: crop,
        results,
        source: 'datafile'
      });

      return res.json(foundDiseases.map(d => ({
        id: d.id,
        name: d.disease_name,
        crop: d.crop_name,
        severity: d.severity,
        symptoms: d.symptoms,
        causes: d.causes,
        prevention: d.prevention,
        treatment: d.treatment,
        image: d.image || `https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800`
      })));
    }

    console.log(`🔍 Crop "${crop}" not found in local dataset. Querying Gemini AI...`);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const prompt = `
      You are an agricultural expert.
      Generate a list of the 3 most common diseases for the crop: "${crop}".
      For each disease, provide:
      - name: Common name of the disease
      - crop: The crop name
      - severity: High, Medium, or Low
      - symptoms: Brief description of symptoms
      - causes: What causes it (fungal, bacterial, etc.)
      - prevention: How to prevent it
      - treatment: How to treat it
      
      Return ONLY valid JSON in this format (an array of objects):
      [
        {
          "name": "...",
          "crop": "...",
          "severity": "...",
          "symptoms": "...",
          "causes": "...",
          "prevention": "...",
          "treatment": "..."
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text().trim();

    if (responseText.startsWith('```')) {
      responseText = responseText.replace(/```json|```/g, '').trim();
    }

    const diseases = JSON.parse(responseText);
    
    // Auto-store new records in dataset
    const newRecords = diseases.map((d, idx) => {
      const newId = cropDiseasesDataset.length + idx + 1;
      const soil = pickRandom(soilTypes);
      const pH = parseFloat((Math.random() * (7.5 - 5.5) + 5.5).toFixed(1));
      const temp = Math.round(Math.random() * (33 - 18) + 18);
      const humidity = Math.round(Math.random() * (90 - 50) + 50);
      const irrigation = pickRandom(irrigationTypes);
      const fertilizer = pickRandom(fertilizerTypes);
      const sunlight = Math.round(Math.random() * (10 - 5) + 5);

      return {
        id: newId,
        crop_name: d.crop || crop || "Unknown Crop",
        variety: "Unknown/Standard",
        disease_name: d.name || "Unknown Disease",
        severity: d.severity || "Medium",
        symptoms: d.symptoms || "No symptoms described.",
        causes: d.causes || "Unknown cause.",
        prevention: d.prevention || "No prevention steps specified.",
        treatment: d.treatment || "No treatment steps specified.",
        field_conditions: {
          soil_type: soil,
          soil_pH: pH,
          temperature_celsius: temp,
          humidity_percentage: humidity,
          irrigation_type: irrigation,
          sunlight_hours: sunlight,
          fertilizer_used: fertilizer
        }
      };
    });

    cropDiseasesDataset.push(...newRecords);
    
    // Write back to dataset file
    fs.writeFileSync(datasetPath, JSON.stringify(cropDiseasesDataset, null, 2), 'utf-8');
    console.log(`💾 Automatically stored ${newRecords.length} new records for "${crop}" in the datafile.`);

    const enrichedDiseases = newRecords.map(d => ({
      id: d.id,
      name: d.disease_name,
      crop: d.crop_name,
      severity: d.severity,
      symptoms: d.symptoms,
      causes: d.causes,
      prevention: d.prevention,
      treatment: d.treatment,
      image: `https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800`
    }));

    // Log this search history to MongoDB
    await SearchHistory.create({
      user_id: req.user.id,
      query: crop,
      results: enrichedDiseases.map(d => ({
        name: d.name,
        crop: d.crop,
        severity: d.severity,
        symptoms: d.symptoms,
        causes: d.causes,
        prevention: d.prevention,
        treatment: d.treatment,
        image: d.image
      })),
      source: 'gemini'
    });

    res.json(enrichedDiseases);
  } catch (error) {
    console.error("❌ Gemini Encyclopedia Error:", error);
    res.status(500).json({ error: 'Failed to fetch disease data' });
  }
});

// ✅ Search History API (Filtered by user)
app.get('/api/history/searches', authenticateToken, async (req, res) => {
  try {
    const history = await SearchHistory.find({ user_id: req.user.id }).sort({ created_at: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch search history' });
  }
});

// ✅ Start server after DB connection
connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running at http://127.0.0.1:${PORT}`);
    console.log(`🍃 Connected to MongoDB: "crop"`);
  });
});