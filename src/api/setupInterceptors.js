import api from "./axios"; // ✅ ВИПРАВЛЕНО: Прибрано '.js'
//import axios from "axios";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const setupInterceptors = (getAccessToken, setAccessToken, navigate) => {
  // ✅ 1. ЄДИНИЙ перехоплювач запиту (читає з пам'яті)
  api.interceptors.request.use(
    (config) => {
      const publicUrls = ['/auth/login', '/auth/register', '/auth/refresh'];
      const token = getAccessToken(); // Читаємо з функції AuthContext

      // Додаємо заголовок, якщо є токен і URL не є публічним
      if (token && !publicUrls.includes(config.url)) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // ✅ 2. ЄДИНИЙ перехоплювач відповіді (обробляє 401)
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // Якщо помилка сталася на запиті оновлення токена, або це не 401,
      // або запит вже повторювався - не обробляємо його тут.
      if (originalRequest.url === '/auth/refresh' || error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }
      
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          try {
            // Оновлюємо токен (Cookie йде автоматично)
            const rs = await api.post(
              "/auth/refresh",
              {},
              // Ми не додаємо withCredentials тут, оскільки воно вже є
              // в глобальній конфігурації axios інстансу 'api'
            );
            const { token: newAccessToken } = rs.data;

            setAccessToken(newAccessToken);
            processQueue(null, newAccessToken);
          } catch (_error) {
            processQueue(_error, null);
            setAccessToken(null);
            if (navigate) navigate("/"); // Перенаправляємо на логін
            return Promise.reject(_error);
          } finally {
            isRefreshing = false;
          }
        }

        return new Promise((resolve, reject) => {
          // Додаємо в чергу функцію, яка виконає повторний запит
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          // Коли черга оброблена, ми отримуємо НОВИЙ токен
          originalRequest.headers.Authorization = `Bearer ${token}`; // Встановлюємо новий токен
          return api(originalRequest);
        });
      }
      return Promise.reject(error);
    }
  );
};