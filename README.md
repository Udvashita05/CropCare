# 🌿 CropCare AI: Intelligent Agricultural Diagnostic & Decision Platform

CropCare AI is a state-of-the-art, offline-first Web Application (PWA) designed to empower farmers and agricultural experts with real-time plant disease detection, smart weather-based crop advisories, specialized soil/fertilizer calculator utilities, and a dynamic localized encyclopedia.

Powered by **Gemini AI (`gemini-flash-latest`)**, the system parses leaf photos to identify pathogens, evaluate confidence scores, and deliver instant remedy recommendations in 10 regional Indian languages.

---

## 🚀 Key Features

*   **📷 AI-Powered Leaf Disease Diagnostics:** Upload or take a picture of a diseased leaf. The backend leverages Google Generative AI to diagnose the disease, evaluate severity (High/Medium/Low/None), and generate treatment remedies.
*   **📶 Offline-First Architecture (PWA):** Equipped with a custom service worker (`sw.js`) and cache manifest. When internet connectivity is lost, scans are automatically serialized into `base64` and queued inside the browser's `localStorage` to be synced automatically when connection resumes.
*   **📖 Dynamic Local Disease Encyclopedia:** Contains **2,300+** pre-generated crop condition records covering **15 major crops** (Rice, Wheat, Tomato, Potato, Cotton, Corn, Soybean, Apple, Banana, Grape, Mango, Sugarcane, Orange, Coffee, Onion) and their specific varieties.
*   **🤖 Self-Updating Dataset Cache:** If a user searches the Encyclopedia for a crop not currently indexed in the local JSON dataset, the backend queries Gemini AI, simulates appropriate soil/weather parameters, and dynamically appends the new crop data to the persistent file.
*   **🌦️ Weather-Smart Agricultural Advisories:** Displays current meteorological data and prompts farmers with smart notifications (e.g., advising against pesticide spraying before rain, or increasing irrigation during extreme heat waves).
*   **🌐 10-Language Multi-lingual Localization:** Accessible in English, Bengali (বাংলা), Hindi (हिन्दी), Marathi (मराठी), Tamil (தமிழ்), Telugu (తెలుగు), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), Gujarati (ગુજરાતી), and Punjabi (ਪੰਜਾਬੀ).
*   **📐 Fertilizer Dosage Calculator:** Automatically calculates chemical or organic fertilizer requirements (e.g., Urea, NPK, Potash) tailored to the farmer's registered acreage size and provides links to purchase products.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, Lucide Icons, HTML5 Canvas, PWA Service Workers |
| **Backend** | Node.js, Express, Multer (multipart uploads), Google Generative AI SDK (`@google/generative-ai`) |
| **Database** | MongoDB, Mongoose ODM |
| **Data Generation** | Node combinatorics script (`generate_dataset.js`) |

---

## 📂 Project Directory Structure

```text
CropCare/
├── start.bat                       # One-click startup script for backend, frontend & browser
├── README.md                       # Project documentation (this file)
│
├── backend/                        # Express API Backend
│   ├── server.js                   # Entry server, routes, Gemini integration & upload handlers
│   ├── db.js                       # MongoDB Mongoose connection config
│   ├── generate_dataset.js         # Combinatorial script to pre-build crop diseases
│   ├── crop_diseases_dataset.json  # 2,300 entry pre-generated JSON database
│   ├── models/                     # Mongoose Schemas (User, Scan, SearchHistory)
│   └── uploads/                    # Local storage for leaf scans
│
└── frontend/                       # Vite + React Frontend
    ├── index.html                  # App DOM mount point & PWA meta headers
    ├── tailwind.config.js          # Design token configuration (nature theme colors)
    ├── public/                     # Static assets (manifest.json, sw.js, image assets)
    └── src/                        # React Source Code
        ├── main.jsx                # Unified app core (routes, contexts, views, & components)
        └── index.css               # Global styling, keyframes, custom utility components
```

---

## ⚡ Setup & Installation

### 1. Prerequisites
Ensure you have the following installed on your local machine:
*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [MongoDB Community Server](https://www.mongodb.com/try/download/community) (running locally on port `27017`)

---

### 2. Environment Configurations
Create a `.env` file inside the `backend` directory.

**File Path:** `backend/.env`
```env
PORT=5000
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/cropcare
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
YOUTUBE_API_KEY=your_youtube_v3_api_key
```

---

### 3. Installing Dependencies

Install dependencies for both the backend and frontend:

```bash
# Install Backend dependencies
cd backend
npm install

# Install Frontend dependencies
cd ../frontend
npm install
```

---

### 4. Seed/Generate the Crop Disease Dataset (Optional)
If you need to regenerate or initialize the 2,300+ local disease profiles:
```bash
cd backend
node generate_dataset.js
```

---

### 5. Running the Application

#### A. Automatic (Windows)
Double-click the **`start.bat`** file in the root directory. This script will:
1. Kill any conflicting Node.js instances.
2. Initialize the backend server on `http://127.0.0.1:5000`.
3. Launch the Vite dev server on `http://127.0.0.1:5173`.
4. Open the application directly in your default browser.

#### B. Manual (Command Line)
If you are on macOS/Linux or prefer manual execution, open two terminals:

```bash
# Terminal 1: Backend
cd backend
node server.js

# Terminal 2: Frontend
cd frontend
npm run dev
```

---

## 🔌 API Documentation

| Endpoint | Method | Authentication | Description |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | `POST` | None | Register a new farmer profile. |
| `/api/auth/login` | `POST` | None | Authenticate credentials and receive a JWT. |
| `/api/auth/me` | `GET` | JWT | Fetch authenticated farmer profile metrics. |
| `/api/analyze` | `POST` | JWT | Upload leaf scan, parse using Gemini AI, and log in DB. |
| `/api/knowledge/diseases` | `GET` | JWT | Query crop diseases dataset (with dynamic Gemini-AI fallback). |
| `/api/history` | `GET` | JWT | Retrieve all historical scan records for the logged-in user. |
| `/api/history/searches` | `GET` | JWT | Retrieve encyclopedia search history logs. |
| `/api/youtube/search` | `GET` | None | Proxy search requests to YouTube API for agricultural tutorials. |

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
