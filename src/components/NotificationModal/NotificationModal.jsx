import React from 'react';
import styles from './NotificationModal.module.css';

const NotificationModal = ({ isOpen, message, type, onClose }) => {
    if (!isOpen) return null;

    // Визначаємо клас для кольору контенту
    const contentClass = type === 'error' ? styles.errorContent : styles.successContent;
    
    // Визначаємо клас для кнопки (closeButton - для успіху, errorButton - для помилки)
    const buttonClass = type === 'error' ? styles.errorButton : styles.closeButton;

    return (
        <div className={styles.backdrop}>
            {/* Використовуємо лише базовий клас .modal */}
            <div className={styles.modal}>
                {/* Застосовуємо клас для кольору контенту */}
                <div className={`${styles.content} ${contentClass}`}>
                    <h3>{type === 'error' ? 'Error' : 'Success'}</h3>
                    <p>{message}</p>
                </div>
                <button 
                    // Застосовуємо базовий клас та специфічний клас для кольору
                    className={`${styles.closeButton} ${buttonClass}`} 
                    onClick={onClose}
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default NotificationModal;