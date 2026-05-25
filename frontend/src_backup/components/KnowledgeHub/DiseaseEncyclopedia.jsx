import React, { useState } from 'react';
import { Search, Filter, Info, ShieldCheck, AlertTriangle, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import API_BASE_URL from '../../config';


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
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                filter === cat 
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

export default DiseaseEncyclopedia;
