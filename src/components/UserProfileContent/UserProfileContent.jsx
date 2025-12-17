import React, { useState } from "react";
import styles from "./UserProfileContent.module.css";
import avatar from "../../assets/avatars/ich.png";
import PostModal from '../PostModal/PostModal'; // Імпортуємо модалку

const UserProfileContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.avatarSection}>
          <img src={avatar} alt="itcareerhub" className={styles.avatar} />
        </div>

        <div className={styles.infoSection}>
          <div className={styles.topRow}>
            <h2 className={styles.username}>itcareerhub</h2>
            <button className={styles.followBtn}>Follow</button>
            <button
              className={styles.messageBtn}
              onClick={() => setIsModalOpen(true)}
            >
              Message
            </button>
          </div>
          <PostModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            username="itcareerhub"
          />
          <div className={styles.stats}>
            <span>
              <strong>129</strong> posts
            </span>
            <span>
              <strong>9 993</strong> followers
            </span>
            <span>
              <strong>59</strong> following
            </span>
          </div>

          <div className={styles.bio}>
            <p className={styles.name}>itcareerhub</p>
            <p>• Гарантия помощи с трудоустройством в ведущие IT-компании</p>
            <p>• Выпускники зарабатывают от 45к евро</p>
            <a href="https://bit.ly/3rpiIbh" className={styles.link}>
              bit.ly/3rpiIbh
            </a>
          </div>
        </div>
      </header>

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
