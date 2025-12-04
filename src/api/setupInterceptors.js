import api from "./axios.js";
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
      const token = getAccessToken(); // Читаємо з функції AuthContext
      if (token) {
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

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          try {
            // Оновлюємо токен (Cookie йде автоматично)
            const rs = await api.post(
              "/auth/refresh",
              {},
              { withCredentials: true }
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
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }
      return Promise.reject(error);
    }
  );
};
