import React from 'react';
import styles from './UserProfile.module.css';
import avatarPlaceholder from "../../assets/avatars/sashaa.jpg"; // Ваш шлях

const UserProfile = ({ user }) => {
  return (
    <div className={styles.profileContainer}>
      <header className={styles.header}>
        <div className={styles.avatarSection}>
          <img src={avatarPlaceholder} alt="User Avatar" className={styles.avatar} />
        </div>
        
        <section className={styles.detailsSection}>
          <div className={styles.topRow}>
            <h2 className={styles.username}>itcareerhub</h2>
            <button className={styles.followBtn}>Follow</button>
            <button className={styles.messageBtn}>Message</button>
          </div>
          
          <div className={styles.statsRow}>
            <span><strong>129</strong> posts</span>
            <span><strong>9 993</strong> followers</span>
            <span><strong>59</strong> following</span>
          </div>
          
          <div className={styles.bio}>
            <p className={styles.fullName}>itcareerhub</p>
            <p>• Гарантия помощи с трудоустройством в ведущие IT-компании</p>
            <p>• Выпускники зарабатывают от 45к евро</p>
            <a href="https://bit.ly/3rpiIbh" className={styles.link}>bit.ly/3rpiIbh</a>
          </div>
        </section>
      </header>

      <div className={styles.gridDivider}></div>

      <div className={styles.postsGrid}>
        {/* Можна додати реальні пости пізніше */}
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <div key={id} className={styles.postItem}>
            <div className={styles.placeholderImg}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;