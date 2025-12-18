// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setupInterceptors } from '../api/axios'; // ✨ Імпортуємо setupInterceptors

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProviderComponent = ({ children }) => {
    // Access Token зберігається у стані (пам'яті)
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const isAuthenticated = !!accessToken;
    const navigate = useNavigate();

    // Стабільна функція для отримання токена. Визначаємо її тут, щоб уникнути TDZ.
    const getAccessToken = useCallback(() => accessToken, [accessToken]);

    // ✨ Передаємо інструменти в axios при першому рендері
    useEffect(() => {
        // Налаштовуємо перехоплювач відповіді один раз
        const responseInterceptor = setupInterceptors(setAccessToken, navigate);

        // Налаштовуємо перехоплювач запиту, який буде оновлюватися
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                const token = getAccessToken(); // Завжди викликаємо актуальну функцію
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [getAccessToken, navigate]);

    // ====================================================================
    // 1. Первинна перевірка авторизації (через refresh токен)
    // ====================================================================
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // Встановлюємо прапорець _doNotRetry, щоб Interceptor не викликав refresh
                const rs = await api.post('/auth/refresh', {}, { withCredentials: true, _doNotRetry: true });
                const { token: newAccessToken, user: userData } = rs.data; 
                setAccessToken(newAccessToken);
                setUser(userData);
            } catch (error) {
                // Якщо 401/403 (кука відсутня або недійсна), setAccessToken(null)
                setAccessToken(null);
                console.error("Error 401/403 setAccessToken will be cleared:", error);
            } finally {
                // В будь-якому випадку, ми завершили первинну перевірку
                setIsLoading(false); 
            }
        };
        // Запускаємо перевірку лише один раз
        checkAuthStatus();
    }, []);

    useEffect(() => {
        // Інтервал: 14 хвилин (840 000 мс).
        const INTERVAL_MS = 14 * 60 * 1000; 
        
        const checkHealth = async () => {
            try {
                // Викликаємо наш спеціальний ендпоінт, щоб розбудити бекенд та DB
                await api.get('/health/db'); 
                // console.log("Health check successful. Server is awake.");
            } catch (error) {
                console.error("Health check failed:", error.message);
            }
        };

        // Запускаємо відразу
        checkHealth(); 

        // Налаштовуємо інтервал
        const intervalId = setInterval(checkHealth, INTERVAL_MS);

        // Очищаємо інтервал при демонтажі компонента
        return () => {
            clearInterval(intervalId);
        };
        
    // Залежність [] гарантує, що це запускається лише один раз
    }, []); 

    // Функція логіну, що зберігає токен у пам'яті
    const login = useCallback((token, userData) => {
        setAccessToken(token); 
        setUser(userData);
    }, []);

    // Функція виходу
    const logout = useCallback(async () => {
        try {
            // 1. Викликаємо бекенд, щоб очистити Refresh Token у DB та HttpOnly Cookie
            await api.post('/auth/logout'); // ✨ Тепер заголовок додається автоматично
        } catch (error) {
            // Ігноруємо помилки, логаут має відбутися незалежно від бекенда
            console.error("Logout failed on backend, but client state will be cleared:", error);
        } finally {
            // 2. Очищаємо Access Token у пам'яті
            setAccessToken(null);
            setUser(null);
        }
    }, []); // getAccessToken більше не потрібен тут, бо interceptor працює автоматично

    // Об'єкт, що передається в контекст, створюється за допомогою useMemo 
    // для оптимізації та стабільності
    const contextValue = useMemo(() => ({
        accessToken, 
        user,
        isAuthenticated, 
        login, 
        logout, 
        setAccessToken, // ✅ Обов'язково для запису токена Interceptor'ом
        setUser,
        getAccessToken,
        isLoading,
    }), [accessToken, user, isAuthenticated, isLoading, login, logout, getAccessToken]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Експортуємо хук як іменований експорт, а провайдер — як експорт за замовчуванням.
export default AuthProviderComponent;

// Для сумісності з існуючими імпортами, можна також експортувати як іменований.
export { AuthProviderComponent as AuthProvider };