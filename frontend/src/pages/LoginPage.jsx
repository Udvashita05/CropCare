import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Lock, Loader2, Leaf, ArrowLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import BackgroundParticles from '../components/BackgroundParticles';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.user, data.token);
        navigate('/');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <BackgroundParticles />
      <Header />
      <div className="auth-container animate-fade-in" style={{ zIndex: 1 }}>
        <button className="theme-toggle" onClick={() => navigate('/welcome')} style={{ width: 'auto', padding: '0 12px', borderRadius: '12px', marginBottom: '20px' }}>
          <ArrowLeft size={18} />
          <span style={{ marginLeft: '6px', fontSize: '14px', fontWeight: '600' }}>Back</span>
        </button>

        <div className="auth-header-section" style={{ textAlign: 'left', marginBottom: '30px' }}>
          <div className="auth-icon-box" style={{ margin: '0 0 20px 0' }}>
            <Leaf size={40} fill="var(--primary-color)" />
          </div>
          <h1 style={{ fontSize: '32px' }}>{t('login')}</h1>
          <p style={{ fontSize: '16px' }}>{t('appName')} — your smart farming partner.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel animate-slide-up">
          <div className="input-field-group stagger-1">
            <label>{t('emailPhone')}</label>
            <div className="input-wrapper">
              <Mail size={20} />
              <input
                type="text"
                placeholder={t('placeholderEmail')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-field-group stagger-2">
            <label>{t('password')}</label>
            <div className="input-wrapper">
              <Lock size={20} />
              <input
                type="password"
                placeholder={t('placeholderPass')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div className="error-message animate-fade-in" style={{ 
              marginBottom: '16px', 
              padding: '12px', 
              background: 'rgba(239, 68, 68, 0.1)', 
              borderRadius: '12px',
              color: 'var(--danger-color)',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '10px' }}>
            {loading ? <Loader2 className="spinner" style={{ width: '24px', height: '24px' }} /> : (
              <>
                {t('login')}
                <ChevronRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer" style={{ marginTop: 'auto', padding: '20px 0' }}>
          <p style={{ textAlign: 'center' }}>
            {t('noAccount')} {' '}
            <Link to="/signup" style={{ color: 'var(--primary-color)', fontWeight: '700', textDecoration: 'none' }}>
              {t('signup')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
