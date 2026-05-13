import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
