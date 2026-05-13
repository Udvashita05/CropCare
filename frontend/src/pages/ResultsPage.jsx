import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { ShieldAlert, CheckCircle2, ChevronLeft, Droplets, Info, Volume2, Sparkles, ShoppingCart, Scale, ExternalLink, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function ResultsPage() {
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
          src={`http://127.0.0.1:5000${result.image_url}`} 
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
