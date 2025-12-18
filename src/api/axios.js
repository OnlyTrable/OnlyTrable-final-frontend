import axios from 'axios';

// 1. Отримуємо BASE_URL з файлу .env.local
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 2. Створюємо інстанс Axios
const api = axios.create({
    baseURL: BASE_URL, // Встановлюємо базовий URL для всіх запитів
    // Не встановлюємо 'Content-Type' глобально. Axios зробить це автоматично.
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

export const setupInterceptors = (setAccessToken, navigate) => {
    const interceptorId = api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise(function (resolve, reject) {
                        failedQueue.push({ resolve, reject });
                    }).then(token => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return api(originalRequest);
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const rs = await api.post('/auth/refresh');
                    const { token: newAccessToken } = rs.data;
                    setAccessToken(newAccessToken);
                    processQueue(null, newAccessToken);
                    // ✨ ВАЖЛИВО: Оновлюємо заголовок в оригінальному запиті
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    processQueue(refreshError, null);
                    setAccessToken(null); // Очищуємо токен
                    if (navigate) navigate("/"); // Перенаправляємо на логін
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }
            return Promise.reject(error);
        }
    );

    return interceptorId;
};

export default api;