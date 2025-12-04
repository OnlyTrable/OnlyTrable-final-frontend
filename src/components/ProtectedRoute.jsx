// src/components/ProtectedRoute.jsx (Виправлено!)

import React from 'react';
// 💡 Потрібен <Outlet> для Layout Route!
import { Navigate, Outlet } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = () => { // ❗ Більше не приймає { children }
  
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    // 1. Показ завантаження, поки ми перевіряємо статус
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    // 2. Якщо не авторизований, перенаправляємо
    return <Navigate to="/" replace />;
  }
  
  // 3. Якщо авторизований, рендеримо <Outlet />.
  //    <Outlet /> рендерить дочірній елемент <Route> 
  //    (тобто, MainPage, ProfilePage тощо).
  return <Outlet />; // ✅ ВИПРАВЛЕНО!
};

export default ProtectedRoute;