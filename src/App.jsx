import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setupInterceptors } from './api/setupInterceptors';
import { AuthProvider, useAuth } from './context/AuthContext'; // ✅ Імпорт контексту
import './styles/style.css';
import Navigation from './pages/Navigation';

// Компонент-обгортка для ініціалізації перехоплювачів
const AppContent = () => {
  const navigate = useNavigate();
  // ✅ Отримуємо функції з контексту
  const { getAccessToken, setAccessToken } = useAuth();

  useEffect(() => {
    // ✅ Передаємо ВСІ ТРИ аргументи: get, set, navigate
    setupInterceptors(getAccessToken, setAccessToken, navigate);
  }, [getAccessToken, setAccessToken, navigate]);

  return <Navigation />;
};

function App() {
  return (
    // ✅ Огортаємо все в AuthProvider, щоб працював useAuth
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;