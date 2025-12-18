import React from 'react';
import { AuthProvider } from './context/AuthContext'; // ✅ Імпорт контексту
import './styles/style.css';
import Navigation from './pages/Navigation';

function App() {
  return (
    // Огортаємо все в AuthProvider.
    // AuthContext тепер сам налаштовує перехоплювачі,
    // тому AppContent більше не потрібен.
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

export default App;