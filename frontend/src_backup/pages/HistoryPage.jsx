import { useState, useEffect } from 'react';
import { Calendar, AlertCircle, ChevronRight, CloudUpload, Search, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import API_BASE_URL from '../config';

export default function HistoryPage() {
  const [scans, setScans] = useState([]);
  const [offlineScans, setOfflineScans] = useState([]);
  const [searches, setSearches] = useState([]);
  const [activeHistoryTab, setActiveHistoryTab] = useState('scans'); // 'scans' or 'searches'
  const [expandedItems, setExpandedItems] = useState({});
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const { t } = useLanguage();

  const loadOfflineQueue = () => {
    const queued = localStorage.getItem('offline_scans');
    if (queued) {
      try {
        setOfflineScans(JSON.parse(queued));
      } catch (e) {
        console.error(e);
      }
    } else {
      setOfflineScans([]);
    }
  };

  const fetchHistory = async () => {
    loadOfflineQueue();
    try {
      // 1. Fetch scan history
      const response = await fetch(`${API_BASE_URL}/api/history`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setScans(data);
        localStorage.setItem('cached_scans', JSON.stringify(data));
      } else {
        const cached = localStorage.getItem('cached_scans');
        if (cached) setScans(JSON.parse(cached));
      }

      // 2. Fetch search history
      const searchRes = await fetch(`${API_BASE_URL}/api/history/searches`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        setSearches(searchData);
        localStorage.setItem('cached_searches', JSON.stringify(searchData));
      } else {
        const cached = localStorage.getItem('cached_searches');
        if (cached) setSearches(JSON.parse(cached));
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
      const cached = localStorage.getItem('cached_scans');
      if (cached) setScans(JSON.parse(cached));

      const cachedSearches = localStorage.getItem('cached_searches');
      if (cachedSearches) setSearches(JSON.parse(cachedSearches));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchHistory();
    }

    const handleSyncEvent = () => {
      fetchHistory();
    };

    window.addEventListener('scans_synced', handleSyncEvent);
    return () => {
      window.removeEventListener('scans_synced', handleSyncEvent);
    };
  }, [token]);

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <div className="loading-overlay" style={{ position: 'relative', height: '60vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  const allScans = [...offlineScans.map(s => ({ ...s, isOffline: true })), ...scans];

  return (
    <div className="animate-fade-in">
      <h1 style={{ marginBottom: '24px' }}>{t('history')}</h1>

      {/* Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '24px', 
        background: 'rgba(0,0,0,0.03)', 
        padding: '6px', 
        borderRadius: '16px',
        maxWidth: 'fit-content'
      }}>
        <button 
          onClick={() => setActiveHistoryTab('scans')}
          style={{
            padding: '10px 20px',
            borderRadius: '12px',
            border: 'none',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: activeHistoryTab === 'scans' ? 'var(--primary-color)' : 'transparent',
            color: activeHistoryTab === 'scans' ? 'white' : 'var(--text-secondary)',
            boxShadow: activeHistoryTab === 'scans' ? '0 4px 12px rgba(76,175,80,0.2)' : 'none'
          }}
        >
          📸 Crop Leaf Scans
        </button>
        <button 
          onClick={() => setActiveHistoryTab('searches')}
          style={{
            padding: '10px 20px',
            borderRadius: '12px',
            border: 'none',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: activeHistoryTab === 'searches' ? 'var(--primary-color)' : 'transparent',
            color: activeHistoryTab === 'searches' ? 'white' : 'var(--text-secondary)',
            boxShadow: activeHistoryTab === 'searches' ? '0 4px 12px rgba(76,175,80,0.2)' : 'none'
          }}
        >
          🔍 Encyclopedia Searches
        </button>
      </div>

      {activeHistoryTab === 'scans' ? (
        /* Scans History Tab */
        allScans.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '60px' }}>
            <div style={{ background: '#f1f8f1', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <AlertCircle size={40} color="var(--primary-light)" />
            </div>
            <p style={{ fontWeight: '600' }}>No scans found yet.</p>
            <p style={{ fontSize: '14px' }}>Start by scanning a crop from the home page.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {allScans.map((scan) => (
              <div 
                key={scan.id || scan._id} 
                className="card-premium" 
                style={{ 
                  display: 'flex', 
                  gap: '16px', 
                  padding: '12px', 
                  marginBottom: '0', 
                  alignItems: 'center',
                  borderLeft: scan.isOffline ? '4px solid #ff9800' : 'none'
                }}
              >
                <img 
                  src={scan.isOffline ? scan.imageBase64 : `${API_BASE_URL}${scan.image_url}`} 
                  alt={scan.disease_name || "Offline Scan"}
                  style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: 'var(--border-radius-sm)' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '15px', margin: 0, color: 'var(--text-primary)' }}>
                      {scan.isOffline ? 'Pending AI Analysis' : scan.disease_name}
                    </h3>
                    {scan.isOffline && (
                      <span style={{ 
                        fontSize: '10px', 
                        background: 'rgba(255, 152, 0, 0.15)', 
                        color: '#ff9800', 
                        padding: '2px 8px', 
                        borderRadius: '12px', 
                        fontWeight: '700'
                      }}>
                        Pending Sync
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '12px' }}>
                    <Calendar size={12} />
                    <span>{new Date(scan.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                {scan.isOffline ? (
                  <CloudUpload size={20} color="#ff9800" className="pulse-soft" />
                ) : (
                  <ChevronRight size={20} color="var(--text-muted)" />
                )}
              </div>
            ))}
          </div>
        )
      ) : (
        /* Advisory/Search History Tab */
        searches.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '60px' }}>
            <div style={{ background: '#f1f8f1', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Search size={40} color="var(--primary-light)" />
            </div>
            <p style={{ fontWeight: '600' }}>No search history found yet.</p>
            <p style={{ fontSize: '14px' }}>Search for a crop in the Knowledge Hub to build search history.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {searches.map((item) => {
              const isExpanded = !!expandedItems[item._id];
              return (
                <div 
                  key={item._id} 
                  className="card-premium" 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: '12px', 
                    padding: '16px', 
                    marginBottom: '0', 
                    cursor: 'pointer',
                    borderLeft: item.source === 'gemini' ? '4px solid #9c27b0' : '4px solid #4caf50',
                    transition: 'all 0.3s'
                  }}
                  onClick={() => toggleExpand(item._id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        background: item.source === 'gemini' ? 'rgba(156, 39, 176, 0.1)' : 'rgba(76, 175, 80, 0.1)', 
                        padding: '10px', 
                        borderRadius: '12px',
                        color: item.source === 'gemini' ? '#9c27b0' : '#4caf50',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Search size={18} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '15px', margin: 0, color: 'var(--text-primary)', fontWeight: '700' }}>
                          Crop: <span style={{ textTransform: 'capitalize' }}>{item.query}</span>
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '12px', marginTop: '2px' }}>
                          <Clock size={12} />
                          <span>{new Date(item.created_at).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ 
                        fontSize: '10px', 
                        background: item.source === 'gemini' ? 'rgba(156, 39, 176, 0.15)' : 'rgba(76, 175, 80, 0.15)', 
                        color: item.source === 'gemini' ? '#9c27b0' : '#4caf50', 
                        padding: '2px 8px', 
                        borderRadius: '12px', 
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {item.source === 'gemini' ? '✨ Gemini AI' : '📁 Datafile'}
                      </span>
                      {isExpanded ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div 
                      style={{ 
                        marginTop: '8px', 
                        paddingTop: '16px', 
                        borderTop: '1px solid rgba(0,0,0,0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                      }}
                      onClick={(e) => e.stopPropagation()} // Prevent collapsing when clicking inner text
                    >
                      <p style={{ margin: 0, fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Identified Diseases & Advisory Info:
                      </p>
                      {item.results.map((disease, idx) => (
                        <div 
                          key={idx} 
                          style={{ 
                            background: 'rgba(0,0,0,0.015)', 
                            border: '1px solid rgba(0,0,0,0.03)', 
                            borderRadius: '16px', 
                            padding: '14px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--primary-dark)', fontWeight: '700' }}>
                              {disease.name}
                            </h4>
                            <span style={{ 
                              fontSize: '10px', 
                              background: disease.severity === 'High' ? 'rgba(244, 67, 54, 0.1)' : 'rgba(255, 152, 0, 0.1)', 
                              color: disease.severity === 'High' ? '#f44336' : '#ff9800', 
                              padding: '2px 8px', 
                              borderRadius: '10px', 
                              fontWeight: '700'
                            }}>
                              {disease.severity} Severity
                            </span>
                          </div>
                          <div style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                            <strong>Symptoms:</strong> {disease.symptoms}
                          </div>
                          <div style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                            <strong>Causes:</strong> {disease.causes}
                          </div>
                          <div style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                            <strong>Prevention:</strong> {disease.prevention}
                          </div>
                          <div style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                            <strong>Treatment:</strong> {disease.treatment}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}
