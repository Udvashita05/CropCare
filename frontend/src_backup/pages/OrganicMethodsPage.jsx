import React from 'react';
import { 
  Leaf, ArrowLeft, Sprout, Bug, LayoutGrid, Droplets, 
  Sparkles, ShieldCheck, Zap, HeartPulse 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import BackgroundParticles from '../components/BackgroundParticles';

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

export default OrganicMethodsPage;
