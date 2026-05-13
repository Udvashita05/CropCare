import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, Thermometer, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WeatherSection() {
  const { t } = useLanguage();
  const [weather, setWeather] = useState({
    temp: 32,
    rainProb: 15,
    condition: 'Clear'
  });

  useEffect(() => {
    // In a real app, you'd fetch from a weather API
    // Simulating dynamic weather for demo purposes
    const conditions = ['Clear', 'Rain', 'Hot'];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
    if (randomCondition === 'Rain') {
      setWeather({ temp: 24, rainProb: 85, condition: 'Rain' });
    } else if (randomCondition === 'Hot') {
      setWeather({ temp: 42, rainProb: 5, condition: 'Hot' });
    } else {
      setWeather({ temp: 30, rainProb: 10, condition: 'Clear' });
    }
  }, []);

  const renderAlert = () => {
    if (weather.rainProb > 70) {
      return (
        <div className="weather-alert">
          <CloudRain size={18} color="var(--warning-color)" />
          <span>{t('smartAlertRain')}</span>
        </div>
      );
    } else if (weather.temp > 38) {
      return (
        <div className="weather-alert">
          <AlertCircle size={18} color="var(--warning-color)" />
          <span>{t('smartAlertHeat')}</span>
        </div>
      );
    } else {
      return (
        <div className="weather-alert" style={{ background: '#f0fdf4', borderColor: '#d1fae5', color: '#065f46' }}>
          <Sun size={18} color="#10b981" />
          <span>{t('smartAlertClear')}</span>
        </div>
      );
    }
  };

  return (
    <div className="weather-card animate-fade-in">
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
  );
}
