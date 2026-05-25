import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Leaf, ArrowRight, Sparkles } from 'lucide-react';
import BackgroundParticles from '../components/BackgroundParticles';

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

export default WelcomePage;
