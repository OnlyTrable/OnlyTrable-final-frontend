import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserProfileContent.module.css";
import PostModal from "../PostModal/PostModal";
import { Link } from "react-router-dom";
import api from "../../api/axios.js";

const UserProfileContent = ({ isOwnProfile, userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Стан для динамічного оновлення кнопки та лічильника без перезавантаження сторінки
  const [isFollowing, setIsFollowing] = useState(userData.isFollowing || false);
  const [followersCount, setFollowersCount] = useState(userData.followersCount || 0);
  const [loading, setLoading] = useState(false);

  if (!userData) return null;

  // Функція для перемикання підписки
  const handleFollowToggle = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      // Викликаємо створений нами маршрут
      const { data } = await api.post(`/user/profile/${userData.id}/follow`);
      
      // Оновлюємо стани з відповіді бекенда
      setIsFollowing(data.isFollowing);
      setFollowersCount(data.followersCount);
    } catch (error) {
      console.error("Error toggling follow:", error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

// Функція для переходу в чат
  const handleMessageClick = async () => {
    setLoadingMessage(true);
    try {
      /** * Викликаємо POST /api/messages. 
       * На бекенді sendMessage знайде існуючу розмову або створить нову.
       */
      const response = await api.post("/messages", {
        recipientId: userData.id || userData._id, // Використовуємо ID з профілю
        content: "👋" // Початкове повідомлення для ініціалізації розмови
      });

      const { conversationId } = response.data;

      // Перенаправляємо користувача на сторінку повідомлень з ID розмови
      navigate(`/direct/t/${conversationId}`);
    } catch (error) {
      console.error("Error starting conversation:", error);
      // Якщо розмова вже була і ми просто хочемо її знайти, 
      // можна додати логіку отримання списку розмов
      navigate("/direct/inbox");
    } finally {
      setLoadingMessage(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.avatarSection}>
          <img
            src={userData.avatar}
            alt={`${userData.username} avatar`}
            className={styles.avatar}
          />
        </div>

        <div className={styles.infoSection}>
          <div className={styles.topRow}>
            <h2 className={styles.username}>{userData.username}</h2>

            {isOwnProfile ? (
              <div className={styles.actions}>
                <Link to="/editProfile">
                  <button className={styles.editBtn}>Edit profile</button>
                </Link>
              </div>
            ) : (
              <div className={styles.actions}>
                {/* Додано row-контейнер, як ти налаштував у стилях */}
                <div className={styles.actionsOther} style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                  <button 
                    onClick={handleFollowToggle}
                    disabled={loading}
                    className={isFollowing ? styles.unfollowBtn : styles.followBtn}
                  >
                    {loading ? "..." : (isFollowing ? "Unfollow" : "Follow")}
                  </button>
                  <button 
                    className={styles.messageBtn} 
                    onClick={handleMessageClick}
                    disabled={loadingMessage}
                  >
                    {loadingMessage ? "Connecting..." : "Message"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className={styles.stats}>
            <span>
              <strong>{userData.postsCount || 0}</strong> posts
            </span>
            <span>
              {/* Використовуємо локальний стан лічильника, щоб він змінювався миттєво */}
              <strong>{followersCount.toLocaleString()}</strong> followers
            </span>
            <span>
              <strong>{userData.followingCount || 0}</strong> following
            </span>
          </div>

          <div className={styles.bio}>
            <p className={styles.name}>{userData.fullName}</p>
            <p style={{ whiteSpace: "pre-line" }}>{userData.bio?.about}</p>
            {userData.bio?.website && (
              <a
                href={
                  userData.bio.website.startsWith("http")
                    ? userData.bio.website
                    : `https://${userData.bio.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {userData.bio.website}
              </a>
            )}
          </div>
        </div>
      </header>

      <div className={styles.postsGrid}>
        {/* Тут можна буде мапити реальні пости, коли додамо логіку їх отримання */}
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <div
            key={id}
            className={styles.postBox}
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={`https://picsum.photos/404/506?random=${id}`}
              alt="post"
            />
          </div>
        ))}
      </div>

      <PostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default UserProfileContent;