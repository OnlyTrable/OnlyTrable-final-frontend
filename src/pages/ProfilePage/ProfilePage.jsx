import React from 'react';
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import UserProfileContent from "../../components/UserProfileContent/UserProfileContent.jsx";
import { useAuth } from "../../context/AuthContext.jsx"; // Використовуємо ваш контекст
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const { user, isLoading } = useAuth(); // Отримуємо актуального юзера

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to view your profile.</div>;

  // Формуємо об'єкт userData динамічно з даних MongoDB
  const dynamicUserData = {
    username: user.username,
    avatar: user.avatarUrl || user.avatar, // беремо актуальне посилання на фото
    fullName: user.fullName,
    bio: {
      about: user.about || "",
      website: user.website || ""
    }
  };

  return (
    <div className={styles.appContainer}>
      <Sidebar activePage="Profile" />
      <div className={styles.mainLayout}>
        <main className={styles.contentArea}>
          <UserProfileContent 
            isOwnProfile={true} 
            userData={dynamicUserData} 
          />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePage;