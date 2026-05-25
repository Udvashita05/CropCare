import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, Thermometer, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WeatherSection() {
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
