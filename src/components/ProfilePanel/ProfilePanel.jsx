import React, { useState, useEffect } from 'react';
import api from "../../api/axios.js";
import { useAuth } from "../../context/AuthContext.jsx";
import UserProfileContent from "../UserProfileContent/UserProfileContent.jsx";
import EditProfilePanelContent from "../EditProfilePanel/EditProfilePanel.jsx"; // Твій існуючий код редагування
import styles from "./ProfilePanel.module.css";

const ProfilePanel = ({ targetUserId }) => {
  const { user: currentUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Якщо targetUserId передано — запитуємо його, якщо ні — свій профіль
        const url = targetUserId ? `/user/profile/${targetUserId}` : `/user/profile`;
        console.log(url);
        const { data } = await api.get(url);
        
        setProfileData(data.user);
        setIsOwner(data.isOwner);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [targetUserId]);

  if (loading) return <div className={styles.loader}>Завантаження профілю...</div>;
  if (!profileData) return <div className={styles.error}>Користувача не знайдено</div>;

  // Форматуємо дані для компонента перегляду
  const viewData = {
    username: profileData.username,
    avatar: profileData.avatarUrl || profileData.avatar,
    fullName: profileData.fullName,
    bio: {
      about: profileData.about || "",
      website: profileData.website || ""
    }
  };

  return (
    <div className={styles.panelContainer}>
      {isOwner ? (
        // Якщо я власник — можу редагувати
        <EditProfilePanelContent user={profileData} />
      ) : (
        // Якщо ні — тільки перегляд
        <UserProfileContent isOwnProfile={false} userData={viewData} />
      )}
    </div>
  );
};

export default ProfilePanel;