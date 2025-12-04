import { useState, useCallback } from 'react';

const useNotification = () => {
    // Стан для відображення модального вікна та його вмісту
    const [notification, setNotification] = useState({
        isOpen: false,
        message: '',
        type: '', // 'success' або 'error'
    });

    // Функція для показу сповіщення
    const showNotification = useCallback((message, type = 'error') => {
        setNotification({
            isOpen: true,
            message,
            type,
        });
    }, []);

    // Функція для закриття сповіщення
    const closeNotification = useCallback(() => {
        setNotification((prev) => ({
            ...prev,
            isOpen: false,
        }));
    }, []);

    return {
        notification,
        showNotification,
        closeNotification,
    };
};

export default useNotification;