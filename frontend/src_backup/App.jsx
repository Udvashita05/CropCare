import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ScanPage from './pages/ScanPage';
import ResultsPage from './pages/ResultsPage';
import HistoryPage from './pages/HistoryPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CropDetailsPage from './pages/CropDetailsPage';
import ProfilePage from './pages/ProfilePage';
import KnowledgeHub from './pages/KnowledgeHub';
import RatingPage from './pages/RatingPage';
import WelcomePage from './pages/WelcomePage';
import OrganicMethodsPage from './pages/OrganicMethodsPage';
import BottomNav from './components/BottomNav';
import SideNav from './components/SideNav';
import API_BASE_URL from './config';

const OfflineSyncManager = () => {
  const { token } = useAuth();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showStatusBanner, setShowStatusBanner] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowStatusBanner(true);
      setTimeout(() => setShowStatusBanner(false), 4000);
      triggerSync();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowStatusBanner(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check on mount
    if (navigator.onLine) {
      triggerSync();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [token]);

  const triggerSync = async () => {
    if (!token || !navigator.onLine) return;
    const queued = localStorage.getItem('offline_scans');
    if (!queued) return;
    
    let scans = [];
    try {
      scans = JSON.parse(queued);
    } catch (e) {
      console.error(e);
      return;
    }

    if (scans.length === 0) return;

    setSyncing(true);
    setSyncMessage(`Syncing ${scans.length} offline scan(s)...`);

    const remainingScans = [...scans];
    const base64ToFile = (dataurl, filename) => {
      let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[arr.length - 1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
    };

    for (const scan of scans) {
      try {
        const file = base64ToFile(scan.imageBase64, `offline_scan_${scan.id}.png`);
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(`${API_BASE_URL}/api/analyze`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData,
        });

        if (response.ok) {
          const index = remainingScans.findIndex(s => s.id === scan.id);
          if (index !== -1) {
            remainingScans.splice(index, 1);
          }
          localStorage.setItem('offline_scans', JSON.stringify(remainingScans));
        }
      } catch (err) {
        console.error('Failed to sync scan', scan.id, err);
      }
    }

    setSyncing(false);
    if (remainingScans.length === 0) {
      setSyncMessage('All offline scans synchronized!');
      setTimeout(() => setSyncMessage(''), 4000);
      window.dispatchEvent(new Event('scans_synced'));
    } else {
      setSyncMessage(`Failed to sync ${remainingScans.length} scans. Will retry later.`);
      setTimeout(() => setSyncMessage(''), 4000);
    }
  };

  return (
    <>
      {showStatusBanner && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          background: isOnline ? 'rgba(76, 175, 80, 0.95)' : 'rgba(244, 67, 54, 0.95)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '30px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: '600',
          fontSize: '14px',
          transition: 'all 0.3s ease',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          {isOnline ? <Wifi size={18} /> : <WifiOff size={18} />}
          <span>{isOnline ? 'Back online! Syncing data...' : 'You are currently offline. Using cached data.'}</span>
          {!isOnline && (
            <button 
              onClick={() => setShowStatusBanner(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                marginLeft: '10px',
                fontSize: '12px',
                opacity: 0.8
              }}
            >
              ✕
            </button>
          )}
        </div>
      )}

      {syncMessage && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          zIndex: 9999,
          background: 'rgba(33, 150, 243, 0.95)',
          color: 'white',
          padding: '14px 24px',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontWeight: '600',
          fontSize: '14px',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          {syncing ? <RefreshCw size={16} className="spinner" /> : <CheckCircle size={16} />}
          <span>{syncMessage}</span>
        </div>
      )}
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div>
  );
  if (!user) return <Navigate to="/welcome" />;
  
  return (
    <div className="app-container">
      <OfflineSyncManager />
      <SideNav />
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="mobile-only">
          <Header />
        </div>
        <div className="content-area">
          {children}
        </div>
        <div className="mobile-only w-full">
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/organic-methods" element={<OrganicMethodsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route 
                path="/crop-details" 
                element={
                  <ProtectedRoute>
                    <CropDetailsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/scan" 
                element={
                  <ProtectedRoute>
                    <ScanPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/results" 
                element={
                  <ProtectedRoute>
                    <ResultsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/history" 
                element={
                  <ProtectedRoute>
                    <HistoryPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/knowledge" 
                element={
                  <ProtectedRoute>
                    <KnowledgeHub />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/rating" 
                element={
                  <ProtectedRoute>
                    <RatingPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
