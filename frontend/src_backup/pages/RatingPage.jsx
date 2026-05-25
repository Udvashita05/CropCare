import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ReviewSection from '../components/ReviewSection';

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

export default RatingPage;
