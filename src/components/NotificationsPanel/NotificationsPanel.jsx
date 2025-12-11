import React from 'react';
import './NotificationsPanel.css'; // Імпорт стилів

/**
 * Окремий компонент для відображення одного сповіщення.
 */
const NotificationItem = ({ avatarSrc, username, actionText, timeAgo, thumbnailSrc }) => {
    // Розділяємо текст дії на перше слово та решту
    const actionWords = actionText.split(' ');
    const firstActionWord = actionWords.shift(); // Забираємо перше слово
    const restOfActionText = actionWords.join(' '); // З'єднуємо решту слів

    return (
        <div className="notification-item">
            {/* Аватар користувача */}
            <img className="user-avatar" src={avatarSrc} alt={`${username}'s avatar`} />

            {/* Зміст сповіщення */}
            <div className="notification-content">
                <p className="notification-text">
                    <span className="username">{username} </span> {firstActionWord} <br/>{restOfActionText} <span className="time-ago">{timeAgo}</span>
                </p>
            </div>

            {/* Мініатюра фото */}
            <img className="photo-thumbnail" src={thumbnailSrc} alt="Your photo thumbnail" />
        </div>
    );
};

/**
 * Основний компонент "Панель сповіщень".
 * * @param {Object} props
 * @param {Array<Object>} props.notifications - Масив об'єктів сповіщень.
 */
const NotificationsPanel = ({ notifications }) => {
    // Групуємо сповіщення, якщо потрібно. У цьому прикладі просто виводимо їх.

    return (
        <div className="notifications-panel">
            <h2 className="notifications-title">Notifications</h2>

            {/* Заголовок секції "New" */}
            <p className="notifications-section-title">New</p>

            {/* Мапуємо масив сповіщень на компоненти NotificationItem */}
            {notifications.map((notif, index) => (
                <NotificationItem 
                    key={index} // В ідеалі використовувати унікальний ID сповіщення замість index
                    avatarSrc={notif.avatarSrc}
                    username={notif.username}
                    actionText={notif.actionText}
                    timeAgo={notif.timeAgo}
                    thumbnailSrc={notif.thumbnailSrc}
                />
            ))}
        </div>
    );
};

export default NotificationsPanel;