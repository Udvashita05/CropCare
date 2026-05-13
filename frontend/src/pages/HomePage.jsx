import { ArrowRight, Leaf, ShieldAlert, CheckCircle2, User, MapPin, Sprout, LogOut, Sparkles, Bug, Bird } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import WeatherSection from '../components/WeatherSection';
import ReviewSection from '../components/ReviewSection';

export default function HomePage() {
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
          <h1 className="hidden md:block text-4xl mb-4">{t('welcomeBack') || 'Grow Smarter with AI'}</h1>
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
              <h4 style={{ margin: 0, color: '#b78b00', fontSize: '16px' }}>{t('liveMarketPrices')}</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>{t('wheat')}</p>
                  <p style={{ margin: 0, fontSize: '20px', color: 'var(--text-primary)', fontWeight: '800' }}>₹2,450</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>{t('rice')}</p>
                  <p style={{ margin: 0, fontSize: '20px', color: 'var(--text-primary)', fontWeight: '800' }}>₹3,800</p>
                </div>
                <div style={{ color: 'var(--success-color)', fontSize: '14px', fontWeight: 'bold' }}>
                  +2.4% ↑
                </div>
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
