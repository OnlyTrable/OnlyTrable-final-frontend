import axios from 'axios';

// 1. Отримуємо BASE_URL з файлу .env.local
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 2. Створюємо інстанс Axios
const api = axios.create({
    baseURL: BASE_URL, // Встановлюємо базовий URL для всіх запитів
    // Не встановлюємо 'Content-Type' глобально. Axios зробить це автоматично.
    withCredentials: true,
});

export default api; // Експортуємо інстанс