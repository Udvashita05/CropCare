import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Sprout, Droplets, Sun, Bug, Info, Sparkles, 
  Search, Filter, LayoutGrid, CloudSun, Calendar, FlaskConical, 
  Landmark, Star, Quote, ChevronRight, Leaf, Users
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import DiseaseEncyclopedia from '../components/KnowledgeHub/DiseaseEncyclopedia';
import WeatherAdvisory from '../components/KnowledgeHub/WeatherAdvisory';
import SeasonalCropGuide from '../components/KnowledgeHub/SeasonalCropGuide';
import PestIdentification from '../components/KnowledgeHub/PestIdentification';
import SoilHealthGuide from '../components/KnowledgeHub/SoilHealthGuide';
import GovtSchemes from '../components/KnowledgeHub/GovtSchemes';
import AIChatbot from '../components/KnowledgeHub/AIChatbot';

export default function KnowledgeHub() {
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
            CropCare <br/> <span className="text-nature-accent">Knowledge Hub</span>
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
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id 
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
                icon: <Sprout size={24}/>, 
                desc: t('compostingDesc'), 
                img: '/organic_compost.png' 
              },
              { 
                title: t('bioPesticides'), 
                key: 'Bio-Pesticides', 
                icon: <Bug size={24}/>, 
                desc: t('bioPesticidesDesc'),
                img: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=400'
              },
              { 
                title: t('cropRotation'), 
                key: 'Crop Rotation', 
                icon: <LayoutGrid size={24}/>, 
                desc: t('cropRotationDesc'),
                img: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400'
              },
              { 
                title: t('ecoFertilizers'), 
                key: 'Eco-Fertilizers', 
                icon: <Droplets size={24}/>, 
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
