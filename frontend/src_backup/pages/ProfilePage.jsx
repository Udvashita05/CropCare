import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { User, Mail, MapPin, Calendar, LogOut, ShieldCheck, Sprout } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div className="auth-icon-box" style={{ background: 'var(--gradient-green)', color: 'white' }}>
          <User size={40} />
        </div>
        <h1>{t('profile')}</h1>
        <p>{user?.full_name}</p>
      </div>

      <div className="card-premium">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'var(--bg-color)', padding: '10px', borderRadius: '12px' }}>
              <Mail size={20} color="var(--primary-color)" />
            </div>
            <div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Email / Phone</p>
              <p style={{ fontSize: '15px', fontWeight: '600', margin: 0 }}>{user?.email}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'var(--bg-color)', padding: '10px', borderRadius: '12px' }}>
              <MapPin size={20} color="var(--primary-color)" />
            </div>
            <div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{t('landSize')}</p>
              <p style={{ fontSize: '15px', fontWeight: '600', margin: 0 }}>{user?.land_size} {t('acres')}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'var(--bg-color)', padding: '10px', borderRadius: '12px' }}>
              <ShieldCheck size={20} color="var(--primary-color)" />
            </div>
            <div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Account Status</p>
              <p style={{ fontSize: '15px', fontWeight: '600', margin: 0, color: 'var(--success-color)' }}>Verified Farmer</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card-premium" style={{ background: 'var(--gradient-green)', color: 'white', border: 'none' }}>
        <h3 style={{ color: 'white', marginBottom: '8px' }}>Active Cultivation</h3>
        <p style={{ opacity: 0.9, fontSize: '14px' }}>Managing {user?.land_size} acres with AI monitoring enabled.</p>
        <button className="btn-primary" style={{ background: 'white', color: 'var(--primary-color)', marginTop: '16px', padding: '12px' }}>
          <Sprout size={18} /> Upgrade Plan
        </button>
      </div>

      <button 
        onClick={logout} 
        className="btn-outline" 
        style={{ marginTop: '24px', color: 'var(--danger-color)', borderColor: 'var(--danger-color)', borderOpacity: 0.2 }}
      >
        <LogOut size={20} /> {t('logout')}
      </button>
    </div>
  );
}
