import { Sun, Moon, Leaf, CloudRain, Thermometer, AlertCircle, Star, MessageSquare, Send, CheckCircle2, ArrowRight, ShieldAlert, User, MapPin, Sprout, LogOut, Sparkles, Bug, Bird, Camera, Image as ImageIcon, Loader2, UploadCloud, CloudOff, ChevronLeft, Droplets, Info, Volume2, ShoppingCart, Scale, ExternalLink, Calendar, ChevronRight, CloudUpload, Search, ChevronDown, ChevronUp, Clock, Wind, Mail, Lock, ArrowLeft, ShieldCheck, Filter, AlertTriangle, X, Snowflake, Target, Zap, FlaskConical, Landmark, Mic, Minimize2, Bot, BookOpen, LayoutGrid, CloudSun, Quote, Users, Home, Heart, HeartPulse, ScanLine, History, Wifi, WifiOff, RefreshCw, CheckCircle, Play, TrendingUp } from 'lucide-react';
import React, { createContext, useState, useEffect, useContext, useRef, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useNavigate, useLocation, Navigate, Link, NavLink, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';


// ==========================================
// FILE: config.js
// ==========================================
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';


// ==========================================
// FILE: context/AuthContext.jsx
// ==========================================
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetchProfile();
    } else {
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      } else {
        logout();
      }
    } catch (err) {
      console.error('Profile fetch failed, loading from local cache...', err);
      const cachedUser = localStorage.getItem('user');
      if (cachedUser) {
        setUser(JSON.parse(cachedUser));
      }
    } finally {
      setLoading(false);
    }
  };

  const signup = async (formData) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
    } else {
      throw new Error(data.error || 'Signup failed');
    }
  };

  const login = (userData, userToken) => {
    setToken(userToken);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


// ==========================================
// FILE: context/LanguageContext.jsx
// ==========================================
const LanguageContext = createContext();

export const translations = {
  en: {
    appName: 'CropCare AI',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    name: 'Full Name',
    emailPhone: 'Phone or Email',
    password: 'Password',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    scan: 'Scan',
    history: 'History',
    home: 'Home',
    uploadTitle: 'Upload Leaf Image',
    uploadDesc: 'Take a photo of the affected plant leaf to detect diseases.',
    analyze: 'Analyze Image',
    analyzing: 'Analyzing...',
    retake: 'Retake',
    results: 'Detection Results',
    healthy: 'Healthy',
    disease: 'Disease Detected',
    warning: 'Warning',
    confidence: 'Confidence',
    weatherAlert: 'Weather Alert',
    advice: 'Treatment Advice',
    fertilizer: 'Fertilizer Recommendation',
    temp: 'Temperature',
    rain: 'Rain Probability',
    smartAlertRain: 'Rain expected: Avoid spraying fertilizer today.',
    smartAlertHeat: 'High heat: Increase irrigation to protect crops.',
    smartAlertClear: 'Weather is clear: Good time for maintenance.',
    voiceOutput: 'Listen to Results',
    placeholderName: 'Enter your name',
    placeholderEmail: 'Enter phone or email',
    placeholderPass: 'Enter password',
    landSize: 'Land Size (Acres)',
    placeholderLand: 'How many acres of land?',
    cropDetails: 'Crop Details',
    cropVariety: 'Crop Variety',
    soilType: 'Soil Type',
    plantingDate: 'Planting Date',
    next: 'Next',
    dosageInfo: 'Fertilizer Dosage',
    totalQuantity: 'Total Quantity Needed',
    buyNow: 'Buy Fertilizer Online',
    profile: 'Farmer Profile',
    knowledgeHub: 'Knowledge Hub',
    perAcre: 'per acre',
    totalFor: 'Total for',
    acres: 'acres',
    welcomeTitle: 'wELCOME',
    welcomeSubtitle: 'Nurturing the future of agriculture, one leaf at a time.',
    welcomeMessage: 'Your AI-powered companion for smarter farming. Detect diseases, get weather alerts, and optimize fertilizer dosage all in one place.',
    getStarted: 'Start Growing',
    joinCommunity: 'Join the Community',
    knowledgeHubTitle: 'CropCare Knowledge Hub',
    organicCorner: 'Organic Corner',
    organicDesc: 'Sustainable farming for a healthier planet and higher value crops.',
    exploreOrganic: 'Explore Organic Methods',
    composting: 'Composting',
    compostingDesc: 'Turn waste into gold for your soil.',
    bioPesticides: 'Bio-Pesticides',
    bioPesticidesDesc: 'Safe control for your crops.',
    cropRotation: 'Crop Rotation',
    cropRotationDesc: 'Natural nutrient management.',
    ecoFertilizers: 'Eco-Fertilizers',
    ecoFertilizersDesc: 'Balanced growth, zero chemicals.',
    watchVideo: 'Watch Video',
    encyclopedia: 'Encyclopedia',
    weatherAdvisory: 'Weather Advisory',
    seasonalGuide: 'Seasonal Guide',
    pestId: 'Pest ID',
    soilHealth: 'Soil Health',
    searchPlaceholder: 'Search diseases or crops...',
    riskLevel: 'Risk',
    viewDetails: 'View Details',
    preventionTreatment: 'Prevention & Treatment',
    recommendedTreatment: 'Recommended Treatment',
    preventiveAction: 'Preventive Action',
    symptoms: 'Symptoms',
    causes: 'Causes',
    marketEdge: 'Market Edge',
    liveMarketPrices: 'Live Market Prices',
    wheat: 'Wheat',
    rice: 'Rice',
    tools: 'Tools',
    earlyDetection: 'Early Detection',
    earlyDetectionDesc: 'Identify diseases before they spread.',
    pestControl: 'Pest Control',
    pestControlDesc: 'Get verified treatment suggestions.',
    welcomeBack: 'Welcome Back',
    cotton: 'Cotton',
    quintal: '/ quintal',
  },
  bn: {
    appName: 'ক্রপকেয়ার AI',
    login: 'লগ-ইন',
    signup: 'নিবন্ধন করুন',
    logout: 'লগ-আউট',
    name: 'পুরো নাম',
    emailPhone: 'ফোন বা ইমেল',
    password: 'পাসওয়ার্ড',
    noAccount: "অ্যাকাউন্ট নেই?",
    hasAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
    scan: 'স্ক্যান',
    history: 'ইতিহাস',
    home: 'হোম',
    uploadTitle: 'পাতার ছবি আপলোড করুন',
    uploadDesc: 'রোগ শনাক্ত করতে আক্রান্ত গাছের পাতার ছবি তুলুন।',
    analyze: 'বিশ্লেষণ করুন',
    analyzing: 'বিশ্লেষণ করা হচ্ছে...',
    retake: 'আবার তুলুন',
    results: 'শনাক্তকরণ ফলাফল',
    healthy: 'সুস্থ',
    disease: 'রোগ শনাক্ত হয়েছে',
    warning: 'সতর্কতা',
    confidence: 'নিশ্চয়তা',
    weatherAlert: 'আবহাওয়া সতর্কতা',
    advice: 'চিকিৎসা পরামর্শ',
    fertilizer: 'সার প্রয়োগের পরামর্শ',
    temp: 'তাপমাত্রা',
    rain: 'বৃষ্টির সম্ভাবনা',
    smartAlertRain: 'বৃষ্টির সম্ভাবনা: আজ সার প্রয়োগ এড়িয়ে চলুন।',
    smartAlertHeat: 'প্রচণ্ড তাপ: ফসল রক্ষায় সেচ বাড়ান।',
    smartAlertClear: 'আবহাওয়া পরিষ্কার: রক্ষণাবেক্ষণের জন্য উপযুক্ত সময়।',
    voiceOutput: 'ফলাফল শুনুন',
    placeholderName: 'আপনার নাম লিখুন',
    placeholderEmail: 'ফোন বা ইমেল লিখুন',
    placeholderPass: 'পাসওয়ার্ড লিখুন',
    landSize: 'জমির পরিমাণ (একর)',
    placeholderLand: 'আপনার কত একর জমি আছে?',
    cropDetails: 'ফসলের বিবরণ',
    cropVariety: 'ফসলের ধরন',
    soilType: 'মাটির ধরন',
    plantingDate: 'বপনের তারিখ',
    next: 'পরবর্তী',
    dosageInfo: 'সারের মাত্রা',
    totalQuantity: 'প্রয়োজনীয় মোট পরিমাণ',
    buyNow: 'অনলাইনে সার কিনুন',
    profile: 'কৃষকের প্রোফাইল',
    knowledgeHub: 'তথ্য কেন্দ্র',
    perAcre: 'প্রতি একর',
    totalFor: 'মোট',
    acres: 'একর',
    welcomeTitle: 'স্বাগতম',
    welcomeSubtitle: 'কৃষির ভবিষ্যৎ লালন করছি, প্রতি পাতায়।',
    welcomeMessage: 'স্মার্ট চাষের জন্য আপনার AI-চালিত সঙ্গী। রোগ শনাক্ত করুন, আবহাওয়ার সতর্কতা পান এবং সারের মাত্রা অপ্টিমাইজ করুন সব এক জায়গায়।',
    getStarted: 'চাষ শুরু করুন',
    joinCommunity: 'কমিউনিটিতে যোগ দিন',
    knowledgeHubTitle: 'ক্রপকেয়ার জ্ঞান কেন্দ্র',
    organicCorner: 'জৈব কর্নার',
    organicDesc: 'সুস্থ পৃথিবীর জন্য এবং ফসলের উন্নত মানের জন্য টেকসই চাষাবাদ।',
    exploreOrganic: 'জৈব পদ্ধতিগুলি অন্বেষণ করুন',
    composting: 'কম্পোস্টিং',
    compostingDesc: 'আপনার মাটির জন্য বর্জ্যকে সোনায় পরিণত করুন।',
    bioPesticides: 'জৈব-কীটনাশক',
    bioPesticidesDesc: 'আপনার ফসলের জন্য নিরাপদ নিয়ন্ত্রণ।',
    cropRotation: 'ফসল আবর্তন',
    cropRotationDesc: 'প্রাকৃতিক পুষ্টি ব্যবস্থাপনা।',
    ecoFertilizers: 'পরিবেশ-বান্ধব সার',
    ecoFertilizersDesc: 'ভারসাম্যপূর্ণ বৃদ্ধি, শূন্য রাসায়নিক।',
    watchVideo: 'ভিডিও দেখুন',
    encyclopedia: 'তথ্যকোষ',
    weatherAdvisory: 'আবহাওয়া পরামর্শ',
    seasonalGuide: 'ঋতুভিত্তিক নির্দেশিকা',
    pestId: 'পোকামাকড় শনাক্তকরণ',
    soilHealth: 'মাটির স্বাস্থ্য',
    marketEdge: 'মার্কেট এজ',
    liveMarketPrices: 'লাইভ বাজার মূল্য',
    wheat: 'গম',
    rice: 'ধান',
    tools: 'সরঞ্জাম',
    earlyDetection: 'প্রাথমিক শনাক্তকরণ',
    earlyDetectionDesc: 'ছড়িয়ে পড়ার আগেই রোগ শনাক্ত করুন।',
    pestControl: 'পোকামাকড় নিয়ন্ত্রণ',
    pestControlDesc: 'যাচাইকৃত প্রতিকার পান।',
    welcomeBack: 'আবার স্বাগতম',
    cotton: 'তুলা',
    quintal: '/ কুইন্টাল',
  },
  hi: {
    appName: 'क्रॉपकेयर AI',
    login: 'लॉगिन',
    signup: 'साइन अप करें',
    logout: 'लॉगआउट',
    name: 'पूरा नाम',
    emailPhone: 'फ़ोन या ईमेल',
    password: 'पासवर्ड',
    noAccount: "खाता नहीं है?",
    hasAccount: 'पहले से खाता है?',
    scan: 'स्कैन',
    history: 'इतिहास',
    home: 'होम',
    uploadTitle: 'पत्ती की फोटो अपलोड करें',
    uploadDesc: 'रोगों का पता लगाने के लिए प्रभावित पौधे की पत्ती की फोटो लें।',
    analyze: 'विश्लेषण करें',
    analyzing: 'विश्लेषण हो रहा है...',
    retake: 'फिर से लें',
    results: 'जांच के परिणाम',
    healthy: 'स्वस्थ',
    disease: 'रोग का पता चला',
    warning: 'चेतावनी',
    confidence: 'आत्मविश्वास',
    weatherAlert: 'मौसम की चेतावनी',
    advice: 'उपचार सलाह',
    fertilizer: 'उर्वरक की सलाह',
    temp: 'तापमान',
    rain: 'बारिश की संभावना',
    smartAlertRain: 'बारिश की संभावना: आज उर्वरक छिड़कने से बचें।',
    smartAlertHeat: 'तेज गर्मी: फसलों की रक्षा के लिए सिंचाई बढ़ाएं।',
    smartAlertClear: 'मौसम साफ है: रखरखाव के लिए अच्छा समय है।',
    voiceOutput: 'परिणाम सुनें',
    placeholderName: 'अपना नाम दर्ज करें',
    placeholderEmail: 'फ़ोन या ईमेल दर्ज करें',
    placeholderPass: 'पासवर्ड दर्ज करें',
    landSize: 'भूमि का आकार (एकड़)',
    placeholderLand: 'आपके पास कितनी एकड़ जमीन है?',
    cropDetails: 'फसल का विवरण',
    cropVariety: 'फसल की किस्म',
    soilType: 'मिट्टी का प्रकार',
    plantingDate: 'बुवाई की तारीख',
    next: 'अगला',
    dosageInfo: 'खाद की मात्रा',
    totalQuantity: 'कुल आवश्यक मात्रा',
    buyNow: 'ऑनलाइन खाद खरीदें',
    profile: 'किसान प्रोफाइल',
    knowledgeHub: 'ज्ञान केंद्र',
    perAcre: 'प्रति एकड़',
    totalFor: 'कुल',
    acres: 'एकड़',
    welcomeTitle: 'सुस्वागतम',
    welcomeSubtitle: 'कृषि के भविष्य को संवारना, हर एक पत्ती के साथ।',
    welcomeMessage: 'स्मार्ट खेती के लिए आपका AI-आधारित साथी। रोगों का पता लगाएं, मौसम की चेतावनी पाएं और उर्वरक की मात्रा को अनुकूलित करें - सब एक ही स्थान पर।',
    getStarted: 'खेती शुरू करें',
    joinCommunity: 'समुदाय में शामिल हों',
    knowledgeHubTitle: 'क्रॉपकेयर ज्ञान केंद्र',
    organicCorner: 'जैविक कोना',
    organicDesc: 'स्वस्थ ग्रह और उच्च मूल्य वाली फसलों के लिए टिकाऊ खेती।',
    exploreOrganic: 'जैविक तरीकों का पता लगाएं',
    composting: 'कम्पोस्टिंग',
    compostingDesc: 'अपनी मिट्टी के लिए कचरे को सोने में बदलें।',
    bioPesticides: 'जैव-कीटनाशक',
    bioPesticidesDesc: 'आपकी फसलों के लिए सुरक्षित नियंत्रण।',
    cropRotation: 'फसल चक्र',
    cropRotationDesc: 'प्राकृतिक पोषक तत्व प्रबंधन।',
    ecoFertilizers: 'इको-उर्वरक',
    ecoFertilizersDesc: 'संतुलित विकास, शून्य रसायन।',
    watchVideo: 'वीडियो देखें',
    encyclopedia: 'विश्वकोश',
    weatherAdvisory: 'मौसम सलाह',
    seasonalGuide: 'मौसमी गाइड',
    pestId: 'कीट पहचान',
    soilHealth: 'मिट्टी का स्वास्थ्य',
    marketEdge: 'मार्केट एज',
    liveMarketPrices: 'लाइव बाजार मूल्य',
    wheat: 'गेहूं',
    rice: 'चावल',
    tools: 'उपकरण',
    earlyDetection: 'प्रारंभिक पहचान',
    earlyDetectionDesc: 'बीमारियों को फैलने से पहले पहचानें।',
    pestControl: 'कीट नियंत्रण',
    pestControlDesc: 'सत्यापित उपचार सुझाव प्राप्त करें।',
    welcomeBack: 'फिर से स्वागत है',
    cotton: 'कपास',
    quintal: '/ कुंतल',
  },
  mr: {
    appName: 'क्रॉपकेअर AI',
    login: 'लॉगिन',
    signup: 'नोंदणी करा',
    logout: 'लॉगआउट',
    name: 'पूर्ण नाव',
    emailPhone: 'फोन किंवा ईमेल',
    password: 'पासवर्ड',
    noAccount: "खाते नाही?",
    hasAccount: 'आधीच खाते आहे?',
    scan: 'स्कॅन',
    history: 'इतिहास',
    home: 'होम',
    uploadTitle: 'पानाचे छायाचित्र अपलोड करा',
    uploadDesc: 'रोगांचे निदान करण्यासाठी बाधित रोपाच्या पानाचे छायाचित्र घ्या.',
    analyze: 'विश्लेषण करा',
    analyzing: 'विश्लेषण होत आहे...',
    retake: 'पुन्हा घ्या',
    results: 'तपासणीचे निकाल',
    healthy: 'निरोगी',
    disease: 'रोग आढळला',
    warning: 'इशारा',
    confidence: 'खात्री',
    weatherAlert: 'हवामान इशारा',
    advice: 'उपचार सल्ला',
    fertilizer: 'खताचा सल्ला',
    temp: 'तापमान',
    rain: 'पावसाची शक्यता',
    smartAlertRain: 'पावसाची शक्यता: आज खत फवारणे टाळा.',
    smartAlertHeat: 'प्रचंड उष्णता: पिकांच्या संरक्षणासाठी सिंचन वाढवा.',
    smartAlertClear: 'हवामान स्वच्छ आहे: देखभालीसाठी चांगली वेळ आहे.',
    voiceOutput: 'निकाल ऐका',
    placeholderName: 'तुमचे नाव टाका',
    placeholderEmail: 'फोन किंवा ईमेल टाका',
    placeholderPass: 'पासवर्ड टाका',
    landSize: 'जमिनीचा आकार (एकर)',
    placeholderLand: 'तुमच्याकडे किती एकर जमीन आहे?',
    cropDetails: 'पिकाचा तपशील',
    cropVariety: 'पिकाची जात',
    soilType: 'मातीचा प्रकार',
    plantingDate: 'लागवडीची तारीख',
    next: 'पुढील',
    dosageInfo: 'खताची मात्रा',
    totalQuantity: 'एकूण आवश्यक प्रमाण',
    buyNow: 'ऑनलाइन खत खरेदी करा',
    profile: 'शेतकरी प्रोफाइल',
    knowledgeHub: 'ज्ञान केंद्र',
    perAcre: 'प्रति एकर',
    totalFor: 'एकूण',
    acres: 'एकर',
    welcomeTitle: 'सुस्वागतम',
    welcomeSubtitle: 'शेतीचे भविष्य घडवत आहोत, प्रत्येक पानासोबत।',
    welcomeMessage: 'स्मार्ट शेतीसाठी आपला AI-आधारित सोबती। रोगांचे निदान करा, हवामान इशारे मिळवा आणि खतांचे प्रमाण अचूक करा - सर्व काही एकाच ठिकाणी।',
    getStarted: 'शेती सुरू करा',
    joinCommunity: 'समुदायात सामील व्हा',
    welcomeBack: 'पुन्हा स्वागत आहे',
    cotton: 'कापूस',
    quintal: '/ क्विंटल',
  },
  ta: {
    appName: 'கிராப்கேர் AI',
    login: 'உள்நுழை',
    signup: 'பதிவு செய்',
    logout: 'வெளியேறு',
    name: 'முழு பெயர்',
    emailPhone: 'தொலைபேசி அல்லது மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    noAccount: "கணக்கு இல்லையா?",
    hasAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
    scan: 'ஸ்கேன்',
    history: 'வரலாறு',
    home: 'முகப்பு',
    uploadTitle: 'இலை படத்தை பதிவேற்றவும்',
    uploadDesc: 'நோய்களைக் கண்டறிய பாதிக்கப்பட்ட செடியின் இலையை புகைப்படம் எடுக்கவும்.',
    analyze: 'பகுப்பாய்வு செய்',
    analyzing: 'பகுப்பாய்வு செய்கிறது...',
    retake: 'மீண்டும் எடு',
    results: 'கண்டறிதல் முடிவுகள்',
    healthy: 'ஆரோக்கியமானது',
    disease: 'நோய் கண்டறியப்பட்டது',
    warning: 'எச்சரிக்கை',
    confidence: 'நம்பிக்கை',
    weatherAlert: 'வானிலை எச்சரிக்கை',
    advice: 'சிகிச்சை ஆலோசனை',
    fertilizer: 'உர பரிந்துரை',
    temp: 'வெப்பநிலை',
    rain: 'மழை வாய்ப்பு',
    smartAlertRain: 'மழை எதிர்பார்க்கப்படுகிறது: இன்று உரம் தெளிப்பதைத் தவிர்க்கவும்.',
    smartAlertHeat: 'அதிக வெப்பம்: பயிர்களைப் பாதுகாக்க பாசனத்தை அதிகரிக்கவும்.',
    smartAlertClear: 'வானிலை தெளிவாக உள்ளது: பராமரிப்புக்கு நல்ல நேரம்.',
    voiceOutput: 'முடிவுகளைக் கேளுங்கள்',
    placeholderName: 'உங்கள் பெயரை உள்ளிடவும்',
    placeholderEmail: 'தொலைபேசி அல்லது மின்னஞ்சலை உள்ளிடவும்',
    placeholderPass: 'கடவுச்சொல்லை உள்ளிடவும்',
    landSize: 'நில அளவு (ஏக்கர்)',
    placeholderLand: 'உங்களுக்கு எத்தனை ஏக்கர் நிலம் உள்ளது?',
    cropDetails: 'பயிர் விவரங்கள்',
    cropVariety: 'பயிர் வகை',
    soilType: 'மண் வகை',
    plantingDate: 'நடவு தேதி',
    next: 'அடுத்து',
    dosageInfo: 'உர அளவு',
    totalQuantity: 'தேவையான மொத்த அளவு',
    buyNow: 'உரத்தை ஆன்லைனில் வாங்கவும்',
    profile: 'விவசாயி சுயவிவரம்',
    knowledgeHub: 'அறிவு மையம்',
    perAcre: 'ஏக்கருக்கு',
    totalFor: 'மொத்தம்',
    acres: 'ஏக்கர்',
    welcomeTitle: 'வரவேற்கிறோம்',
    welcomeSubtitle: 'விவசாயத்தின் எதிர்காலத்தை வளர்க்கிறோம், ஒவ்வொரு இலையிலும்।',
    welcomeMessage: 'ஸ்மார்ட் விவசாயத்திற்கான உங்கள் AI-இயங்கும் துணை। நோய்களைக் கண்டறியவும், வானிலை எச்சரிக்கைகளைப் பெறவும் மற்றும் உர அளவை மேம்படுத்தவும் - அனைத்தும் ஒரே இடத்தில்।',
    getStarted: 'விவசாயத்தைத் தொடங்குங்கள்',
    joinCommunity: 'சமூகத்தில் இணையுங்கள்',
    welcomeBack: 'மீண்டும் வருக',
    cotton: 'பருத்தி',
    quintal: '/ குவின்டால்',
  },
  te: {
    appName: 'క్రాప్ కేర్ AI',
    login: 'లాగిన్',
    signup: 'సైన్ అప్',
    logout: 'లాగౌట్',
    name: 'పూర్తి పేరు',
    emailPhone: 'ఫోన్ లేదా ఈమెయిల్',
    password: 'పాస్‌వర్డ్',
    noAccount: "ఖాతా లేదా?",
    hasAccount: 'ముందే ఖాతా ఉందా?',
    scan: 'స్కాన్',
    history: 'చరిత్ర',
    home: 'హోమ్',
    uploadTitle: 'ఆకు చిత్రాన్ని అప్‌లోడ్ చేయండి',
    uploadDesc: 'వ్యాధులను గుర్తించడానికి ప్రభావిత మొక్క ఆకును ఫోటో తీయండి.',
    analyze: 'విశ్లేషించండి',
    analyzing: 'విశ్లేషిస్తోంది...',
    retake: 'మళ్ళీ తీయండి',
    results: 'గుర్తింపు ఫలితాలు',
    healthy: 'ఆరోగ్యకరమైనది',
    disease: 'వ్యాధి గుర్తించబడింది',
    warning: 'హెచ్చరిక',
    confidence: 'నమ్మకం',
    weatherAlert: 'వాతావరణ హెచ్చరిక',
    advice: 'చికిత్స సలహా',
    fertilizer: 'ఎరువుల సిఫార్సు',
    temp: 'ఉష్ణోగ్రత',
    rain: 'వర్షం అవకాశం',
    smartAlertRain: 'వర్షం వచ్చే అవకాశం ఉంది: ఈ రోజు ఎరువులు చల్లడం మానుకోండి.',
    smartAlertHeat: 'ఎక్కువ వేడి: పంటలను రక్షించడానికి నీటి పారుదల పెంచండి.',
    smartAlertClear: 'వాతావరణం నిర్మలంగా ఉంది: నిర్వహణకు మంచి సమయం.',
    voiceOutput: 'ఫలితాలను వినండి',
    placeholderName: 'మీ పేరు నమోదు చేయండి',
    placeholderEmail: 'ఫోన్ లేదా ఈమెయిల్ నమోదు చేయండి',
    placeholderPass: 'పాస్‌వర్డ్ నమోదు చేయండి',
    landSize: 'భూమి పరిమాణం (ఎకరాలు)',
    placeholderLand: 'మీకు ఎన్ని ఎకరాల భూమి ఉంది?',
    cropDetails: 'పంట వివరాలు',
    cropVariety: 'పంట రకం',
    soilType: 'నేల రకం',
    plantingDate: 'నాటిన తేదీ',
    next: 'తరువాత',
    dosageInfo: 'ఎరువుల మోతాదు',
    totalQuantity: 'అవసరమైన మొత్తం పరిమాణం',
    buyNow: 'ఎరువులను ఆన్‌లైన్‌లో కొనండి',
    profile: 'రైతు ప్రొఫైల్',
    knowledgeHub: 'నాలెడ్జ్ హబ్',
    perAcre: 'ఎకరానికి',
    totalFor: 'మొత్తం',
    acres: 'ఎకరాలు',
    welcomeTitle: 'స్వాగతం',
    welcomeSubtitle: 'వ్యవసాయ భవిష్యత్తును తీర్చిదిద్దుతున్నాము, ప్రతి ఆకుతో।',
    welcomeMessage: 'స్మార్ట్ వ్యవసాయం కోసం మీ AI-ఆధారిత తోడు। వ్యాధులను గుర్తించండి, వాతావరణ హెచ్చరికలను పొందండి మరియు ఎరువుల మోతాదును ఆప్టిమైజ్ చేయండి - అన్నీ ఒకే చోట।',
    getStarted: 'వ్యవసాయం ప్రారంభించండి',
    joinCommunity: 'కమ్యూనిటీలో చేరండి',
    welcomeBack: 'మళ్ళీ స్వాగతం',
    cotton: 'ప్రత్తి',
    quintal: '/ క్వింటాల్',
  },
  kn: {
    appName: 'ಕ್ರಾಪ್ ಕೇರ್ AI',
    login: 'ಲಾಗಿನ್',
    signup: 'ಸೈನ್ ಅಪ್',
    logout: 'ಲಾಗೌಟ್',
    name: 'ಪೂರ್ಣ ಹೆಸರು',
    emailPhone: 'ಫೋನ್ ಅಥವಾ ಇಮೇಲ್',
    password: 'ಪಾಸ್ವರ್ಡ್',
    noAccount: "ಖಾತೆ ಇಲ್ಲವೇ?",
    hasAccount: 'ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿದ್ದೀರಾ?',
    scan: 'ಸ್ಕ್ಯಾನ್',
    history: 'ಇತಿಹಾಸ',
    home: 'ಹೋಮ್',
    uploadTitle: 'ಎಲೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    uploadDesc: 'ರೋಗಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಪೀಡಿತ ಸಸ್ಯದ ಎಲೆಯ ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ.',
    analyze: 'ವಿಶ್ಲೇಷಿಸಿ',
    analyzing: 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
    retake: 'ಮತ್ತೆ ತೆಗೆಯಿರಿ',
    results: 'ಪತ್ತೆ ಹಚ್ಚುವ ಫಲಿತಾಂಶಗಳು',
    healthy: 'ಆರೋಗ್ಯಕರ',
    disease: 'ರೋಗ ಪತ್ತೆಯಾಗಿದೆ',
    warning: 'ಎಚ್ಚರಿಕೆ',
    confidence: 'ನಂಬಿಕೆ',
    weatherAlert: 'ಹವಾಮಾನ ಮುನ್ನೆಚ್ಚರಿಕೆ',
    advice: 'ಚಿಕಿತ್ಸಾ ಸಲಹೆ',
    fertilizer: 'ಗೊಬ್ಬರ ಶಿಫਾਰಸು',
    temp: 'ತಾಪಮಾನ',
    rain: 'ಮಳೆ ಸಾಧ್ಯತೆ',
    smartAlertRain: 'ಮಳೆ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ: ಇಂದು ಗೊಬ್ಬರ ಸಿಂಪಡಿಸುವುದನ್ನು ತಪ್ಪಿಸಿ.',
    smartAlertHeat: 'ಹೆಚ್ಚಿನ ಶಾಖ: ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸಲು ನೀರாவರಿ ಹೆಚ್ಚಿಸಿ.',
    smartAlertClear: 'ಹವಾಮಾನ ಸ್ಪಷ್ಟವಾಗಿದೆ: ನಿರ್ವಹಣೆಗೆ ಉತ್ತಮ ಸಮಯ.',
    voiceOutput: 'ಫಲಿತಾಂಶಗಳನ್ನು ಆಲಿಸಿ',
    placeholderName: 'ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂદಿಸಿ',
    placeholderEmail: 'ಫೋನ್ ಅಥವಾ ಇಮೇಲ್ ನಮೂದಿಸಿ',
    placeholderPass: 'ಪಾಸ್ವರ್ಡ್ ನಮೂದಿಸಿ',
    landSize: 'ಭೂಮಿಯ ಗಾತ್ರ (ಎಕರೆ)',
    placeholderLand: 'ನಿಮ್ಮಲ್ಲಿ ಎಷ್ಟು ಎಕರೆ ಭೂಮಿ ಇದೆ?',
    cropDetails: 'ಬೆಳೆ ವಿವರಗಳು',
    cropVariety: 'ಬೆಳೆ ವಿಧ',
    soilType: 'ಮಣ್ಣಿನ ವಿಧ',
    plantingDate: 'ನಾಟಿ ದಿನಾಂక',
    next: 'ಮುಂದೆ',
    dosageInfo: 'ಗೊಬ್ಬರದ ಪ್ರಮಾಣ',
    totalQuantity: 'ಅಗತ್ಯವಿರುವ ಒಟ್ಟು ಪ್ರಮಾಣ',
    buyNow: 'ಗೊಬ್ಬರವನ್ನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಖರೀದಿಸಿ',
    profile: 'ರೈತ ಪ್ರොಫೈಲ್',
    knowledgeHub: 'ಜ್ಞಾನ ಕೇಂದ್ರ',
    perAcre: 'ಪ್ರತಿ ಎಕರೆಗೆ',
    totalFor: 'ಒಟ್ಟು',
    acres: 'ಎಕರೆ',
    welcomeTitle: 'ಸುಸ್ವಾಗತ',
    welcomeSubtitle: 'ಕೃಷಿಯ ಭವಿಷ್ಯವನ್ನು ಪೋಷಿಸುತ್ತಿದ್ದೇವೆ, ಪ್ರತಿ ಎಲೆಯೊಂದಿಗೆ।',
    welcomeMessage: 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿಗಾಗಿ ನಿಮ್ಮ AI-ಚಾಲಿತ ಸಂಗಾತಿ। ರೋಗಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಿ, ಹವಾಮಾನ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳನ್ನು ಪಡೆಯಿರಿ ಮತ್ತು ಗೊಬ್ಬರದ ಪ್ರಮಾಣವನ್ನು ಉತ್ತಮಗೊಳಿಸಿ - ಎಲ್ಲವೂ ಒಂದೇ ಕಡೆ।',
    getStarted: 'ಕೃಷಿ ಆರಂಭಿಸಿ',
    joinCommunity: 'ಸಮುದಾಯಕ್ಕೆ ಸೇರಿ',
    welcomeBack: 'ಮತ್ತೆ ಸ್ವಾಗತ',
    cotton: 'ಹತ್ತಿ',
    quintal: '/ ಕ್ವಿಂಟಾಲ್',
  },
  ml: {
    appName: 'ക്രോപ് കെയർ AI',
    login: 'ലോഗിൻ',
    signup: 'സൈൻ അപ്പ്',
    logout: 'ലോഗൗട്ട്',
    name: 'പൂർണ്ണനാമം',
    emailPhone: 'ഫോൺ അല്ലെങ്കിൽ ഇമെയിൽ',
    password: 'പാസ്‌വേഡ്',
    noAccount: "അക്കൗണ്ട് ഇല്ലേ?",
    hasAccount: 'നിലവിൽ അക്കൗണ്ട് ഉണ്ടോ?',
    scan: 'സ്കാൻ',
    history: 'ചരിത്രം',
    home: 'ഹോം',
    uploadTitle: 'ഇലയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക',
    uploadDesc: 'രോഗങ്ങൾ കണ്ടെത്താൻ ബാധിച്ച ചെടിയുടെ ഇലയുടെ ഫോട്ടോ എടുക്കുക.',
    analyze: 'വിശകലനം ചെയ്യുക',
    analyzing: 'വിശകലനം ചെയ്യുന്നു...',
    retake: 'വീണ്ടും എടുക്കുക',
    results: 'കണ്ടെത്തൽ ഫലങ്ങൾ',
    healthy: 'ആരോഗ്യമുള്ളത്',
    disease: 'രോഗം കണ്ടെത്തി',
    warning: 'മുന്നറിയിപ്പ്',
    confidence: 'വിശ്വാസ്യത',
    weatherAlert: 'കാലാവസ്ഥാ മുന്നറിയിപ്പ്',
    advice: 'ചികിത്സാ ഉപദേശം',
    fertilizer: 'വളപ്രയോഗ ശുപാർശ',
    temp: 'താപനില',
    rain: 'മഴ സാധ്യത',
    smartAlertRain: 'മഴ പ്രതീക്ഷിക്കുന്നു: ഇന്ന് വളം തളിക്കുന്നത് ഒഴിവാക്കുക.',
    smartAlertHeat: 'കഠിനമായ ചൂട്: വിളകളെ സംരക്ഷിക്കാൻ ജലസേചനം വർദ്ധിപ്പിക്കുക.',
    smartAlertClear: 'കാലാവಸ್ಥ തെളിഞ്ഞതാണ്: പരിപാലനത്തിന് നല്ല സമയം.',
    voiceOutput: 'ഫലങ്ങൾ കേൾക്കുക',
    placeholderName: 'നിങ്ങളുടെ പേര് നൽകുക',
    placeholderEmail: 'ഫോൺ അല്ലെങ്കിൽ ഇമെയിൽ നൽകുക',
    placeholderPass: 'പാസ്‌വേഡ് നൽകുക',
    landSize: 'സ്ഥലത്തിന്റെ അളവ് (ഏക്കർ)',
    placeholderLand: 'നിങ്ങൾക്ക് എത്ര ഏക്കർ സ്ഥലമുണ്ട്?',
    cropDetails: 'വിള വിവരങ്ങൾ',
    cropVariety: 'വിള ഇനം',
    soilType: 'മണ്ണിന്റെ തരം',
    plantingDate: 'നട്ട തീയതി',
    next: 'അടുത്തത്',
    dosageInfo: 'വളത്തിന്റെ അളവ്',
    totalQuantity: 'ആവശ്യമായ മൊത്തം അളവ്',
    buyNow: 'വളം ഓൺലൈനായി വാങ്ങുക',
    profile: 'കർഷക പ്രൊഫൈൽ',
    knowledgeHub: 'വിജ്ഞാന കേന്ദ്രം',
    perAcre: 'ഏക്കറിന്',
    totalFor: 'ആകെ',
    acres: 'ஏக்கர்',
    welcomeTitle: 'സ്വാഗതം',
    welcomeSubtitle: 'കൃഷിയുടെ ഭാവി പരിപാലിക്കുന്നു, ഓരോ ഇലയിലും।',
    welcomeMessage: 'സ്മാർട്ട് കൃഷിക്കായി നിങ്ങളുടെ AI-അധിഷ്ഠിത കൂട്ടാളി। രോഗങ്ങൾ കണ്ടെത്തുക, കാലാവസ്ഥാ മുന്നറിയിപ്പുകൾ നേടുക, വളത്തിന്റെ അളവ് കൃത്യമാക്കുക - എല്ലാം ഒരിടത്ത്।',
    getStarted: 'കൃഷി ആരംഭിക്കുക',
    joinCommunity: 'കൂട്ടായ്മയിൽ ചേരുക',
    welcomeBack: 'വീണ്ടും സ്വാഗതം',
    cotton: 'പരുത്തി',
    quintal: '/ ക്വിന്റൽ',
  },
  gu: {
    appName: 'ક્રોપકેર AI',
    login: 'લોગિન',
    signup: 'સાઇન અપ',
    logout: 'લોગઆઉટ',
    name: 'પૂરું નામ',
    emailPhone: 'ફોન અથવા ઇમેઇલ',
    password: 'પાસવર્ડ',
    noAccount: "ખાતું નથી?",
    hasAccount: 'પહેલેથી ખાતું છે?',
    scan: 'સ્કેન',
    history: 'ઇતિહાસ',
    home: 'હોમ',
    uploadTitle: 'પાનનો ફોટો અપલોડ કરો',
    uploadDesc: 'રોગો શોધવા માટે અસરગ્રસ્ત છોડના પાનનો ફોટો લો.',
    analyze: 'વિશ્લેષણ કરો',
    analyzing: 'વિશ્લેષણ થઈ રહ્યું છે...',
    retake: 'ફરીથી લો',
    results: 'તપાસના પરિણામો',
    healthy: 'તંદુરસ્ત',
    disease: 'રોગ જણાયો',
    warning: 'ચેતવણી',
    confidence: 'વિશ્વાસ',
    weatherAlert: 'હવામાન ચેતવણી',
    advice: 'સારવારની સલાહ',
    fertilizer: 'ખાતરની ભલામણ',
    temp: 'તાપમાન',
    rain: 'વરસાદની શક્યતા',
    smartAlertRain: 'વરસાદની અપેક્ષા છે: આજે ખાતર છાંટવાનું ટાળો.',
    smartAlertHeat: 'વધારે ગરમી: પાકને બચાવવા માટે સિંચાઈ વધારો.',
    smartAlertClear: 'હવામાન ચોખ્ખું છે: જાળવણી માટે સારો સમય.',
    voiceOutput: 'પરિણામો સાંભળો',
    placeholderName: 'તમારું નામ દાખલ કરો',
    placeholderEmail: 'ફોન અથવા ઇમેઇલ દાખલ કરો',
    placeholderPass: 'પાસવર્ડ દાખલ કરો',
    landSize: 'જમીનનું કદ (એકર)',
    placeholderLand: 'તમારી પાસે કેટલી એકર જમીન છે?',
    cropDetails: 'પાકની વિગતો',
    cropVariety: 'પાકની જાત',
    soilType: 'જમીનનો પ્રકાર',
    plantingDate: 'વાવેતરની તારીખ',
    next: 'આગળ',
    dosageInfo: 'ખાતરનું પ્રમાણ',
    totalQuantity: 'જરૂરી કુલ જથ્થો',
    buyNow: 'ઓનલાઇન ખાતર ખરીદો',
    profile: 'ખેડૂત પ્રોફાઇલ',
    knowledgeHub: 'જ્ઞાન કેન્દ્ર',
    perAcre: 'એકર દીઠ',
    totalFor: 'કુલ',
    acres: 'એકર',
    welcomeTitle: 'સુસ્વાગતમ',
    welcomeSubtitle: 'ખેતીના ભવિષ્યને સંવારવું, દરેક પાન સાથે।',
    welcomeMessage: 'સ્માર્ટ ખેતી માટે તમારો AI-આધારિત સાથી। રોગો શોધો, હવામાન ચેતવણીઓ મેળવો અને ખાતરનું પ્રમાણ સચોટ કરો - બધું એક જ જગ્યાએ।',
    getStarted: 'ખેતી શરૂ કરો',
    joinCommunity: 'સમુદાયમાં જોડાઓ',
    welcomeBack: 'ફરી સ્વાગત છે',
    cotton: 'કપાસ',
    quintal: '/ ક્વિન્ટલ',
  },
  pa: {
    appName: 'ਕਰੌਪਕੇਅਰ AI',
    login: 'ਲੌਗਇਨ',
    signup: 'ਸਾਈਨ ਅੱਪ',
    logout: 'ਲੌਗਆਉਟ',
    name: 'ਪੂਰਾ ਨਾਮ',
    emailPhone: 'ਫੋਨ ਜਾਂ ਈਮੇਲ',
    password: 'ਪਾਸਵਰਡ',
    noAccount: "ਖਾਤਾ ਨਹੀਂ ਹੈ?",
    hasAccount: 'ਪਹਿਲਾਂ ਹੀ ਖਾਤਾ ਹੈ?',
    scan: 'ਸਕੈਨ',
    history: 'ਇਤਿਹਾਸ',
    home: 'ਹੋਮ',
    uploadTitle: 'ਪੱਤੇ ਦੀ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ',
    uploadDesc: 'ਬਿਮਾਰੀਆਂ ਦਾ ਪਤਾ ਲਗਾਉਣ ਲਈ ਪ੍ਰਭਾਵਿਤ ਪੌਦੇ ਦੇ ਪੱਤੇ ਦੀ ਫੋਟோ ਲਓ।',
    analyze: 'ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ',
    analyzing: 'ਵਿਸ਼ਲੇਸ਼ਣ ਹੋ ਰਿਹਾ ਹੈ...',
    retake: 'ਦੁਬਾਰਾ ਲਓ',
    results: 'ਜਾਂਚ ਦੇ ਨਤੀਜੇ',
    healthy: 'ਤੰਦਰੁਸਤ',
    disease: 'ਬਿਮਾਰੀ ਦਾ ਪਤਾ ਲੱਗਾ',
    warning: 'ਚੇਤਾਵਨੀ',
    confidence: 'ਭਰੋਸਾ',
    weatherAlert: 'ਮੌਸਮ ਦੀ ਚੇਤਾਵਨੀ',
    advice: 'ਇਲਾਜ ਦੀ ਸਲਾਹ',
    fertilizer: 'ਖਾਦ ਦੀ ਸਿਫਾਰਸ਼',
    temp: 'ਤਾਪਮਾਨ',
    rain: 'ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ',
    smartAlertRain: 'ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ਹੈ: ਅੱਜ ਖਾਦ ਛਿੜਕਣ ਤੋਂ ਬਚੋ।',
    smartAlertHeat: 'ਬਹੁਤ ਗਰਮੀ: ਫਸਲਾਂ ਦੀ ਰਾਖੀ ਲਈ ਸਿੰਚਾਈ ਵਧਾਓ।',
    smartAlertClear: 'ਮੌਸਮ ਸਾਫ ਹੈ: ਸਾਂਭ-ਸੰਭਾਲ ਲਈ ਚੰਗਾ ਸਮਾਂ ਹੈ।',
    voiceOutput: 'ਨਤੀਜੇ ਸੁਣੋ',
    placeholderName: 'ਆਪਣਾ ਨਾਮ ਦਰਜ ਕਰੋ',
    placeholderEmail: 'ਫੋਨ ਜਾਂ ਈਮੇਲ ਦਰਜ ਕਰੋ',
    placeholderPass: 'ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ',
    landSize: 'ਜ਼ਮੀਨ ਦਾ ਆਕਾਰ (ਏਕੜ)',
    placeholderLand: 'ਤੁਹਾਡੇ ਕੋਲ ਕਿੰਨੀ ਏਕੜ ਜ਼ਮੀਨ ਹੈ?',
    cropDetails: 'ਫਸਲ کے ਵੇਰਵੇ',
    cropVariety: 'ਫਸਲ ਦੀ ਕਿਸਮ',
    soilType: 'ਮਿੱਟੀ ਦੀ ਕਿਸਮ',
    plantingDate: 'ਬਿਜਾਈ ਦੀ ਮਿਤੀ',
    next: 'ਅੱਗੇ',
    dosageInfo: 'ਖਾਦ ਦੀ ਮਾਤਰਾ',
    totalQuantity: 'ਕੁੱલ ਲੋੜੀਂਦੀ ਮਾਤરા',
    buyNow: 'ਆਨਲਾਈਨ ਖਾਦ ਖਰੀਦੋ',
    profile: 'ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ',
    knowledgeHub: 'ਗਿਆਨ ਕੇਂਦਰ',
    perAcre: 'ਪ੍ਰਤੀ ਏਕੜ',
    totalFor: 'ਕੁੱਲ',
    acres: 'ਏਕੜ',
    welcomeTitle: 'ਜੀ ਆਇਆਂ ਨੂੰ',
    welcomeSubtitle: 'ਖੇਤੀਬਾੜੀ ਦੇ ਭਵਿੱਖ ਨੂੰ ਸੰਵਾਰਨਾ, ਹਰ ਇੱਕ ਪੱਤੇ ਨਾਲ।',
    welcomeMessage: 'ਸਮਾਰਟ ਖੇਤੀ ਲਈ ਤੁਹਾਡਾ AI-ਆਧਾਰਿਤ ਸਾਥੀ। ਬਿਮਾਰੀਆਂ ਦਾ ਪਤਾ ਲਗਾਓ, ਮੌਸਮ ਦੀਆਂ ਚੇਤਾਵਨੀਆਂ ਪ੍ਰਾਪਤ ਕਰੋ ਅਤੇ ਖਾਦ ਦੀ ਮਾਤਰਾ ਨੂੰ ਅਨੁਕੂਲ ਬਣਾਓ - ਸਭ ਕੁਝ ਇੱਕੋ ਥਾਂ ਤੇ।',
    getStarted: 'ਖੇਤੀ ਸ਼ੁਰੂ ਕਰੋ',
    joinCommunity: 'ਭਾਈਚਾਰੇ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ',
    welcomeBack: 'ਜੀ ਆਇਆਂ ਨੂੰ',
    cotton: 'ਕਪਾਹ',
    quintal: '/ ਕੁਇੰਟਲ',
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Basic location-based language detection logic
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd use a reverse geocoding API to get the country/region
          // For this demo, we'll simulate or stick to English unless the user changes it
          // or we could check browser language
          const browserLang = (navigator.language || '').split('-')[0];
          if (['en', 'bn', 'hi', 'mr', 'ta', 'te', 'kn', 'ml', 'gu', 'pa'].includes(browserLang)) {
            // setLanguage(browserLang);
          }
        },
        () => console.log("Location access denied, defaulting to English")
      );
    }
  }, []);

  const t = (key) => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    return translations['en'][key] || key;
  };

  const toggleLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);


// ==========================================
// FILE: context/ThemeContext.jsx
// ==========================================
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);


// ==========================================
// FILE: components/Header.jsx
// ==========================================
function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <div className="logo">
        <Leaf size={24} fill="var(--primary-color)" />
        <span>{t('appName')}</span>
      </div>

      <div className="header-controls" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <select
          className="lang-selector"
          value={language}
          onChange={(e) => toggleLanguage(e.target.value)}
        >
          <option value="en">🌐 English</option>
          <option value="bn">🌐 বাংলা</option>
          <option value="hi">🌐 हिंदी</option>
          <option value="mr">🌐 मराठी</option>
          <option value="ta">🌐 தமிழ்</option>
          <option value="te">🌐 తెలుగు</option>
          <option value="kn">🌐 ಕನ್ನಡ</option>
          <option value="ml">🌐 മലയാളം</option>
          <option value="gu">🌐 ગુજરાતી</option>
          <option value="pa">🌐 ਪੰਜਾਬੀ</option>
        </select>
      </div>
    </header>
  );
}


// ==========================================
// FILE: components/WeatherSection.jsx
// ==========================================
function WeatherSection() {
  const { t } = useLanguage();
  const [weather, setWeather] = useState({
    temp: 30,
    rainProb: 10,
    condition: 'Clear'
  });

  useEffect(() => {
    // Check if we already have weather cached in localStorage
    const cachedWeather = localStorage.getItem('cropcare_weather');
    const cacheTime = localStorage.getItem('cropcare_weather_time');
    const oneHour = 60 * 60 * 1000;

    if (cachedWeather && cacheTime && (Date.now() - parseInt(cacheTime)) < oneHour) {
      setWeather(JSON.parse(cachedWeather));
      return;
    }

    const saveWeather = (data) => {
      setWeather(data);
      localStorage.setItem('cropcare_weather', JSON.stringify(data));
      localStorage.setItem('cropcare_weather_time', Date.now().toString());
    };

    const getFallbackWeather = () => {
      // Seed a stable mock weather based on the current date, so it's consistent for the day
      const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
      const seed = dayOfYear % 3; // 0, 1, 2
      if (seed === 0) {
        return { temp: 24, rainProb: 85, condition: 'Rain' };
      } else if (seed === 1) {
        return { temp: 42, rainProb: 5, condition: 'Hot' };
      } else {
        return { temp: 30, rainProb: 10, condition: 'Clear' };
      }
    };

    // Try to get real location-based weather
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&hourly=precipitation_probability&forecast_days=1`);
            if (!res.ok) throw new Error('Weather API failed');
            const data = await res.json();

            const temp = Math.round(data.current.temperature_2m);
            const code = data.current.weather_code;

            let condition = 'Clear';
            let rainProb = data.hourly?.precipitation_probability?.[0] || 10;

            if (code >= 51 && code <= 99) {
              condition = 'Rain';
              rainProb = Math.max(rainProb, 75); // Ensure high probability if raining
            } else if (temp > 38) {
              condition = 'Hot';
            } else {
              condition = 'Clear';
            }

            saveWeather({ temp, rainProb, condition });
          } catch (err) {
            saveWeather(getFallbackWeather());
          }
        },
        () => {
          saveWeather(getFallbackWeather());
        }
      );
    } else {
      saveWeather(getFallbackWeather());
    }
  }, []);

  const renderAlert = () => {
    if (weather.rainProb > 70) {
      return (
        <div className="weather-alert" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px',
          borderRadius: 'var(--border-radius-md)',
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.15)',
          color: 'var(--danger-color)',
          fontWeight: '600',
          fontSize: '14px',
          marginTop: '12px'
        }}>
          <CloudRain size={20} color="var(--danger-color)" />
          <span>{t('smartAlertRain')}</span>
        </div>
      );
    } else if (weather.temp > 38) {
      return (
        <div className="weather-alert" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px',
          borderRadius: 'var(--border-radius-md)',
          background: 'rgba(245, 158, 11, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.15)',
          color: 'var(--warning-color)',
          fontWeight: '600',
          fontSize: '14px',
          marginTop: '12px'
        }}>
          <AlertCircle size={20} color="var(--warning-color)" />
          <span>{t('smartAlertHeat')}</span>
        </div>
      );
    } else {
      return (
        <div className="weather-alert" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px',
          borderRadius: 'var(--border-radius-md)',
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.15)',
          color: 'var(--success-color)',
          fontWeight: '600',
          fontSize: '14px',
          marginTop: '12px'
        }}>
          <Sun size={20} color="var(--success-color)" />
          <span>{t('smartAlertClear')}</span>
        </div>
      );
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="weather-card" style={{ marginBottom: 0 }}>
        <div>
          <h3 style={{ marginBottom: '4px' }}>{t('weatherAlert')}</h3>
          <p style={{ fontSize: '13px', opacity: 0.9 }}>{t('home')}, {weather.condition}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '24px', fontWeight: '800' }}>
            <Thermometer size={24} />
            {weather.temp}°C
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', justifyContent: 'flex-end', marginTop: '4px' }}>
            <CloudRain size={16} />
            {weather.rainProb}% {t('rain')}
          </div>
        </div>
      </div>
      {renderAlert()}
    </div>
  );
}


// ==========================================
// FILE: components/ReviewSection.jsx
// ==========================================
const ReviewSection = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setRating(0);
    setReview('');
  };

  return (
    <div className="card-premium animate-fade-in" style={{ marginTop: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <MessageSquare size={20} color="var(--primary-color)" />
        <h3 style={{ margin: 0 }}>Rate Your Experience</h3>
      </div>

      {submitted ? (
        <div style={{
          textAlign: 'center',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '16px',
            borderRadius: '50%',
            color: 'var(--success-color)'
          }}>
            <CheckCircle2 size={32} />
          </div>
          <p style={{ fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>Thank you for your feedback!</p>
          <p style={{ fontSize: '13px', margin: 0 }}>Your review helps us grow together.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                className={hover >= star || rating >= star ? 'pulse-soft' : ''}
              >
                <Star
                  size={32}
                  fill={hover >= star || rating >= star ? 'var(--accent-color)' : 'none'}
                  color={hover >= star || rating >= star ? 'var(--accent-color)' : 'var(--text-muted)'}
                  style={{
                    strokeWidth: 1.5,
                    filter: hover >= star || rating >= star ? 'drop-shadow(0 0 5px rgba(255, 193, 7, 0.4))' : 'none'
                  }}
                />
              </button>
            ))}
          </div>

          <div className="input-field-group">
            <textarea
              placeholder="Tell us how we can improve..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '16px',
                borderRadius: 'var(--border-radius-md)',
                background: 'var(--bg-color)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                fontSize: '15px',
                resize: 'none',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={rating === 0}
            style={{
              opacity: rating === 0 ? 0.6 : 1,
              marginTop: '12px'
            }}
          >
            <Send size={18} /> Submit Review
          </button>
        </form>
      )}
    </div>
  );
};


// ==========================================
// FILE: pages/HomePage.jsx
// ==========================================
function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="animate-fade-in" style={{ position: 'relative' }}>
      {/* Decorative Icons */}
      <Leaf size={120} className="nature-accent" style={{ top: '-40px', right: '-40px' }} />
      <Sprout size={80} className="nature-accent" style={{ bottom: '100px', left: '-20px' }} />

      <div className="mb-8">
        <WeatherSection />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-center">
        <div style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          aspectRatio: '16/9',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <img
            src="/farmer_hero_premium.png"
            alt="Smart Farming"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            padding: '20px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            color: 'white'
          }}>
            <h2 style={{ color: 'white', margin: 0, fontSize: '24px' }}>{t('uploadTitle')}</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', margin: 0 }}>{t('uploadDesc')}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl mb-4 font-bold" style={{ color: 'var(--text-primary)' }}>
            {t('welcomeBack')}, {user?.full_name || 'Farmer'} 👋
          </h1>
          <button className="btn-primary" onClick={() => navigate('/crop-details')} style={{ padding: '24px' }}>
            <Sparkles size={24} /> <span style={{ fontSize: '18px' }}>{t('scan')}</span>
          </button>
          <p className="hidden md:block text-muted text-sm">{t('scanHelperText') || 'Analyze your crops in seconds using our advanced AI models.'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Bird size={20} color="var(--primary-color)" /> {t('marketEdge')}
          </h3>
          <div className="card-premium" style={{
            background: 'linear-gradient(135deg, #fff 0%, #fff8e1 100%)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '24px',
            borderLeft: '4px solid #ffc107',
            height: '100%'
          }}>
            <img src="/market_edge_icon_1777741212875.png" alt="Market" style={{ width: '80px', height: '80px' }} />
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, color: '#b78b00', fontSize: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{t('liveMarketPrices')}</span>
                <span style={{ fontSize: '11px', background: '#ffc107', color: '#5d3e00', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold' }}>APMC Mandi</span>
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>{t('wheat')}</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '18px', color: 'var(--text-primary)', fontWeight: '800' }}>₹2,450<span style={{ fontSize: '11px', fontWeight: 'normal', color: 'var(--text-muted)' }}>{t('quintal')}</span></p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>{t('rice')}</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '18px', color: 'var(--text-primary)', fontWeight: '800' }}>₹3,800<span style={{ fontSize: '11px', fontWeight: 'normal', color: 'var(--text-muted)' }}>{t('quintal')}</span></p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>{t('cotton')}</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '18px', color: 'var(--text-primary)', fontWeight: '800' }}>₹7,200<span style={{ fontSize: '11px', fontWeight: 'normal', color: 'var(--text-muted)' }}>{t('quintal')}</span></p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Updated: Today (National Average)</span>
                <span style={{ color: 'var(--success-color)', fontSize: '13px', fontWeight: 'bold' }}>+2.4% ↑</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bird size={20} color="var(--primary-color)" /> {t('appName')} {t('tools')}
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="card-premium" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
              <div style={{ background: 'rgba(76, 175, 80, 0.1)', padding: '12px', borderRadius: '16px' }}>
                <ShieldAlert color="var(--primary-color)" size={24} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--text-primary)' }}>{t('earlyDetection')}</h4>
                <p style={{ fontSize: '13px', margin: 0, color: 'var(--text-secondary)' }}>{t('earlyDetectionDesc')}</p>
              </div>
            </div>

            <div className="card-premium" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
              <div style={{ background: 'rgba(255, 193, 7, 0.1)', padding: '12px', borderRadius: '16px' }}>
                <Bug color="var(--accent-color)" size={24} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--text-primary)' }}>{t('pestControl')}</h4>
                <p style={{ fontSize: '13px', margin: 0, color: 'var(--text-secondary)' }}>{t('pestControlDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReviewSection />
    </div>
  );
}


// ==========================================
// FILE: pages/ScanPage.jsx
// ==========================================
function ScanPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showOfflineModal, setShowOfflineModal] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  const { t } = useLanguage();

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    if (!navigator.onLine) {
      setIsAnalyzing(true);
      try {
        const fileToBase64 = (file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
          });
        };
        const base64Image = await fileToBase64(selectedImage);
        const offlineScan = {
          id: Date.now().toString(),
          imageBase64: base64Image,
          cropInfo: location.state?.cropInfo || null,
          created_at: new Date().toISOString()
        };

        const queued = localStorage.getItem('offline_scans');
        const scans = queued ? JSON.parse(queued) : [];
        scans.push(offlineScan);
        localStorage.setItem('offline_scans', JSON.stringify(scans));

        setIsAnalyzing(false);
        setShowOfflineModal(true);
      } catch (err) {
        console.error(err);
        alert('Failed to save offline scan.');
        setIsAnalyzing(false);
      }
      return;
    }

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.details || errData.error || 'Failed to analyze image');
      }

      const result = await response.json();

      // Pass cropInfo forward to ResultsPage for dosage calculation
      navigate('/results', { state: { result, cropInfo: location.state?.cropInfo } });
    } catch (error) {
      console.error(error);
      alert('Error analyzing image: ' + (error.details || error.message));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '20px' }}>
      <WeatherSection />

      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ marginBottom: '4px' }}>{t('scan')}</h1>
        <p>{t('uploadDesc')}</p>
      </div>

      {!previewUrl ? (
        <div
          className="upload-placeholder pulse-soft"
          onClick={() => fileInputRef.current?.click()}
        >
          <div style={{
            width: '80px',
            height: '80px',
            background: 'var(--primary-light)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 10px 20px rgba(76, 175, 80, 0.3)'
          }}>
            <Camera size={40} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ margin: 0, color: 'var(--primary-dark)' }}>{t('uploadTitle')}</h2>
            <p style={{ marginTop: '4px' }}>Tap to capture or select from gallery</p>
          </div>

          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageSelect}
          />
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="image-preview-container">
            <img
              src={previewUrl}
              alt="Preview"
            />
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(0,0,0,0.5)',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              backdropFilter: 'blur(4px)'
            }}>
              {t('retake')}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button
              className="btn-outline"
              style={{ flex: 1 }}
              onClick={() => { setSelectedImage(null); setPreviewUrl(null); }}
              disabled={isAnalyzing}
            >
              {t('retake')}
            </button>
            <button
              className="btn-primary"
              style={{ flex: 2 }}
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={20} className="spinner" />
                  {t('analyzing')}
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  {t('analyze')}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {isAnalyzing && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <h2 style={{ color: 'var(--primary-dark)' }}>{t('analyzing')}</h2>
          <p>This may take a few seconds...</p>
        </div>
      )}

      {/* Offline Modal */}
      {showOfflineModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div className="card-premium animate-fade-in" style={{
            maxWidth: '400px',
            width: '100%',
            padding: '32px',
            textAlign: 'center',
            background: 'white',
            borderRadius: '24px',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <div style={{
              background: 'rgba(76, 175, 80, 0.1)',
              color: 'var(--primary-color)',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <CloudOff size={32} />
            </div>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>Offline Scan Queued</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
              You are currently offline. We have saved your crop leaf scan locally. It will be analyzed automatically when your connection is restored!
            </p>
            <button
              className="btn-primary"
              style={{ width: '100%' }}
              onClick={() => {
                setShowOfflineModal(false);
                navigate('/history');
              }}
            >
              View History
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


// ==========================================
// FILE: pages/ResultsPage.jsx
// ==========================================
function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const result = location.state?.result;

  if (!result) {
    return <Navigate to="/scan" />;
  }

  const isHealthy = result.disease_name.toLowerCase().includes('healthy');

  // Dosage Calculation: Base rate * land size (prefer crop-specific land size from flow)
  const landSize = location.state?.cropInfo?.land_size || user?.land_size || 1;
  const baseRate = 45; // kg/acre
  const totalAmount = (baseRate * landSize).toFixed(1);

  const [isSpeaking, setIsSpeaking] = React.useState(false);

  const speakResults = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Stop any current speech before starting new one
    window.speechSynthesis.cancel();

    const text = `${t('results')}: ${result.disease_name}. ${t('confidence')}: ${(result.confidence * 100).toFixed(1)}%. ${t('advice')}: ${result.remedies}`;
    const utterance = new SpeechSynthesisUtterance(text);

    // Map application language to browser speech language
    const langMap = {
      'hi': 'hi-IN',
      'bn': 'bn-IN',
      'mr': 'mr-IN',
      'ta': 'ta-IN',
      'te': 'te-IN',
      'kn': 'kn-IN',
      'ml': 'ml-IN',
      'gu': 'gu-IN',
      'pa': 'pa-IN',
      'en': 'en-US'
    };

    utterance.lang = langMap[language] || 'en-US';

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      <button
        onClick={() => navigate('/scan')}
        className="btn-outline"
        style={{ padding: '8px 16px', width: 'auto', border: 'none', marginBottom: '16px' }}
      >
        <ChevronLeft size={20} /> {t('retake')}
      </button>

      <div className="image-preview-container" style={{ marginBottom: '24px' }}>
        <img
          src={`${API_BASE_URL}${result.image_url}`}
          alt="Scanned Crop"
          style={{ height: '240px' }}
        />
      </div>

      <div className={`result-card ${isHealthy ? 'healthy' : 'disease'}`}>
        <div className="confidence-badge">
          {(result.confidence * 100).toFixed(1)}% {t('confidence')}
        </div>

        <h1 style={{ fontSize: '28px', marginBottom: '16px' }}>
          {isHealthy ? t('healthy') : result.disease_name}
        </h1>

        <button
          onClick={speakResults}
          className="btn-outline"
          style={{ width: 'auto', padding: '10px 24px', borderRadius: '30px', margin: '0 auto 24px' }}
        >
          <Volume2 size={20} className={isSpeaking ? 'pulse-soft' : ''} />
          {isSpeaking ? 'Stop Listening' : t('voiceOutput')}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'rgba(255,255,255,0.5)', borderRadius: 'var(--border-radius-md)', textAlign: 'left' }}>
          {isHealthy ? (
            <CheckCircle2 color="var(--success-color)" size={32} />
          ) : (
            <ShieldAlert color="var(--danger-color)" size={32} />
          )}
          <p style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '600', margin: 0 }}>
            {isHealthy ? 'Your crop looks healthy!' : t('disease')}
          </p>
        </div>
      </div>

      {!isHealthy && (
        <>
          <div className="card-premium">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Sparkles color="var(--primary-color)" size={20} /> {t('advice')}
            </h3>
            <div style={{ background: 'var(--bg-color)', padding: '20px', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)' }}>
              <p style={{ lineHeight: '1.6', margin: 0, fontSize: '15px', color: 'var(--text-primary)' }}>
                {result.remedies}
              </p>
            </div>
          </div>

          <div className="card-premium" style={{ background: 'var(--gradient-green)', color: 'white', border: 'none' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'white' }}>
              <Scale size={20} /> {t('dosageInfo')}
            </h3>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '20px', borderRadius: 'var(--border-radius-md)', backdropFilter: 'blur(5px)' }}>
              <p style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>
                {totalAmount} kg {t('totalFor')} {landSize} {t('acres')}
              </p>
              <p style={{ fontSize: '12px', marginTop: '6px', opacity: 0.8 }}>
                *Based on standard {baseRate} kg {t('perAcre')} recommendation.
              </p>
            </div>
          </div>

          <div className="card-premium">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <ShoppingCart size={20} color="var(--primary-color)" /> {t('buyNow')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href="https://www.bighaat.com/collections/fertilizers"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ justifyContent: 'space-between', padding: '16px' }}
              >
                Buy from BigHaat <ExternalLink size={18} />
              </a>
              <a
                href="https://www.amazon.in/s?k=agricultural+fertilizer"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ justifyContent: 'space-between', padding: '16px' }}
              >
                Buy from Amazon <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </>
      )}

      <button className="btn-primary" onClick={() => navigate('/rating')} style={{ marginTop: '16px' }}>
        Rate Our Advice <ArrowRight size={20} />
      </button>
    </div>
  );
}


// ==========================================
// FILE: pages/HistoryPage.jsx
// ==========================================
function HistoryPage() {
  const [scans, setScans] = useState([]);
  const [offlineScans, setOfflineScans] = useState([]);
  const [searches, setSearches] = useState([]);
  const [activeHistoryTab, setActiveHistoryTab] = useState('scans'); // 'scans' or 'searches'
  const [expandedItems, setExpandedItems] = useState({});
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const { t } = useLanguage();

  const loadOfflineQueue = () => {
    const queued = localStorage.getItem('offline_scans');
    if (queued) {
      try {
        setOfflineScans(JSON.parse(queued));
      } catch (e) {
        console.error(e);
      }
    } else {
      setOfflineScans([]);
    }
  };

  const fetchHistory = async () => {
    loadOfflineQueue();
    try {
      // 1. Fetch scan history
      const response = await fetch(`${API_BASE_URL}/api/history`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setScans(data);
        localStorage.setItem('cached_scans', JSON.stringify(data));
      } else {
        const cached = localStorage.getItem('cached_scans');
        if (cached) setScans(JSON.parse(cached));
      }

      // 2. Fetch search history
      const searchRes = await fetch(`${API_BASE_URL}/api/history/searches`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        setSearches(searchData);
        localStorage.setItem('cached_searches', JSON.stringify(searchData));
      } else {
        const cached = localStorage.getItem('cached_searches');
        if (cached) setSearches(JSON.parse(cached));
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
      const cached = localStorage.getItem('cached_scans');
      if (cached) setScans(JSON.parse(cached));

      const cachedSearches = localStorage.getItem('cached_searches');
      if (cachedSearches) setSearches(JSON.parse(cachedSearches));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchHistory();
    }

    const handleSyncEvent = () => {
      fetchHistory();
    };

    window.addEventListener('scans_synced', handleSyncEvent);
    return () => {
      window.removeEventListener('scans_synced', handleSyncEvent);
    };
  }, [token]);

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <div className="loading-overlay" style={{ position: 'relative', height: '60vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  const allScans = [...offlineScans.map(s => ({ ...s, isOffline: true })), ...scans];

  return (
    <div className="animate-fade-in">
      <h1 style={{ marginBottom: '24px' }}>{t('history')}</h1>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        background: 'rgba(0,0,0,0.03)',
        padding: '6px',
        borderRadius: '16px',
        maxWidth: 'fit-content'
      }}>
        <button
          onClick={() => setActiveHistoryTab('scans')}
          style={{
            padding: '10px 20px',
            borderRadius: '12px',
            border: 'none',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: activeHistoryTab === 'scans' ? 'var(--primary-color)' : 'transparent',
            color: activeHistoryTab === 'scans' ? 'white' : 'var(--text-secondary)',
            boxShadow: activeHistoryTab === 'scans' ? '0 4px 12px rgba(76,175,80,0.2)' : 'none'
          }}
        >
          📸 Crop Leaf Scans
        </button>
        <button
          onClick={() => setActiveHistoryTab('searches')}
          style={{
            padding: '10px 20px',
            borderRadius: '12px',
            border: 'none',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: activeHistoryTab === 'searches' ? 'var(--primary-color)' : 'transparent',
            color: activeHistoryTab === 'searches' ? 'white' : 'var(--text-secondary)',
            boxShadow: activeHistoryTab === 'searches' ? '0 4px 12px rgba(76,175,80,0.2)' : 'none'
          }}
        >
          🔍 Encyclopedia Searches
        </button>
      </div>

      {activeHistoryTab === 'scans' ? (
        /* Scans History Tab */
        allScans.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '60px' }}>
            <div style={{ background: '#f1f8f1', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <AlertCircle size={40} color="var(--primary-light)" />
            </div>
            <p style={{ fontWeight: '600' }}>No scans found yet.</p>
            <p style={{ fontSize: '14px' }}>Start by scanning a crop from the home page.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {allScans.map((scan) => (
              <div
                key={scan.id || scan._id}
                className="card-premium"
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '12px',
                  marginBottom: '0',
                  alignItems: 'center',
                  borderLeft: scan.isOffline ? '4px solid #ff9800' : 'none'
                }}
              >
                <img
                  src={scan.isOffline ? scan.imageBase64 : `${API_BASE_URL}${scan.image_url}`}
                  alt={scan.disease_name || "Offline Scan"}
                  style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: 'var(--border-radius-sm)' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '15px', margin: 0, color: 'var(--text-primary)' }}>
                      {scan.isOffline ? 'Pending AI Analysis' : scan.disease_name}
                    </h3>
                    {scan.isOffline && (
                      <span style={{
                        fontSize: '10px',
                        background: 'rgba(255, 152, 0, 0.15)',
                        color: '#ff9800',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontWeight: '700'
                      }}>
                        Pending Sync
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '12px' }}>
                    <Calendar size={12} />
                    <span>{new Date(scan.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                {scan.isOffline ? (
                  <CloudUpload size={20} color="#ff9800" className="pulse-soft" />
                ) : (
                  <ChevronRight size={20} color="var(--text-muted)" />
                )}
              </div>
            ))}
          </div>
        )
      ) : (
        /* Advisory/Search History Tab */
        searches.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '60px' }}>
            <div style={{ background: '#f1f8f1', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Search size={40} color="var(--primary-light)" />
            </div>
            <p style={{ fontWeight: '600' }}>No search history found yet.</p>
            <p style={{ fontSize: '14px' }}>Search for a crop in the Knowledge Hub to build search history.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {searches.map((item) => {
              const isExpanded = !!expandedItems[item._id];
              return (
                <div
                  key={item._id}
                  className="card-premium"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    padding: '16px',
                    marginBottom: '0',
                    cursor: 'pointer',
                    borderLeft: item.source === 'gemini' ? '4px solid #9c27b0' : '4px solid #4caf50',
                    transition: 'all 0.3s'
                  }}
                  onClick={() => toggleExpand(item._id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        background: item.source === 'gemini' ? 'rgba(156, 39, 176, 0.1)' : 'rgba(76, 175, 80, 0.1)',
                        padding: '10px',
                        borderRadius: '12px',
                        color: item.source === 'gemini' ? '#9c27b0' : '#4caf50',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Search size={18} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '15px', margin: 0, color: 'var(--text-primary)', fontWeight: '700' }}>
                          Crop: <span style={{ textTransform: 'capitalize' }}>{item.query}</span>
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '12px', marginTop: '2px' }}>
                          <Clock size={12} />
                          <span>{new Date(item.created_at).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontSize: '10px',
                        background: item.source === 'gemini' ? 'rgba(156, 39, 176, 0.15)' : 'rgba(76, 175, 80, 0.15)',
                        color: item.source === 'gemini' ? '#9c27b0' : '#4caf50',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {item.source === 'gemini' ? '✨ Gemini AI' : '📁 Datafile'}
                      </span>
                      {isExpanded ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div
                      style={{
                        marginTop: '8px',
                        paddingTop: '16px',
                        borderTop: '1px solid rgba(0,0,0,0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                      }}
                      onClick={(e) => e.stopPropagation()} // Prevent collapsing when clicking inner text
                    >
                      <p style={{ margin: 0, fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Identified Diseases & Advisory Info:
                      </p>
                      {item.results.map((disease, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: 'rgba(0,0,0,0.015)',
                            border: '1px solid rgba(0,0,0,0.03)',
                            borderRadius: '16px',
                            padding: '14px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--primary-dark)', fontWeight: '700' }}>
                              {disease.name}
                            </h4>
                            <span style={{
                              fontSize: '10px',
                              background: disease.severity === 'High' ? 'rgba(244, 67, 54, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                              color: disease.severity === 'High' ? '#f44336' : '#ff9800',
                              padding: '2px 8px',
                              borderRadius: '10px',
                              fontWeight: '700'
                            }}>
                              {disease.severity} Severity
                            </span>
                          </div>
                          <div style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                            <strong>Symptoms:</strong> {disease.symptoms}
                          </div>
                          <div style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                            <strong>Causes:</strong> {disease.causes}
                          </div>
                          <div style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                            <strong>Prevention:</strong> {disease.prevention}
                          </div>
                          <div style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                            <strong>Treatment:</strong> {disease.treatment}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}


// ==========================================
// FILE: components/BackgroundParticles.jsx
// ==========================================
const BackgroundParticles = () => {
  return (
    <div className="particles-container" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <div className="floating-particle" style={{ top: '10%', left: '10%', '--duration': '8s', '--opacity': '0.15' }}>
        <Leaf size={40} color="var(--primary-color)" />
      </div>
      <div className="floating-particle" style={{ top: '60%', left: '80%', '--duration': '10s', '--opacity': '0.1' }}>
        <Wind size={30} color="var(--primary-light)" />
      </div>
      <div className="floating-particle" style={{ top: '30%', left: '70%', '--duration': '7s', '--opacity': '0.2' }}>
        <Sparkles size={24} color="var(--accent-color)" />
      </div>
      <div className="floating-particle" style={{ top: '80%', left: '20%', '--duration': '12s', '--opacity': '0.1' }}>
        <Leaf size={50} color="var(--secondary-color)" />
      </div>
    </div>
  );
};


// ==========================================
// FILE: pages/LoginPage.jsx
// ==========================================
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.user, data.token);
        navigate('/');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <BackgroundParticles />
      <Header />
      <div className="auth-container animate-fade-in" style={{ zIndex: 1 }}>
        <button className="theme-toggle" onClick={() => navigate('/welcome')} style={{ width: 'auto', padding: '0 12px', borderRadius: '12px', marginBottom: '20px' }}>
          <ArrowLeft size={18} />
          <span style={{ marginLeft: '6px', fontSize: '14px', fontWeight: '600' }}>Back</span>
        </button>

        <div className="auth-header-section" style={{ textAlign: 'left', marginBottom: '30px' }}>
          <div className="auth-icon-box" style={{ margin: '0 0 20px 0' }}>
            <Leaf size={40} fill="var(--primary-color)" />
          </div>
          <h1 style={{ fontSize: '32px' }}>{t('login')}</h1>
          <p style={{ fontSize: '16px' }}>{t('appName')} — your smart farming partner.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel animate-slide-up">
          <div className="input-field-group stagger-1">
            <label>{t('emailPhone')}</label>
            <div className="input-wrapper">
              <Mail size={20} />
              <input
                type="text"
                placeholder={t('placeholderEmail')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-field-group stagger-2">
            <label>{t('password')}</label>
            <div className="input-wrapper">
              <Lock size={20} />
              <input
                type="password"
                placeholder={t('placeholderPass')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div className="error-message animate-fade-in" style={{
              marginBottom: '16px',
              padding: '12px',
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '12px',
              color: 'var(--danger-color)',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '10px' }}>
            {loading ? <Loader2 className="spinner" style={{ width: '24px', height: '24px' }} /> : (
              <>
                {t('login')}
                <ChevronRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer" style={{ marginTop: 'auto', padding: '20px 0' }}>
          <p style={{ textAlign: 'center' }}>
            {t('noAccount')} {' '}
            <Link to="/signup" style={{ color: 'var(--primary-color)', fontWeight: '700', textDecoration: 'none' }}>
              {t('signup')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// FILE: pages/SignupPage.jsx
// ==========================================
const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.user, data.token);
        navigate('/');
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('Connection error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <BackgroundParticles />
      <Header />
      <div className="auth-container animate-fade-in" style={{ paddingBottom: '40px', zIndex: 1 }}>
        <button className="theme-toggle" onClick={() => navigate('/welcome')} style={{ width: 'auto', padding: '0 12px', borderRadius: '12px', marginBottom: '20px' }}>
          <ArrowLeft size={18} />
          <span style={{ marginLeft: '6px', fontSize: '14px', fontWeight: '600' }}>Back</span>
        </button>

        <div className="auth-header-section" style={{ textAlign: 'left', marginBottom: '24px' }}>
          <div className="auth-icon-box" style={{ margin: '0 0 20px 0', background: 'var(--gradient-green)', color: 'white' }}>
            <Leaf size={40} fill="white" />
          </div>
          <h1 style={{ fontSize: '32px' }}>{t('signup')}</h1>
          <p style={{ fontSize: '16px' }}>Join thousands of smart farmers today.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel animate-slide-up">
          <div className="input-field-group stagger-1">
            <label>{t('name')}</label>
            <div className="input-wrapper">
              <User size={20} />
              <input
                type="text"
                placeholder={t('placeholderName')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-field-group stagger-2">
            <label>{t('emailPhone')}</label>
            <div className="input-wrapper">
              <Mail size={20} />
              <input
                type="text"
                placeholder={t('placeholderEmail')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-field-group stagger-3">
            <label>{t('password')}</label>
            <div className="input-wrapper">
              <Lock size={20} />
              <input
                type="password"
                placeholder={t('placeholderPass')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div className="error-message animate-fade-in" style={{
              marginBottom: '16px',
              padding: '12px',
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '12px',
              color: 'var(--danger-color)',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '10px' }}>
            {loading ? <Loader2 className="spinner" style={{ width: '24px', height: '24px' }} /> : (
              <>
                {t('signup')}
                <ChevronRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer" style={{ marginTop: '24px' }}>
          <p style={{ textAlign: 'center' }}>
            {t('hasAccount')} {' '}
            <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '700', textDecoration: 'none' }}>
              {t('login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// FILE: pages/CropDetailsPage.jsx
// ==========================================
function CropDetailsPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cropVariety: '',
    soilType: '',
    plantingDate: '',
    land_size: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the crop-specific land size to the scan flow
    navigate('/scan', { state: { cropInfo: formData } });
  };

  return (
    <div className="animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div className="auth-icon-box" style={{ background: 'var(--gradient-green)', color: 'white' }}>
          <Sprout size={40} />
        </div>
        <h1>{t('cropDetails')}</h1>
        <p>Tell us more about your current cultivation</p>
      </div>

      <form onSubmit={handleSubmit} className="card-premium">
        <div className="input-field-group">
          <label>{t('cropVariety')}</label>
          <div className="input-wrapper">
            <Leaf size={20} />
            <input
              type="text"
              placeholder="e.g. Basmati Rice, Wheat"
              value={formData.cropVariety}
              onChange={(e) => setFormData({ ...formData, cropVariety: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="input-field-group">
          <label>{t('landSize')}</label>
          <div className="input-wrapper">
            <MapPin size={20} />
            <input
              type="number"
              placeholder={t('placeholderLand')}
              value={formData.land_size}
              onChange={(e) => setFormData({ ...formData, land_size: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="input-field-group">
          <label>{t('soilType')}</label>
          <div className="input-wrapper">
            <Droplets size={20} />
            <select
              style={{
                width: '100%',
                padding: '16px 16px 16px 48px',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--glass-border)',
                background: 'var(--bg-color)',
                color: 'var(--text-primary)',
                fontSize: '16px'
              }}
              value={formData.soilType}
              onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
              required
            >
              <option value="">Select Soil Type</option>
              <option value="alluvial">Alluvial</option>
              <option value="black">Black Soil</option>
              <option value="red">Red Soil</option>
              <option value="laterite">Laterite</option>
              <option value="sandy">Sandy</option>
            </select>
          </div>
        </div>

        <div className="input-field-group">
          <label>{t('plantingDate')}</label>
          <div className="input-wrapper">
            <Calendar size={20} />
            <input
              type="date"
              value={formData.plantingDate}
              onChange={(e) => setFormData({ ...formData, plantingDate: e.target.value })}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '24px' }}>
          {t('next')} <ArrowRight size={20} />
        </button>
      </form>
    </div>
  );
}


// ==========================================
// FILE: pages/ProfilePage.jsx
// ==========================================
function ProfilePage() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div className="auth-icon-box" style={{ background: 'var(--gradient-green)', color: 'white' }}>
          <User size={40} />
        </div>
        <h1>{t('profile')}</h1>
        <p>{user?.full_name}</p>
      </div>

      <div className="card-premium">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'var(--bg-color)', padding: '10px', borderRadius: '12px' }}>
              <Mail size={20} color="var(--primary-color)" />
            </div>
            <div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Email / Phone</p>
              <p style={{ fontSize: '15px', fontWeight: '600', margin: 0 }}>{user?.email}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'var(--bg-color)', padding: '10px', borderRadius: '12px' }}>
              <MapPin size={20} color="var(--primary-color)" />
            </div>
            <div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{t('landSize')}</p>
              <p style={{ fontSize: '15px', fontWeight: '600', margin: 0 }}>{user?.land_size} {t('acres')}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'var(--bg-color)', padding: '10px', borderRadius: '12px' }}>
              <ShieldCheck size={20} color="var(--primary-color)" />
            </div>
            <div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Account Status</p>
              <p style={{ fontSize: '15px', fontWeight: '600', margin: 0, color: 'var(--success-color)' }}>Verified Farmer</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card-premium" style={{ background: 'var(--gradient-green)', color: 'white', border: 'none' }}>
        <h3 style={{ color: 'white', marginBottom: '8px' }}>Active Cultivation</h3>
        <p style={{ opacity: 0.9, fontSize: '14px' }}>Managing {user?.land_size} acres with AI monitoring enabled.</p>
        <button className="btn-primary" style={{ background: 'white', color: 'var(--primary-color)', marginTop: '16px', padding: '12px' }}>
          <Sprout size={18} /> Upgrade Plan
        </button>
      </div>

      <button
        onClick={logout}
        className="btn-outline"
        style={{ marginTop: '24px', color: 'var(--danger-color)', borderColor: 'var(--danger-color)', borderOpacity: 0.2 }}
      >
        <LogOut size={20} /> {t('logout')}
      </button>
    </div>
  );
}


// ==========================================
// FILE: components/KnowledgeHub/DiseaseEncyclopedia.jsx
// ==========================================
const DiseaseEncyclopedia = () => {
  const { t } = useLanguage();
  const { token } = useAuth();
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dynamicDiseases, setDynamicDiseases] = useState([]);
  const [isOfflineResult, setIsOfflineResult] = useState(false);

  const initialDiseases = [
    {
      id: 1,
      name: "Tomato Leaf Curl",
      crop: "Tomato",
      severity: "High",
      image: "/tomato_disease.png",
      symptoms: "Yellowing of leaf margins, upward curling of leaves, stunted growth, and reduced fruit size.",
      causes: "Transmitted by whiteflies (Bemisia tabaci). Common in warm and humid conditions.",
      prevention: "Use virus-free seedlings, install yellow sticky traps, and plant resistant varieties.",
      treatment: "Apply systemic insecticides like Imidacloprid to control whiteflies. Remove infected plants immediately."
    },
    {
      id: 2,
      name: "Rice Blast",
      crop: "Rice",
      severity: "Medium",
      image: "/rice_disease.png",
      symptoms: "Spindle-shaped lesions on leaves with gray centers and brown borders. Can also affect the neck of the grain.",
      causes: "Fungal infection caused by Magnaporthe oryzae. Spread by wind and high moisture.",
      prevention: "Avoid excessive nitrogen fertilizers, use certified seeds, and maintain proper water levels.",
      treatment: "Spray fungicides like Tricyclazole or Carbendazim. Burn crop residues after harvest."
    },
    {
      id: 3,
      name: "Potato Late Blight",
      crop: "Potato",
      severity: "High",
      image: "/potato_disease.png",
      symptoms: "Dark, water-soaked spots on leaves. White moldy growth on the underside during humid weather.",
      causes: "Oomycete pathogen Phytophthora infestans. Favored by cool, wet weather.",
      prevention: "Use resistant varieties, ensure proper drainage, and rotate crops.",
      treatment: "Apply Mancozeb or Copper-based fungicides. Destroy all infected tubers."
    }
  ];

  const offlineCropFallbacks = {
    wheat: [
      {
        id: 'wheat_rust',
        name: "Wheat Rust (Puccinia)",
        crop: "Wheat",
        severity: "High",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800",
        symptoms: "Yellow, orange, or reddish-brown powdery pustules on leaves, stems, and spikes.",
        causes: "Fungal pathogens (Puccinia graminis, P. striiformis, P. triticina). Spread by windborne spores.",
        prevention: "Plant rust-resistant cultivars, eradicate volunteer wheat plants, and sow early.",
        treatment: "Apply triazole or strobulurin fungicides (Tebuconazole, Propiconazole) at first sign of infection."
      },
      {
        id: 'wheat_powdery_mildew',
        name: "Powdery Mildew of Wheat",
        crop: "Wheat",
        severity: "Medium",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
        symptoms: "White to light gray powdery patches of mycelium and conidia on leaves, stems, and leaf sheaths.",
        causes: "Fungi (Blumeria graminis f. sp. tritici). Favored by cool, humid weather and dense crop stands.",
        prevention: "Avoid excessive nitrogen fertilization, sow at proper density, and use resistant varieties.",
        treatment: "Apply systemic fungicides like Triadimefon or Propiconazole if disease levels exceed thresholds."
      }
    ],
    cotton: [
      {
        id: 'cotton_leaf_curl',
        name: "Cotton Leaf Curl Virus (CLCuV)",
        crop: "Cotton",
        severity: "High",
        image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=800",
        symptoms: "Upward or downward curling of leaves, thickening of veins, and leaf-like enations on undersides.",
        causes: "Begomovirus transmitted by Whiteflies (Bemisia tabaci).",
        prevention: "Destroy alternate weed hosts, cultivate CLCuV-resistant varieties, and control whitefly vector early.",
        treatment: "Use systemic insecticides (Acetamiprid, Diafenthiuron) to manage the whitefly vector."
      }
    ],
    corn: [
      {
        id: 'corn_smut',
        name: "Common Corn Smut (Ustilago maydis)",
        crop: "Corn",
        severity: "Medium",
        image: "https://images.unsplash.com/photo-1551754626-787a49df515e?auto=format&fit=crop&q=80&w=800",
        symptoms: "Large, white, fleshy galls or swellings on ears, tassels, stalks, and leaves that later turn black and powdery.",
        causes: "Fungus Ustilago maydis. Spores survive in soil and crop debris.",
        prevention: "Avoid mechanical damage to stalks, choose resistant varieties, and maintain crop rotation.",
        treatment: "Remove galls before they rupture. Fungicide seed treatments can help reduce soil-borne inoculum."
      }
    ],
    maize: [
      {
        id: 'maize_smut',
        name: "Common Corn Smut (Ustilago maydis)",
        crop: "Maize",
        severity: "Medium",
        image: "https://images.unsplash.com/photo-1551754626-787a49df515e?auto=format&fit=crop&q=80&w=800",
        symptoms: "Large, white, fleshy galls or swellings on ears, tassels, stalks, and leaves that later turn black and powdery.",
        causes: "Fungus Ustilago maydis. Spores survive in soil and crop debris.",
        prevention: "Avoid mechanical damage to stalks, choose resistant varieties, and maintain crop rotation.",
        treatment: "Remove galls before they rupture. Fungicide seed treatments can help reduce soil-borne inoculum."
      }
    ]
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      setLoading(true);
      setIsOfflineResult(false);

      if (!navigator.onLine) {
        const cleanQuery = query.toLowerCase().trim();
        const cached = localStorage.getItem(`disease_search_${cleanQuery}`);
        if (cached) {
          setDynamicDiseases(JSON.parse(cached));
          setIsOfflineResult(true);
          setFilter('Search Results');
        } else if (offlineCropFallbacks[cleanQuery]) {
          setDynamicDiseases(offlineCropFallbacks[cleanQuery]);
          setIsOfflineResult(true);
          setFilter('Search Results');
        } else {
          const matchedKey = Object.keys(offlineCropFallbacks).find(key =>
            key.includes(cleanQuery) || cleanQuery.includes(key)
          );
          if (matchedKey) {
            setDynamicDiseases(offlineCropFallbacks[matchedKey]);
            setIsOfflineResult(true);
            setFilter('Search Results');
          } else {
            setDynamicDiseases([]);
            setFilter('Search Results');
          }
        }
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/knowledge/diseases?crop=${encodeURIComponent(query)}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setDynamicDiseases(data);
          localStorage.setItem(`disease_search_${query.toLowerCase().trim()}`, JSON.stringify(data));
          setFilter('Search Results');
        }
      } catch (err) {
        console.error("Search error, falling back offline:", err);
        const cleanQuery = query.toLowerCase().trim();
        const cached = localStorage.getItem(`disease_search_${cleanQuery}`);
        if (cached) {
          setDynamicDiseases(JSON.parse(cached));
          setIsOfflineResult(true);
        } else if (offlineCropFallbacks[cleanQuery]) {
          setDynamicDiseases(offlineCropFallbacks[cleanQuery]);
          setIsOfflineResult(true);
        } else {
          setDynamicDiseases([]);
        }
        setFilter('Search Results');
      } finally {
        setLoading(false);
      }
    } else if (query.length === 0) {
      setDynamicDiseases([]);
      setIsOfflineResult(false);
      setFilter('All');
    }
  };

  const diseases = dynamicDiseases.length > 0 ? dynamicDiseases : initialDiseases;

  const filteredDiseases = diseases.filter(d =>
    (filter === 'All' || filter === 'Search Results' || d.crop === filter) &&
    (d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.crop.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white/20">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-nature-dark/40" size={20} />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="w-full pl-10 pr-4 py-3 bg-white/80 rounded-xl border-none focus:ring-2 ring-nature-DEFAULT/20 transition-all outline-none text-nature-dark"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto no-scrollbar">
          {['All', 'Tomato', 'Rice', 'Potato', ...(dynamicDiseases.length > 0 ? ['Search Results'] : [])].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${filter === cat
                  ? 'bg-nature-DEFAULT text-white shadow-lg'
                  : 'bg-white/80 text-nature-dark/60 hover:bg-white hover:text-nature-DEFAULT'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {isOfflineResult && (
        <div style={{
          background: 'rgba(255, 152, 0, 0.1)',
          color: '#e65100',
          padding: '12px 20px',
          borderRadius: '16px',
          fontSize: '13px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          border: '1px solid rgba(255,152,0,0.2)',
          marginBottom: '16px'
        }}>
          <AlertTriangle size={16} />
          <span>You are offline. Showing cached or local database fallback results.</span>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/30 rounded-[40px] border border-white/20 animate-pulse">
          <div className="w-16 h-16 border-4 border-nature-DEFAULT border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="font-bold text-nature-dark/60 uppercase tracking-widest text-xs">AI is searching for diseases...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiseases.map(disease => (
            <div
              key={disease.id}
              className="group bg-white/60 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/40 hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedDisease(disease)}
            >
              <div className="relative h-48 overflow-hidden">
                <img src={disease.image} alt={disease.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <div className={`w-2 h-2 rounded-full ${disease.severity === 'High' ? 'bg-red-500 animate-pulse' : 'bg-orange-500'}`}></div>
                  <span className="text-[10px] font-bold uppercase tracking-wider">{disease.severity} {t('riskLevel')}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-white text-sm font-medium flex items-center gap-2">{t('viewDetails')} <Info size={16} /></span>
                </div>
              </div>
              <div className="p-6">
                <span className="text-[10px] font-bold text-nature-DEFAULT uppercase tracking-widest mb-1 block">{disease.crop}</span>
                <h3 className="text-lg font-bold text-nature-dark mb-2">{disease.name}</h3>
                <p className="text-sm text-nature-dark line-clamp-2 leading-relaxed">{disease.symptoms}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedDisease && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 animate-fade-in">
          <div className="absolute inset-0 bg-nature-dark/40 backdrop-blur-md" onClick={() => setSelectedDisease(null)}></div>
          <div className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden no-scrollbar">
            <button
              onClick={() => setSelectedDisease(null)}
              className="absolute top-6 right-6 p-2 bg-nature-light hover:bg-nature-DEFAULT hover:text-white rounded-full transition-all z-10"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col">
              <div className="w-full h-64 md:h-80 relative">
                <img src={selectedDisease.image} alt={selectedDisease.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              </div>

              <div className="p-6 md:p-10 space-y-8 -mt-12 relative z-10 bg-white rounded-t-[40px]">
                <div>
                  <div className="inline-block px-3 py-1 bg-nature-light text-nature-DEFAULT rounded-full text-[10px] font-black uppercase tracking-widest mb-2">
                    {selectedDisease.crop} Medicine
                  </div>
                  <h2 className="text-3xl font-black text-nature-dark leading-tight">{selectedDisease.name}</h2>
                </div>

                <div className="grid gap-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 shadow-sm">
                      <AlertTriangle size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-nature-dark text-sm mb-1 uppercase tracking-wider">{t('symptoms')}</h4>
                      <p className="text-sm text-nature-dark/80 leading-relaxed">{selectedDisease.symptoms}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 shadow-sm">
                      <Info size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-nature-dark text-sm mb-1 uppercase tracking-wider">{t('causes')}</h4>
                      <p className="text-sm text-nature-dark/80 leading-relaxed">{selectedDisease.causes}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 shadow-sm">
                      <ShieldCheck size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-nature-dark text-sm mb-1 uppercase tracking-wider">{t('preventionTreatment')}</h4>
                      <div className="space-y-4 mt-3">
                        <div className="p-4 bg-green-50/50 rounded-2xl border border-green-100">
                          <p className="text-[10px] font-black text-green-800 uppercase tracking-[0.15em] mb-1">{t('preventiveAction')}</p>
                          <p className="text-xs text-green-700 leading-relaxed">{selectedDisease.prevention}</p>
                        </div>
                        <div className="p-4 bg-nature-light/50 rounded-2xl border border-nature-DEFAULT/10">
                          <p className="text-[10px] font-black text-nature-dark uppercase tracking-[0.15em] mb-1">{t('recommendedTreatment')}</p>
                          <p className="text-xs text-nature-dark leading-relaxed">{selectedDisease.treatment}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// ==========================================
// FILE: components/KnowledgeHub/WeatherAdvisory.jsx
// ==========================================
const WeatherAdvisory = () => {
  const alerts = [
    {
      id: 1,
      type: 'Warning',
      icon: <CloudRain className="text-blue-500" />,
      title: 'Rain Expected',
      desc: 'Significant rainfall expected in the next 24 hours. Avoid spraying liquid fertilizers or pesticides today to prevent runoff.',
      bg: 'bg-blue-50 border-blue-100',
      accent: 'text-blue-800'
    },
    {
      id: 2,
      type: 'Alert',
      icon: <Thermometer className="text-red-500" />,
      title: 'High Humidity',
      desc: 'Conditions are favorable for fungal infections. Monitor your potato and tomato crops closely for signs of late blight.',
      bg: 'bg-red-50 border-red-100',
      accent: 'text-red-800'
    },
    {
      id: 3,
      type: 'Good Time',
      icon: <ShieldCheck className="text-green-500" />,
      title: 'Clear Weather',
      desc: 'Ideal conditions for harvesting and soil tilling. Wind speeds are low, making it a good time for maintenance.',
      bg: 'bg-green-50 border-green-100',
      accent: 'text-green-800'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alerts.map((alert) => (
          <div key={alert.id} className={`${alert.bg} p-6 rounded-3xl border-2 transition-all hover:shadow-lg`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                {alert.icon}
              </div>
              <span className={`text-xs font-black uppercase tracking-widest ${alert.accent}`}>{alert.type}</span>
            </div>
            <h3 className={`text-lg font-bold mb-2 ${alert.accent}`}>{alert.title}</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{alert.desc}</p>
          </div>
        ))}
      </div>

      {/* Live Contextual Alert */}
      <div className="bg-nature-light rounded-3xl p-8 border border-nature-DEFAULT/10 flex flex-col md:flex-row items-center gap-8">
        <div className="shrink-0 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner">
          <Wind size={48} className="text-nature-DEFAULT" />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-nature-dark mb-2">Smart AI Recommendation</h3>
          <p className="text-nature-dark text-sm leading-relaxed max-w-2xl">
            Based on current wind speeds and soil moisture in your region, we recommend postponing any light dusting of seeds.
            However, this is an excellent window for deep-root irrigation to prepare for the upcoming dry spell.
          </p>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// FILE: components/KnowledgeHub/SeasonalCropGuide.jsx
// ==========================================
const SeasonalCropGuide = () => {
  const seasons = [
    {
      name: 'Summer (Kharif)',
      period: 'June - Oct',
      icon: <Sun className="text-orange-500" />,
      bg: 'from-orange-50 to-white',
      crops: [
        { name: 'Rice', soil: 'Clayey/Loamy', water: 'High', duration: '120-150 Days' },
        { name: 'Maize', soil: 'Alluvial', water: 'Medium', duration: '90-110 Days' },
        { name: 'Cotton', soil: 'Black Soil', water: 'Moderate', duration: '160-180 Days' }
      ]
    },
    {
      name: 'Winter (Rabi)',
      period: 'Nov - April',
      icon: <Snowflake className="text-blue-500" />,
      bg: 'from-blue-50 to-white',
      crops: [
        { name: 'Wheat', soil: 'Loamy', water: 'Moderate', duration: '120-140 Days' },
        { name: 'Mustard', soil: 'Sandy Loam', water: 'Low', duration: '110-130 Days' },
        { name: 'Chickpea', soil: 'Well-drained', water: 'Low', duration: '90-120 Days' }
      ]
    },
    {
      name: 'Zaid (Spring)',
      period: 'March - June',
      icon: <CloudRain className="text-green-500" />,
      bg: 'from-green-50 to-white',
      crops: [
        { name: 'Watermelon', soil: 'Sandy', water: 'Moderate', duration: '80-100 Days' },
        { name: 'Cucumber', soil: 'Organic Rich', water: 'High', duration: '60-70 Days' },
        { name: 'Moong Dal', soil: 'Loamy', water: 'Low', duration: '60-75 Days' }
      ]
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      <div className="grid grid-cols-1 gap-12">
        {seasons.map((season, idx) => (
          <div key={idx} className={`rounded-[48px] p-8 bg-gradient-to-b ${season.bg} border border-white/20 shadow-xl overflow-hidden relative group`}>
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-150 transition-transform duration-1000">
              {React.cloneElement(season.icon, { size: 120 })}
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 bg-white rounded-[24px] flex items-center justify-center shadow-lg">
                  {React.cloneElement(season.icon, { size: 28 })}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-nature-dark">{season.name}</h3>
                  <p className="text-sm font-bold text-nature-dark/40 flex items-center gap-1.5 mt-1">
                    <Calendar size={14} /> {season.period}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {season.crops.map((crop, cIdx) => (
                  <div key={cIdx} className="bg-white/70 backdrop-blur-sm p-6 rounded-[32px] border border-white shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-5">
                      <h4 className="text-lg font-black text-nature-dark">
                        {crop.name}
                      </h4>
                      <span className="text-[10px] font-black bg-nature-DEFAULT text-white px-3 py-1 rounded-full uppercase tracking-widest">
                        Primary Crop
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center text-center gap-1">
                        <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
                          <Droplets size={16} />
                        </div>
                        <p className="text-[9px] font-black text-nature-dark/40 uppercase tracking-widest">Water</p>
                        <p className="text-xs font-black text-nature-dark">{crop.water}</p>
                      </div>
                      <div className="flex flex-col items-center text-center gap-1">
                        <div className="w-8 h-8 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center">
                          <Clock size={16} />
                        </div>
                        <p className="text-[9px] font-black text-nature-dark/40 uppercase tracking-widest">Growth</p>
                        <p className="text-xs font-black text-nature-dark">{crop.duration.split(' ')[0]}D</p>
                      </div>
                      <div className="flex flex-col items-center text-center gap-1">
                        <div className="w-8 h-8 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center">
                          <Sun size={16} />
                        </div>
                        <p className="text-[9px] font-black text-nature-dark/40 uppercase tracking-widest">Soil</p>
                        <p className="text-xs font-black text-nature-dark truncate w-full" title={crop.soil}>{crop.soil}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// ==========================================
// FILE: components/KnowledgeHub/PestIdentification.jsx
// ==========================================
const PestIdentification = () => {
  const pests = [
    {
      id: 1,
      name: "Desert Locust",
      scientific: "Schistocerca gregaria",
      image: "/pest_locust.png",
      damage: "Large swarms can strip an entire field of crops in hours. High risk during monsoon.",
      prevention: "Monitoring swarms, using bio-pesticides (Metarhizium), and community alerts."
    },
    {
      id: 2,
      name: "Aphids",
      scientific: "Aphidoidea",
      image: "/pest_aphid.png",
      damage: "Sucks sap from stems and leaves, causing curling and spreading viral diseases.",
      prevention: "Encourage natural predators like ladybugs, use neem oil sprays, or yellow sticky traps."
    },
    {
      id: 3,
      name: "Fall Armyworm",
      scientific: "Spodoptera frugiperda",
      image: "/pest_armyworm.png",
      damage: "Chews leaves, stems, and reproductive parts of various crops, especially maize.",
      prevention: "Early detection, pheromone traps, and application of Bacillius thuringiensis (Bt)."
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-8 p-4">
      {pests.map((pest) => (
        <div key={pest.id} className="group h-[400px] [perspective:1000px]">
          <div className="relative h-full w-full rounded-3xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-xl">
            {/* Front Side */}
            <div className="absolute inset-0 h-full w-full rounded-3xl [backface-visibility:hidden] overflow-hidden">
              <img src={pest.image} alt={pest.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-nature-accent text-xs font-black uppercase tracking-widest">{pest.scientific}</span>
                <h3 className="text-white text-2xl font-black mt-1">{pest.name}</h3>
                <div className="flex items-center gap-2 mt-4 text-white/60 text-xs">
                  <Info size={14} /> <span>Hover to see identification details</span>
                </div>
              </div>
            </div>

            {/* Back Side */}
            <div className="absolute inset-0 h-full w-full rounded-3xl bg-nature-DEFAULT [backface-visibility:hidden] [transform:rotateY(180deg)] p-8 flex flex-col text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bug size={24} />
                </div>
                <h3 className="text-xl font-bold">{pest.name}</h3>
              </div>

              <div className="space-y-6 flex-1 overflow-y-auto">
                <div>
                  <h4 className="text-nature-accent text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-1">
                    <ShieldAlert size={12} /> Damage Type
                  </h4>
                  <p className="text-sm leading-relaxed text-white">{pest.damage}</p>
                </div>

                <div>
                  <h4 className="text-nature-accent text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-1">
                    <Target size={12} /> Control Method
                  </h4>
                  <p className="text-sm leading-relaxed text-white">{pest.prevention}</p>
                </div>
              </div>

              <button className="mt-auto w-full py-3 bg-white text-nature-DEFAULT rounded-xl font-bold text-sm hover:bg-nature-accent hover:text-white transition-all active:scale-95">
                Full Identification Guide
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


// ==========================================
// FILE: components/KnowledgeHub/SoilHealthGuide.jsx
// ==========================================
const SoilHealthGuide = () => {
  const soilTypes = [
    { name: 'Alluvial', characteristics: 'Rich in potash, very fertile', suitability: 'Rice, Wheat, Sugarcane' },
    { name: 'Black', characteristics: 'Clayey texture, retains moisture', suitability: 'Cotton, Soybeans' },
    { name: 'Red', characteristics: 'Porous and friable structure', suitability: 'Millets, Pulses, Tobacco' }
  ];

  return (
    <div className="space-y-12 p-4">
      {/* Soil Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {soilTypes.map((type, idx) => (
          <div key={idx} className="bg-white/40 backdrop-blur-md p-6 rounded-[32px] border border-white/20 shadow-xl hover:-translate-y-2 transition-all duration-500">
            <div className="w-12 h-12 bg-nature-DEFAULT text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <FlaskConical size={24} />
            </div>
            <h3 className="text-xl font-black text-nature-dark mb-2">{type.name} Soil</h3>
            <p className="text-sm text-nature-dark/70 mb-4">{type.characteristics}</p>
            <div className="pt-4 border-t border-nature-DEFAULT/10">
              <p className="text-[10px] font-bold text-nature-DEFAULT uppercase tracking-widest">Best For</p>
              <p className="text-sm font-semibold text-nature-dark">{type.suitability}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Nutrient Dashboard */}
      <div className="bg-nature-dark rounded-[48px] p-8 md:p-12 text-white overflow-hidden relative">
        <img src="/soil_infographic.png" className="absolute top-0 right-0 w-80 h-full object-contain opacity-20 -rotate-12 translate-x-16" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-nature-accent/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-nature-accent font-black uppercase tracking-[0.2em] text-xs">Soil Analysis</span>
            <h2 className="text-4xl font-black mt-4 mb-6 leading-tight">Mastering Your <br /> Soil Nutrients (NPK)</h2>
            <p className="text-white leading-relaxed mb-8 max-w-md text-sm md:text-base">
              The Nitrogen (N), Phosphorus (P), and Potassium (K) ratio is critical for crop health.
              Monitor these levels regularly to ensure optimal growth and prevent deficiencies.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                <AlertCircle size={16} className="text-nature-accent" />
                <span className="text-xs font-bold">Monitor pH Levels (6.0 - 7.5)</span>
              </div>
            </div>
          </div>

          <div className="space-y-8 bg-white/5 backdrop-blur-sm p-8 rounded-[40px] border border-white/10">
            {/* Nitrogen */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="font-bold tracking-widest text-xs opacity-60">NITROGEN (N)</span>
                <span className="text-nature-accent font-black">75%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                <div className="h-full bg-gradient-to-r from-blue-400 to-nature-accent rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-[10px] text-white italic">Essential for leaf growth and lush green color.</p>
            </div>

            {/* Phosphorus */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="font-bold tracking-widest text-xs opacity-60">PHOSPHORUS (P)</span>
                <span className="text-nature-accent font-black">45%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                <div className="h-full bg-gradient-to-r from-orange-400 to-nature-accent rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-[10px] text-white italic">Critical for root development and flower/fruit production.</p>
            </div>

            {/* Potassium */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="font-bold tracking-widest text-xs opacity-60">POTASSIUM (K)</span>
                <span className="text-nature-accent font-black">90%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                <div className="h-full bg-gradient-to-r from-purple-400 to-nature-accent rounded-full" style={{ width: '90%' }}></div>
              </div>
              <p className="text-[10px] text-white italic">Boosts disease resistance and overall plant vigor.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// FILE: components/KnowledgeHub/GovtSchemes.jsx
// ==========================================
const GovtSchemes = () => {
  const schemes = [
    {
      name: 'PM-KISAN',
      desc: 'Income support of ₹6,000 per year to all landholding farmer families in three equal installments.',
      benefits: ['Direct Bank Transfer', 'Zero Interest', 'National Reach'],
      color: 'bg-orange-50 border-orange-200',
      image: '/govt_kisan.png'
    },
    {
      name: 'Fasal Bima Yojana',
      desc: 'Crop insurance scheme for farmers for their yields to protect them from natural calamities.',
      benefits: ['Low Premium', 'Quick Claims', 'All-Crop Coverage'],
      color: 'bg-green-50 border-green-200',
      image: '/govt_insurance.png'
    },
    {
      name: 'Agri Infrastructure Fund',
      desc: 'Financing facility for investment in viable projects for post-harvest management infrastructure.',
      benefits: ['Credit Guarantee', 'Interest Subvention', '10 Year Tenure'],
      color: 'bg-blue-50 border-blue-200',
      image: '/govt_agri_fund.png'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {schemes.map((scheme, idx) => (
        <div key={idx} className={`${scheme.color} border-2 rounded-[40px] hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col`}>
          <div className="h-40 overflow-hidden relative">
            <img src={scheme.image} alt={scheme.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-xl opacity-80">
              <Landmark size={20} className="text-nature-DEFAULT" />
            </div>
          </div>

          <div className="relative z-10 p-8 pt-6">
            <h3 className="text-2xl font-black text-nature-dark mb-4">{scheme.name}</h3>
            <p className="text-sm text-nature-dark/70 leading-relaxed mb-6">{scheme.desc}</p>

            <ul className="space-y-3 mb-8">
              {scheme.benefits.map((benefit, bIdx) => (
                <li key={bIdx} className="flex items-center gap-2 text-xs font-bold text-nature-dark/80">
                  <CheckCircle2 size={14} className="text-nature-DEFAULT" /> {benefit}
                </li>
              ))}
            </ul>

            <button className="flex items-center gap-2 text-sm font-black text-nature-DEFAULT group-hover:gap-4 transition-all">
              Apply Now <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};


// ==========================================
// FILE: components/KnowledgeHub/AIChatbot.jsx
// ==========================================
const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello! I am your CropCare AI Assistant. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const { t, language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        'en': "Based on your description, it might be a nutrient deficiency. Have you checked the soil pH recently?",
        'hi': "आपके विवरण के आधार पर, यह पोषक तत्वों की कमी हो सकती है। क्या आपने हाल ही में मिट्टी के पीएच की जाँच की है?",
        'bn': "আপনার বর্ণনা অনুযায়ী, এটি পুষ্টির অভাব হতে পারে। আপনি কি সম্প্রতি মাটির pH পরীক্ষা করেছেন?",
        'mr': "तुमच्या वर्णनानुसार, हे पोषक तत्वांची कमतरता असू शकते. तुम्ही अलीकडे मातीचा pH तपासला आहे का?",
        'ta': "உங்கள் விளக்கத்தின் அடிப்படையில், இது ஊட்டச்சத்து குறைபாடாக இருக்கலாம். சமீபத்தில் மண்ணின் pH ஐ பரிசோதித்தீர்களா?",
        'te': "మీ వివరణ ఆధారంగా, ఇది పోషక లోపం కావచ్చు. మీరు ఇటీవల నేల pHని తనిఖీ చేశారా?"
      };

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: responses[language] || responses['en']
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Auto-speak if it's a short response
      // speakText(botMessage.text);
    }, 1500);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('speechRecognition' in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'en' ? 'en-US' : language;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      handleSend(transcript);
    };

    recognition.start();
  };

  const speakText = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = { hi: 'hi-IN', bn: 'bn-IN', mr: 'mr-IN', ta: 'ta-IN', te: 'te-IN', en: 'en-US' };
    utterance.lang = langMap[language] || 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-nature-DEFAULT text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 z-50 group"
      >
        <Sparkles className="absolute -top-2 -left-2 text-yellow-400 group-hover:animate-bounce" size={24} />
        <MessageSquare size={32} />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-80 md:w-96 bg-white/90 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 z-50 flex flex-col ${isMinimized ? 'h-16' : 'h-[500px]'}`}>
      {/* Header */}
      <div className="bg-nature-DEFAULT p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm leading-tight">CropCare AI</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-[10px] opacity-80">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/10 rounded">
            <Minimize2 size={18} />
          </button>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded">
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'user'
                    ? 'bg-nature-DEFAULT text-white rounded-tr-none'
                    : 'bg-nature-light text-nature-dark rounded-tl-none border border-nature-DEFAULT/10'
                  }`}>
                  {msg.text}
                  {msg.type === 'bot' && (
                    <button onClick={() => speakText(msg.text)} className="block mt-2 opacity-60 hover:opacity-100">
                      <Volume2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-nature-light p-3 rounded-2xl rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-nature-DEFAULT/40 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-nature-DEFAULT/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-nature-DEFAULT/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-nature-light bg-white/50">
            <div className="flex items-center gap-2 bg-nature-light rounded-2xl p-2 px-4 focus-within:ring-2 ring-nature-DEFAULT/20 transition-all">
              <input
                type="text"
                placeholder="Ask something..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-nature-dark"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
              />
              <button
                onClick={startListening}
                className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'text-nature-DEFAULT hover:bg-nature-DEFAULT/10'}`}
              >
                <Mic size={18} />
              </button>
              <button
                onClick={() => handleSend(inputValue)}
                className="bg-nature-DEFAULT text-white p-2 rounded-xl hover:shadow-lg active:scale-95 transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};


// ==========================================
// FILE: pages/KnowledgeHub.jsx
// ==========================================
function KnowledgeHub() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('encyclopedia');
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    { text: "Neem oil is a natural pesticide for most leaf-eating bugs.", icon: <Bug size={20} /> },
    { text: "Drip irrigation can save up to 50% water in dry seasons.", icon: <Droplets size={20} /> },
    { text: "Rotating legumes with cereals improves soil nitrogen naturally.", icon: <Leaf size={20} /> },
    { text: "Test your soil pH every 2 years for optimal nutrient uptake.", icon: <FlaskConical size={20} /> }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'encyclopedia', label: t('encyclopedia'), icon: <BookOpen size={18} /> },
    { id: 'weather', label: t('weatherAdvisory'), icon: <CloudSun size={18} /> },
    { id: 'seasonal', label: t('seasonalGuide'), icon: <Calendar size={18} /> },
    { id: 'pests', label: t('pestId'), icon: <Bug size={18} /> },
    { id: 'soil', label: t('soilHealth'), icon: <FlaskConical size={18} /> },
  ];

  const handleOrganicClick = (topic) => {
    const query = encodeURIComponent(topic + ' organic farming method');
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-nature-light/30 -mt-8 -mx-4 px-4 pt-8 pb-24 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative rounded-[48px] text-white p-8 md:p-16 mb-12 overflow-hidden shadow-2xl group">
        <img
          src="/knowledge_hero.png"
          alt="Knowledge Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-80 scale-110 group-hover:scale-100 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-8 animate-fade-in">
            <Sparkles className="text-nature-accent" size={20} />
            <span className="text-xs font-bold tracking-widest uppercase">AI-Powered Learning</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
            CropCare <br /> <span className="text-nature-accent">Knowledge Hub</span>
          </h1>
          <p className="text-lg md:text-xl text-white mb-10 leading-relaxed font-light">
            Learn smarter farming practices with AI-powered guidance.
            Empowering farmers with data, science, and community.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 bg-nature-accent text-nature-dark rounded-xl flex items-center justify-center">
                <Users size={20} />
              </div>
              <div>
                <p className="text-xs opacity-60 font-bold uppercase tracking-wider">Community</p>
                <p className="text-sm font-black">12.4k Farmers</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-400 text-white rounded-xl flex items-center justify-center">
                <Star size={20} />
              </div>
              <div>
                <p className="text-xs opacity-60 font-bold uppercase tracking-wider">Success Rate</p>
                <p className="text-sm font-black">94% Accuracy</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute bottom-0 right-0 p-12">
          <BookOpen size={300} className="text-white opacity-5 rotate-12 translate-y-24" />
        </div>
      </section>

      {/* Tip of the Day Widget */}
      <section className="max-w-4xl mx-auto mb-16 relative">
        <div className="bg-white rounded-[32px] p-6 shadow-xl border border-nature-DEFAULT/5 flex items-center gap-6 group overflow-hidden">
          <div className="shrink-0 w-12 h-12 bg-nature-DEFAULT text-white rounded-2xl flex items-center justify-center shadow-lg animate-bounce [animation-duration:3s]">
            {tips[currentTip].icon}
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black text-nature-DEFAULT uppercase tracking-[0.2em] mb-1">Farmer Tip of the Day</p>
            <p className="text-sm md:text-base font-bold text-nature-dark animate-fade-in" key={currentTip}>
              "{tips[currentTip].text}"
            </p>
          </div>
          <button className="p-2 text-nature-dark/20 hover:text-nature-DEFAULT transition-all">
            <ChevronRight size={24} />
          </button>
          <div className="absolute top-0 right-0 w-32 h-full bg-nature-DEFAULT/5 skew-x-12 translate-x-16 group-hover:translate-x-8 transition-transform"></div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="mb-12 sticky top-4 z-40">
        <div className="bg-white/80 backdrop-blur-xl p-2 rounded-[32px] shadow-xl border border-white/40 flex items-center gap-2 overflow-x-auto no-scrollbar max-w-fit mx-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${activeTab === tab.id
                  ? 'bg-nature-DEFAULT text-white shadow-lg scale-105'
                  : 'text-nature-dark/60 hover:bg-nature-light hover:text-nature-DEFAULT'
                }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto space-y-24 px-2">
        <div className="animate-fade-in min-h-[400px]">
          {activeTab === 'encyclopedia' && <DiseaseEncyclopedia />}
          {activeTab === 'weather' && <WeatherAdvisory />}
          {activeTab === 'seasonal' && <SeasonalCropGuide />}
          {activeTab === 'pests' && <PestIdentification />}
          {activeTab === 'soil' && <SoilHealthGuide />}
        </div>

        <hr className="border-nature-DEFAULT/10" />

        {/* Organic Farming Corner */}
        <section>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div>
              <h2 className="text-4xl font-black text-nature-dark flex items-center gap-3">
                <Leaf className="text-nature-DEFAULT" size={32} /> {t('organicCorner')}
              </h2>
              <p className="text-nature-dark mt-2 font-medium">{t('organicDesc')}</p>
            </div>
            <button
              onClick={() => navigate('/organic-methods')}
              className="bg-nature-DEFAULT text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-nature-dark transition-all active:scale-95"
            >
              {t('exploreOrganic')}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: t('composting'),
                key: 'Composting',
                icon: <Sprout size={24} />,
                desc: t('compostingDesc'),
                img: '/organic_compost.png'
              },
              {
                title: t('bioPesticides'),
                key: 'Bio-Pesticides',
                icon: <Bug size={24} />,
                desc: t('bioPesticidesDesc'),
                img: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=400'
              },
              {
                title: t('cropRotation'),
                key: 'Crop Rotation',
                icon: <LayoutGrid size={24} />,
                desc: t('cropRotationDesc'),
                img: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400'
              },
              {
                title: t('ecoFertilizers'),
                key: 'Eco-Fertilizers',
                icon: <Droplets size={24} />,
                desc: t('ecoFertilizersDesc'),
                img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=400'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleOrganicClick(item.key)}
                className="bg-white rounded-[32px] border border-nature-DEFAULT/5 shadow-lg hover:shadow-2xl transition-all group overflow-hidden cursor-pointer flex flex-col min-h-[220px]"
              >
                <div className="relative h-24 bg-nature-light/50 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-5 flex-1 flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-nature-light text-nature-DEFAULT rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-all shadow-inner shrink-0">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-sm text-nature-dark mb-1 leading-tight">{item.title}</h4>
                  <p className="text-[10px] text-nature-dark/70 leading-snug font-medium line-clamp-3">{item.desc}</p>

                  <div className="mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] font-black text-nature-DEFAULT uppercase tracking-widest">
                    {t('watchVideo')} <ChevronRight size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer Decoration */}
      <div className="mt-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-nature-DEFAULT/5 rounded-full mb-4">
          <Sparkles className="text-nature-accent" size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest text-nature-dark">Driven by Innovation</span>
        </div>
        <p className="text-nature-dark/30 text-[10px] font-bold uppercase tracking-widest">&copy; 2026 CropCare AI Knowledge Network</p>
      </div>
    </div>
  );
}


// ==========================================
// FILE: pages/RatingPage.jsx
// ==========================================
const RatingPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in" style={{ textAlign: 'center' }}>
      <div style={{ padding: '40px 20px 20px' }}>
        <div className="auth-icon-box" style={{ background: 'var(--bg-color)', color: 'var(--primary-color)' }}>
          <Heart size={40} fill="var(--primary-color)" />
        </div>
        <h1 style={{ marginBottom: '8px' }}>We Value Your Feedback</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Help us make CropCare better for every farmer.</p>
      </div>

      <ReviewSection />

      <div style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
        <button
          className="btn-outline"
          onClick={() => navigate('/')}
          style={{ flex: 1 }}
        >
          <Home size={20} /> Back to Home
        </button>
      </div>
    </div>
  );
};


// ==========================================
// FILE: pages/WelcomePage.jsx
// ==========================================
const WelcomePage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <BackgroundParticles />
      <div className="welcome-container" style={{ zIndex: 1 }}>
        <div className="welcome-logo-container">
          <div className="welcome-logo-icon">
            <Leaf size={60} fill="white" />
          </div>
          <div className="nature-accent" style={{ top: '-20px', right: '-40px', opacity: 0.2 }}>
            <Sparkles size={40} color="var(--accent-color)" />
          </div>
        </div>

        <h1 className="welcome-title">{t('welcomeTitle')}</h1>
        <h2 className="welcome-subtitle stagger-1">{t('welcomeSubtitle')}</h2>
        <p className="welcome-text stagger-2">{t('welcomeMessage')}</p>

        <div className="welcome-actions animate-slide-up">
          <button
            className="btn-primary pulse-soft stagger-3"
            onClick={() => navigate('/login')}
          >
            {t('getStarted')}
            <ArrowRight size={20} />
          </button>

          <button
            className="btn-outline stagger-4"
            onClick={() => navigate('/signup')}
          >
            {t('joinCommunity')}
          </button>
        </div>

        <div className="auth-footer" style={{ marginTop: '40px', opacity: 0.6 }}>
          <p>© 2026 {t('appName')}</p>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// FILE: pages/OrganicMethodsPage.jsx
// ==========================================
const OrganicMethodsPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const methods = [
    {
      title: t('composting'),
      icon: <Sprout size={32} />,
      desc: t('compostingDesc'),
      details: "Organic matter decomposition that enriches soil with nutrients and beneficial microbes.",
      benefit: "Reduces waste & improves soil structure.",
      color: "#2E7D32",
      img: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: t('bioPesticides'),
      icon: <Bug size={32} />,
      desc: t('bioPesticidesDesc'),
      details: "Using natural predators or plant extracts like Neem and Garlic to control pests without toxins.",
      benefit: "Non-toxic & preserves ecosystem balance.",
      color: "#D32F2F",
      img: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: t('cropRotation'),
      icon: <LayoutGrid size={32} />,
      desc: t('cropRotationDesc'),
      details: "Alternating different crops in the same area to maintain soil health and break pest cycles.",
      benefit: "Natural fertility & pest suppression.",
      color: "#F57C00",
      img: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: t('ecoFertilizers'),
      icon: <Droplets size={32} />,
      desc: t('ecoFertilizersDesc'),
      details: "Using liquid manures, seaweed extracts, and green manure to feed the soil and plants.",
      benefit: "Fast absorption & zero chemical residue.",
      color: "#0288D1",
      img: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const handleMethodClick = (topic) => {
    const query = encodeURIComponent(topic + ' organic farming tutorial');
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  return (
    <div className="app-container bg-farmers" style={{ minHeight: '100vh' }}>
      <BackgroundParticles />
      <Header />

      <div className="content-wrapper" style={{ padding: '20px', zIndex: 1, position: 'relative' }}>
        <button
          className="theme-toggle"
          onClick={() => navigate(-1)}
          style={{ width: 'auto', padding: '0 12px', borderRadius: '12px', marginBottom: '20px' }}
        >
          <ArrowLeft size={18} />
          <span style={{ marginLeft: '6px', fontSize: '14px', fontWeight: '600' }}>Back</span>
        </button>

        <div className="organic-hero glass-panel animate-fade-in" style={{
          background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '32px',
          padding: '40px 24px',
          textAlign: 'center',
          color: 'white',
          marginBottom: '30px'
        }}>
          <div className="flex justify-center mb-4">
            <div className="bg-nature-accent p-3 rounded-2xl animate-bounce">
              <Leaf size={40} color="var(--nature-dark)" fill="var(--nature-dark)" />
            </div>
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '12px' }}>{t('organicCorner')}</h1>
          <p style={{ fontSize: '16px', opacity: 0.9, maxWidth: '500px', margin: '0 auto' }}>
            {t('organicDesc')}
          </p>
        </div>

        <div className="methods-grid animate-slide-up" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
          {methods.map((method, idx) => (
            <div
              key={idx}
              className="method-card glass-panel cursor-pointer group"
              onClick={() => handleMethodClick(method.title)}
              style={{ padding: '0', overflow: 'hidden' }}
            >
              <div style={{ height: '160px', overflow: 'hidden' }}>
                <img src={method.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div style={{ padding: '24px' }}>
                <div className="flex items-center gap-4 mb-4">
                  <div style={{ color: method.color, padding: '12px', background: `${method.color}15`, borderRadius: '16px' }}>
                    {method.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--nature-dark)' }}>{method.title}</h3>
                    <p style={{ fontSize: '12px', fontWeight: '600', color: method.color, textTransform: 'uppercase', tracking: '1px' }}>{method.benefit}</p>
                  </div>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--nature-dark)', opacity: 0.8, lineHeight: '1.6', marginBottom: '16px' }}>
                  {method.details}
                </p>
                <div className="flex items-center gap-2 px-4 py-2 bg-nature-light/30 rounded-xl">
                  <ShieldCheck size={16} color="var(--nature-DEFAULT)" />
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--nature-dark)' }}>Certified Organic Technique</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="community-cta glass-panel animate-slide-up" style={{ marginTop: '40px', padding: '30px', textAlign: 'center', background: 'var(--gradient-green)', color: 'white' }}>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white/20 rounded-full">
              <Zap size={30} />
            </div>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '10px' }}>Join the Movement</h2>
          <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '20px' }}>Share your organic success stories with our global community of farmers.</p>
          <button className="btn-primary" style={{ background: 'white', color: 'var(--nature-DEFAULT)' }}>
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// FILE: components/BottomNav.jsx
// ==========================================
function BottomNav() {
  const { t } = useLanguage();

  return (
    <nav className="bottom-nav" style={{ padding: '8px 10px 24px' }}>
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', gap: '4px', flex: 1 }}>
        <Home size={22} />
        <span style={{ fontSize: '10px', fontWeight: '700' }}>{t('home')}</span>
      </NavLink>

      <NavLink to="/knowledge" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', gap: '4px', flex: 1 }}>
        <BookOpen size={22} />
        <span style={{ fontSize: '10px', fontWeight: '700' }}>{t('knowledgeHub')}</span>
      </NavLink>

      <NavLink to="/scan" style={{ textDecoration: 'none', position: 'relative', top: '-25px', zIndex: 10 }}>
        <div style={{
          background: 'var(--gradient-green)',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: '0 8px 25px rgba(46, 125, 50, 0.4)',
          border: '4px solid var(--surface-color)'
        }}>
          <ScanLine size={28} />
        </div>
      </NavLink>

      <NavLink to="/history" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', gap: '4px', flex: 1 }}>
        <History size={22} />
        <span style={{ fontSize: '10px', fontWeight: '700' }}>{t('history')}</span>
      </NavLink>

      <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', gap: '4px', flex: 1 }}>
        <User size={22} />
        <span style={{ fontSize: '10px', fontWeight: '700' }}>{t('profile')}</span>
      </NavLink>
    </nav>
  );
}


// ==========================================
// FILE: components/SideNav.jsx
// ==========================================
function SideNav() {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  return (
    <nav className="desktop-only" style={{
      width: '280px',
      height: '100vh',
      background: 'var(--surface-color)',
      borderRight: '1px solid var(--glass-border)',
      padding: '40px 20px',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="logo" style={{ marginBottom: '40px', padding: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Leaf size={32} fill="var(--primary-color)" />
          <span style={{ fontSize: '24px', fontWeight: '800' }}>{t('appName')}</span>
        </div>
      </div>

      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          style={{ flex: 1, height: '45px' }}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <select
          className="lang-selector"
          value={language}
          onChange={(e) => toggleLanguage(e.target.value)}
          style={{ flex: 2, height: '45px', border: '1px solid var(--glass-border)' }}
        >
          <option value="en">English</option>
          <option value="bn">বাংলা</option>
          <option value="hi">हिंदी</option>
          <option value="mr">मराठी</option>
          <option value="ta">தமிழ்</option>
          <option value="te">తెలుగు</option>
          <option value="kn">ಕನ್ನಡ</option>
          <option value="ml">മലയാളം</option>
          <option value="gu">ગુજરાતી</option>
          <option value="pa">ਪੰਜਾਬੀ</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Home size={20} />
          <span>{t('home')}</span>
        </NavLink>

        <NavLink to="/knowledge" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <BookOpen size={20} />
          <span>{t('knowledgeHub')}</span>
        </NavLink>

        <NavLink to="/scan" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <ScanLine size={20} />
          <span>{t('scan')}</span>
        </NavLink>

        <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <History size={20} />
          <span>{t('history')}</span>
        </NavLink>

        <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <User size={20} />
          <span>{t('profile')}</span>
        </NavLink>
      </div>

      <button
        onClick={logout}
        style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px',
          border: 'none',
          background: 'transparent',
          color: 'var(--danger-color)',
          fontWeight: '600',
          cursor: 'pointer',
          borderRadius: '12px',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
      >
        <LogOut size={20} />
        <span>{t('logout') || 'Logout'}</span>
      </button>

      <style dangerouslySetInnerHTML={{
        __html: `
        .nav-link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          text-decoration: none;
          color: var(--text-secondary);
          border-radius: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .nav-link:hover {
          background: var(--bg-color);
          color: var(--primary-color);
        }
        .nav-link.active {
          background: var(--gradient-green);
          color: white;
          box-shadow: 0 8px 16px rgba(46, 125, 50, 0.2);
        }
      `}} />
    </nav>
  );
}


// ==========================================
// FILE: App.jsx
// ==========================================
const OfflineSyncManager = () => {
  const { token } = useAuth();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showStatusBanner, setShowStatusBanner] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowStatusBanner(true);
      setTimeout(() => setShowStatusBanner(false), 4000);
      triggerSync();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowStatusBanner(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check on mount
    if (navigator.onLine) {
      triggerSync();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [token]);

  const triggerSync = async () => {
    if (!token || !navigator.onLine) return;
    const queued = localStorage.getItem('offline_scans');
    if (!queued) return;

    let scans = [];
    try {
      scans = JSON.parse(queued);
    } catch (e) {
      console.error(e);
      return;
    }

    if (scans.length === 0) return;

    setSyncing(true);
    setSyncMessage(`Syncing ${scans.length} offline scan(s)...`);

    const remainingScans = [...scans];
    const base64ToFile = (dataurl, filename) => {
      let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    };

    for (const scan of scans) {
      try {
        const file = base64ToFile(scan.imageBase64, `offline_scan_${scan.id}.png`);
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(`${API_BASE_URL}/api/analyze`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData,
        });

        if (response.ok) {
          const index = remainingScans.findIndex(s => s.id === scan.id);
          if (index !== -1) {
            remainingScans.splice(index, 1);
          }
          localStorage.setItem('offline_scans', JSON.stringify(remainingScans));
        }
      } catch (err) {
        console.error('Failed to sync scan', scan.id, err);
      }
    }

    setSyncing(false);
    if (remainingScans.length === 0) {
      setSyncMessage('All offline scans synchronized!');
      setTimeout(() => setSyncMessage(''), 4000);
      window.dispatchEvent(new Event('scans_synced'));
    } else {
      setSyncMessage(`Failed to sync ${remainingScans.length} scans. Will retry later.`);
      setTimeout(() => setSyncMessage(''), 4000);
    }
  };

  return (
    <>
      {showStatusBanner && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          background: isOnline ? 'rgba(76, 175, 80, 0.95)' : 'rgba(244, 67, 54, 0.95)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '30px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: '600',
          fontSize: '14px',
          transition: 'all 0.3s ease',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          {isOnline ? <Wifi size={18} /> : <WifiOff size={18} />}
          <span>{isOnline ? 'Back online! Syncing data...' : 'You are currently offline. Using cached data.'}</span>
          {!isOnline && (
            <button
              onClick={() => setShowStatusBanner(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                marginLeft: '10px',
                fontSize: '12px',
                opacity: 0.8
              }}
            >
              ✕
            </button>
          )}
        </div>
      )}

      {syncMessage && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          zIndex: 9999,
          background: 'rgba(33, 150, 243, 0.95)',
          color: 'white',
          padding: '14px 24px',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontWeight: '600',
          fontSize: '14px',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          {syncing ? <RefreshCw size={16} className="spinner" /> : <CheckCircle size={16} />}
          <span>{syncMessage}</span>
        </div>
      )}
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div>
  );
  if (!user) return <Navigate to="/welcome" />;

  return (
    <div className="app-container">
      <OfflineSyncManager />
      <SideNav />
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="mobile-only">
          <Header />
        </div>
        <div className="content-area">
          {children}
        </div>
        <div className="mobile-only w-full">
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/organic-methods" element={<OrganicMethodsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/crop-details"
                element={
                  <ProtectedRoute>
                    <CropDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/scan"
                element={
                  <ProtectedRoute>
                    <ScanPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/results"
                element={
                  <ProtectedRoute>
                    <ResultsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <HistoryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/knowledge"
                element={
                  <ProtectedRoute>
                    <KnowledgeHub />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rating"
                element={
                  <ProtectedRoute>
                    <RatingPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}


// ==========================================
// FILE: components/KnowledgeHub/MediaSections.jsx
// ==========================================
export const VideoLearningCenter = ({ searchQuery = 'Organic Farming' }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/youtube/search?query=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) throw new Error('Failed to fetch videos');
        const data = await response.json();
        setVideos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [searchQuery]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 bg-white/20 rounded-[40px] border border-white/20">
      <Loader2 className="animate-spin text-nature-DEFAULT mb-4" size={48} />
      <p className="font-bold text-nature-dark/60 uppercase tracking-widest text-xs">Fetching Tutorials...</p>
    </div>
  );

  if (error) return (
    <div className="p-8 bg-red-50 rounded-[40px] border border-red-100 text-center">
      <p className="text-red-500 font-bold">Failed to load videos. Please try again later.</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video, idx) => (
        <a
          key={video.id}
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/60 rounded-[32px] overflow-hidden border border-white/40 group hover:shadow-xl transition-all cursor-pointer flex flex-col"
        >
          <div className="relative h-40 overflow-hidden shrink-0">
            <img src={video.thumb} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-nature-DEFAULT shadow-lg scale-90 group-hover:scale-100 transition-all">
                <Play size={24} fill="currentColor" />
              </div>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between">
            <h4 className="font-bold text-sm text-nature-dark line-clamp-2 leading-snug">{video.title}</h4>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-[10px] text-nature-DEFAULT font-black uppercase tracking-wider">{video.channel}</p>
              <div className="bg-nature-light/50 px-2 py-1 rounded-md">
                <p className="text-[9px] font-bold text-nature-dark/60 uppercase">Tutorial</p>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export const SuccessStories = () => {
  const stories = [
    { name: 'Rajesh Kumar', crop: 'Rice', increase: '35%', image: '/farmer_success_story_1_1777741261551.png' },
    { name: 'Sunita Devi', crop: 'Tomato', increase: '50%', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {stories.map((story, idx) => (
        <div key={idx} className="bg-white/40 backdrop-blur-md rounded-[40px] p-8 border border-white/20 flex items-center gap-8 shadow-lg">
          <div className="w-24 h-24 rounded-[32px] overflow-hidden shrink-0 shadow-xl border-4 border-white">
            <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill="#ffc107" color="#ffc107" />)}
            </div>
            <h4 className="text-xl font-black text-nature-dark">{story.name}</h4>
            <p className="text-sm text-nature-dark/60 mb-4">{story.crop} Cultivator</p>
            <div className="flex items-center gap-2 text-nature-DEFAULT bg-nature-light w-fit px-3 py-1 rounded-full border border-nature-DEFAULT/10">
              <TrendingUp size={14} />
              <span className="text-xs font-bold">+{story.increase} Yield Growth</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


// ==========================================
// FILE: main.jsx
// ==========================================
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register Service Worker for offline PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('[PWA] Service Worker registered successfully:', reg.scope))
      .catch((err) => console.error('[PWA] Service Worker registration failed:', err));
  });
}