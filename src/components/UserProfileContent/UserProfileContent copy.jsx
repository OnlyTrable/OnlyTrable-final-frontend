import React, { useState } from "react";
import styles from "./UserProfileContent.module.css";
// Імпортуємо стандартне зображення, яке буде "заглушкою"
import defaultProfilePic from "../../assets/avatars/ich.png"; 
import PostModal from '../PostModal/PostModal';

// 1. У параметрах функції використовуємо зрозумілі назви
// 2. Якщо userAvatar не передано, підставиться defaultProfilePic
const UserProfileContent = ({ 
  username = "Guest", 
  userAvatar = defaultProfilePic, 
  isOwnProfile = false 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.avatarSection}>
          {/* Використовуємо пропс userAvatar, який прийде ззовні */}
          <img 
            src={userAvatar} 
            alt={`${username} avatar`} 
            className={styles.avatar} 
          />
        </div>

        <div className={styles.infoSection}>
          <div className={styles.topRow}>
            <h2 className={styles.username}>{username}</h2>
            
            {isOwnProfile ? (
              <button className={styles.editBtn}>Edit profile</button>
            ) : (
              <div className={styles.actions}>
                <button className={styles.followBtn}>Follow</button>
                <button
                  className={styles.messageBtn}
                  onClick={() => setIsModalOpen(true)}
                >
                  Message
                </button>
              </div>
            )}
          </div>
          
          <PostModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            username={username}
          />

          <div className={styles.stats}>
            <span><strong>129</strong> posts</span>
            <span><strong>9 993</strong> followers</span>
            <span><strong>59</strong> following</span>
          </div>

          <div className={styles.bio}>
            <p className={styles.name}>{username}</p>
            <p>• Гарантія допомоги з працевлаштуванням в IT</p>
            <a href="https://bit.ly/3rpiIbh" className={styles.link}>
              bit.ly/3rpiIbh
            </a>
          </div>
        </div>
      </header>

      {/* Сітка постів залишається без змін */}
      <div className={styles.postsGrid}>
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <div key={id} className={styles.postBox}>
            <img
              src={`https://picsum.photos/404/506?random=${id}`}
              alt={`Post ${id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfileContent;