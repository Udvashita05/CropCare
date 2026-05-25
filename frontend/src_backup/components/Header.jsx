import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Leaf } from 'lucide-react';

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <div className="logo">
        <Leaf size={24} fill="var(--primary-color)" />
        <span>{t('appName')}</span>
      </div>
      
      <div className="header-controls" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <select 
          className="lang-selector"
          value={language}
          onChange={(e) => toggleLanguage(e.target.value)}
        >
          <option value="en">🌐 English</option>
          <option value="bn">🌐 বাংলা</option>
          <option value="hi">🌐 हिंदी</option>
          <option value="mr">🌐 मराठी</option>
          <option value="ta">🌐 தமிழ்</option>
          <option value="te">🌐 తెలుగు</option>
          <option value="kn">🌐 ಕನ್ನಡ</option>
          <option value="ml">🌐 മലയാളം</option>
          <option value="gu">🌐 ગુજરાતી</option>
          <option value="pa">🌐 ਪੰਜਾਬੀ</option>
        </select>
      </div>
    </header>
  );
}
