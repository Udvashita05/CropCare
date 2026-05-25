import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Home, ScanLine, History, BookOpen, User, Leaf, LogOut } from 'lucide-react';

export default function SideNav() {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  return (
    <nav className="desktop-only" style={{ 
      width: '280px', 
      height: '100vh', 
      background: 'var(--surface-color)', 
      borderRight: '1px solid var(--glass-border)',
      padding: '40px 20px',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="logo" style={{ marginBottom: '40px', padding: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Leaf size={32} fill="var(--primary-color)" />
          <span style={{ fontSize: '24px', fontWeight: '800' }}>{t('appName')}</span>
        </div>
      </div>

      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          style={{ flex: 1, height: '45px' }}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        <select 
          className="lang-selector"
          value={language}
          onChange={(e) => toggleLanguage(e.target.value)}
          style={{ flex: 2, height: '45px', border: '1px solid var(--glass-border)' }}
        >
          <option value="en">English</option>
          <option value="bn">বাংলা</option>
          <option value="hi">हिंदी</option>
          <option value="mr">मराठी</option>
          <option value="ta">தமிழ்</option>
          <option value="te">తెలుగు</option>
          <option value="kn">ಕನ್ನಡ</option>
          <option value="ml">മലയാളം</option>
          <option value="gu">ગુજરાતી</option>
          <option value="pa">ਪੰਜਾਬੀ</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Home size={20} />
          <span>{t('home')}</span>
        </NavLink>
        
        <NavLink to="/knowledge" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <BookOpen size={20} />
          <span>{t('knowledgeHub')}</span>
        </NavLink>

        <NavLink to="/scan" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <ScanLine size={20} />
          <span>{t('scan')}</span>
        </NavLink>
        
        <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <History size={20} />
          <span>{t('history')}</span>
        </NavLink>

        <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <User size={20} />
          <span>{t('profile')}</span>
        </NavLink>
      </div>

      <button 
        onClick={logout}
        style={{ 
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px',
          border: 'none',
          background: 'transparent',
          color: 'var(--danger-color)',
          fontWeight: '600',
          cursor: 'pointer',
          borderRadius: '12px',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
      >
        <LogOut size={20} />
        <span>{t('logout') || 'Logout'}</span>
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        .nav-link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          text-decoration: none;
          color: var(--text-secondary);
          border-radius: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .nav-link:hover {
          background: var(--bg-color);
          color: var(--primary-color);
        }
        .nav-link.active {
          background: var(--gradient-green);
          color: white;
          box-shadow: 0 8px 16px rgba(46, 125, 50, 0.2);
        }
      `}} />
    </nav>
  );
}
