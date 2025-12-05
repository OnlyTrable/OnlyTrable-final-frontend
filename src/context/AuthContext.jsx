// src/context/AuthContext.jsx 

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import api from '../api/axios.js';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Access Token зберігається у стані (пам'яті)
    const [accessToken, setAccessToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const isAuthenticated = !!accessToken;
    const getAccessToken = () => accessToken;

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // ВАЖЛИВЕ ВИПРАВЛЕННЯ: Додано _doNotRetry: true, щоб уникнути нескінченного циклу Interceptor'а,
                // коли первинна перевірка авторизації повертає 401.
                const rs = await api.post(
                    '/auth/refresh', 
                    {}, 
                    { 
                        withCredentials: true,
                        _doNotRetry: true // ЦЕЙ ПРАПОРЕЦЬ - КЛЮЧ ДО ВИРІШЕННЯ
                    }
                );
                const { token: newAccessToken } = rs.data; 
                setAccessToken(newAccessToken);
            } catch (error) {
                // Якщо 401/403 (кука відсутня або недійсна), setAccessToken(null)
                setAccessToken(null);
                console.error("Error during initial auth check:", error);
            } finally {
                // Завжди знімаємо стан завантаження
                setIsLoading(false); 
            }
        };
        // Запускаємо перевірку лише один раз
        checkAuthStatus();
    }, []);
    // Функція логіну, що зберігає токен у пам'яті
    const login = (token) => {
        setAccessToken(token); 
    };

    // Функція виходу
    const logout = async () => {
        try {
            // 1. Викликаємо бекенд, щоб очистити Refresh Token у DB та HttpOnly Cookie
            await api.post('/auth/logout'); 
        } catch (error) {
            // Ігноруємо помилки, логаут має відбутися незалежно від бекенда
            console.error("Logout failed on backend, but client state will be cleared:", error);
        } finally {
            // 2. Очищаємо Access Token у пам'яті
            setAccessToken(null);
        }
    };

    // Об'єкт, що передається в контекст, створюється за допомогою useMemo 
    // для оптимізації та стабільності
    const contextValue = useMemo(() => ({
        accessToken, 
        isAuthenticated, 
        login, 
        logout, 
        setAccessToken, // ✅ Обов'язково для запису токена Interceptor'ом
        getAccessToken, // ✅ Обов'язково для читання токена Interceptor'ом
        isLoading,
    }), [accessToken, isAuthenticated, isLoading]);

    // Немає useEffect для первинної перевірки, оскільки ми покладаємося на те, 
    // що ProtectedRoute викличе захищений маршрут, а Interceptor спрацює.
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};