import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Sprout, Calendar, Droplets, ArrowRight, Leaf, MapPin } from 'lucide-react';
import Header from '../components/Header';

export default function CropDetailsPage() {
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
                onChange={(e) => setFormData({...formData, cropVariety: e.target.value})}
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
                onChange={(e) => setFormData({...formData, land_size: e.target.value})}
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
                onChange={(e) => setFormData({...formData, soilType: e.target.value})}
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
                onChange={(e) => setFormData({...formData, plantingDate: e.target.value})}
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
