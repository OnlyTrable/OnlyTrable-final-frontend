// src/components/CurrentUserProfile/CurrentUserProfile.jsx

import React from 'react';
import styles from './CurrentUserProfile.module.css'; // Буде схожий на UserProfile.module.css
import Button from '../Button/Button.jsx';
// ... інші імпорти (Footer, Grid)

// Компонент приймає дані про користувача та функцію для переходу до режиму редагування
const CurrentUserProfile = ({ user, onEditClick }) => {
    
    // ... логіка formatCount (можна винести у utils) ...
    const formatCount = (count) => {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'k';
        }
        return count;
    };
    
    return (
        <div className={styles.profilePage}>
            <header className={styles.header}>
                <div className={styles.profileContainer}>
                    
                    {/* Аватар */}
                    <div className={styles.avatarContainer}>
                        <img src={user.avatarUrl} alt={`${user.username} avatar`} className={styles.avatar} />
                    </div>
                    
                    <section className={styles.infoSection}>
                        <div className={styles.topRow}>
                            <h2 className={styles.username}>{user.username}</h2>
                            
                            {/* Кнопка "Edit profile" ДЛЯ ПОТОЧНОГО КОРИСТУВАЧА */}
                            <div className={styles.actionButtons}>
                                <Button 
                                    text="Edit profile" 
                                    onClick={onEditClick} // ✅ Викликаємо функцію для відкриття EditProfilePanel
                                    className={styles.editProfileButton}
                                />
                            </div>
                        </div>

                        {/* Статистика (StatsRow) та Біографія (BioSection) - такі ж, як у UserProfile */}
                        {/* ... */}
                        
                    </section>
                </div>
            </header>
            
            {/* Галерея постів */}
            {/* ... */}
            
        </div>
    );
};

export default CurrentUserProfile;