import { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Loader2, Sparkles, UploadCloud, CloudOff } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import WeatherSection from '../components/WeatherSection';
import API_BASE_URL from '../config';

export default function ScanPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showOfflineModal, setShowOfflineModal] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  const { t } = useLanguage();

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    if (!navigator.onLine) {
      setIsAnalyzing(true);
      try {
        const fileToBase64 = (file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
          });
        };
        const base64Image = await fileToBase64(selectedImage);
        const offlineScan = {
          id: Date.now().toString(),
          imageBase64: base64Image,
          cropInfo: location.state?.cropInfo || null,
          created_at: new Date().toISOString()
        };
        
        const queued = localStorage.getItem('offline_scans');
        const scans = queued ? JSON.parse(queued) : [];
        scans.push(offlineScan);
        localStorage.setItem('offline_scans', JSON.stringify(scans));
        
        setIsAnalyzing(false);
        setShowOfflineModal(true);
      } catch (err) {
        console.error(err);
        alert('Failed to save offline scan.');
        setIsAnalyzing(false);
      }
      return;
    }

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.details || errData.error || 'Failed to analyze image');
      }
      
      const result = await response.json();
      
      // Pass cropInfo forward to ResultsPage for dosage calculation
      navigate('/results', { state: { result, cropInfo: location.state?.cropInfo } });
    } catch (error) {
      console.error(error);
      alert('Error analyzing image: ' + (error.details || error.message));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '20px' }}>
      <WeatherSection />

      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ marginBottom: '4px' }}>{t('scan')}</h1>
        <p>{t('uploadDesc')}</p>
      </div>

      {!previewUrl ? (
        <div 
          className="upload-placeholder pulse-soft"
          onClick={() => fileInputRef.current?.click()}
        >
          <div style={{ 
            width: '80px', 
            height: '80px', 
            background: 'var(--primary-light)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 10px 20px rgba(76, 175, 80, 0.3)'
          }}>
            <Camera size={40} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ margin: 0, color: 'var(--primary-dark)' }}>{t('uploadTitle')}</h2>
            <p style={{ marginTop: '4px' }}>Tap to capture or select from gallery</p>
          </div>
          
          <input 
            type="file" 
            accept="image/*" 
            capture="environment"
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleImageSelect}
          />
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="image-preview-container">
            <img 
              src={previewUrl} 
              alt="Preview" 
            />
            <div style={{ 
              position: 'absolute', 
              top: '16px', 
              right: '16px',
              background: 'rgba(0,0,0,0.5)',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              backdropFilter: 'blur(4px)'
            }}>
              {t('retake')}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button 
              className="btn-outline" 
              style={{ flex: 1 }}
              onClick={() => { setSelectedImage(null); setPreviewUrl(null); }}
              disabled={isAnalyzing}
            >
              {t('retake')}
            </button>
            <button 
              className="btn-primary" 
              style={{ flex: 2 }}
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={20} className="spinner" /> 
                  {t('analyzing')}
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  {t('analyze')}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {isAnalyzing && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <h2 style={{ color: 'var(--primary-dark)' }}>{t('analyzing')}</h2>
          <p>This may take a few seconds...</p>
        </div>
      )}

      {/* Offline Modal */}
      {showOfflineModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div className="card-premium animate-fade-in" style={{
            maxWidth: '400px',
            width: '100%',
            padding: '32px',
            textAlign: 'center',
            background: 'white',
            borderRadius: '24px',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <div style={{
              background: 'rgba(76, 175, 80, 0.1)',
              color: 'var(--primary-color)',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <CloudOff size={32} />
            </div>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>Offline Scan Queued</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
              You are currently offline. We have saved your crop leaf scan locally. It will be analyzed automatically when your connection is restored!
            </p>
            <button 
              className="btn-primary" 
              style={{ width: '100%' }}
              onClick={() => {
                setShowOfflineModal(false);
                navigate('/history');
              }}
            >
              View History
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
