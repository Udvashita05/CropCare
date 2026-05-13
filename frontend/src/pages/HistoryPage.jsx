import { useState, useEffect } from 'react';
import { Calendar, AlertCircle, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function HistoryPage() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    if (token) fetchHistory();
  }, [token]);

  const fetchHistory = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/history', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setScans(data);
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-overlay" style={{ position: 'relative', height: '60vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 style={{ marginBottom: '24px' }}>{t('history')}</h1>
      
      {scans.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '60px' }}>
          <div style={{ background: '#f1f8f1', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <AlertCircle size={40} color="var(--primary-light)" />
          </div>
          <p style={{ fontWeight: '600' }}>No scans found yet.</p>
          <p style={{ fontSize: '14px' }}>Start by scanning a crop from the home page.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {scans.map((scan) => (
            <div key={scan.id} className="card-premium" style={{ display: 'flex', gap: '16px', padding: '12px', marginBottom: '0', alignItems: 'center' }}>
              <img 
                src={`http://127.0.0.1:5000${scan.image_url}`} 
                alt={scan.disease_name}
                style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: 'var(--border-radius-sm)' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '15px', margin: 0, color: 'var(--text-primary)' }}>{scan.disease_name}</h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '12px' }}>
                  <Calendar size={12} />
                  <span>{new Date(scan.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <ChevronRight size={20} color="var(--text-muted)" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
