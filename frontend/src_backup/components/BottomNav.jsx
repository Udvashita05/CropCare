import { NavLink } from 'react-router-dom';
import { Home, ScanLine, History, BookOpen, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BottomNav() {
  const { t } = useLanguage();

  return (
    <nav className="bottom-nav" style={{ padding: '8px 10px 24px' }}>
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', gap: '4px', flex: 1 }}>
        <Home size={22} />
        <span style={{ fontSize: '10px', fontWeight: '700' }}>{t('home')}</span>
      </NavLink>
      
      <NavLink to="/knowledge" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', gap: '4px', flex: 1 }}>
        <BookOpen size={22} />
        <span style={{ fontSize: '10px', fontWeight: '700' }}>{t('knowledgeHub')}</span>
      </NavLink>

      <NavLink to="/scan" style={{ textDecoration: 'none', position: 'relative', top: '-25px', zIndex: 10 }}>
        <div style={{ 
          background: 'var(--gradient-green)', 
          width: '64px', 
          height: '64px', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'white',
          boxShadow: '0 8px 25px rgba(46, 125, 50, 0.4)',
          border: '4px solid var(--surface-color)'
        }}>
          <ScanLine size={28} />
        </div>
      </NavLink>
      
      <NavLink to="/history" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', gap: '4px', flex: 1 }}>
        <History size={22} />
        <span style={{ fontSize: '10px', fontWeight: '700' }}>{t('history')}</span>
      </NavLink>

      <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', gap: '4px', flex: 1 }}>
        <User size={22} />
        <span style={{ fontSize: '10px', fontWeight: '700' }}>{t('profile')}</span>
      </NavLink>
    </nav>
  );
}
