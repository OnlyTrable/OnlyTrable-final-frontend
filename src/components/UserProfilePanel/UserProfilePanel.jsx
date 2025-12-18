import React, { useState, useEffect } from 'react';
import api from "../../api/axios.js";
import { useAuth } from "../../context/AuthContext.jsx";
import UserProfileContent from "../UserProfileContent/UserProfileContent.jsx";
import EditProfilePanel from "../EditProfilePanel/EditProfilePanel.jsx";

const UserProfilePanel = ({ targetUserId }) => {
  const { user: currentUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Використовуємо наш новий універсальний маршрут
        // Якщо targetUserId немає, запит йде на /user/profile (власний)
        const url = targetUserId ? `/user/profile/${targetUserId}` : `/user/profile`;
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

  if (loading) return <div>Loading profile...</div>;
  if (!profileData) return <div>User not found</div>;

  // Трансформуємо дані для UserProfileContent, як це було в ProfilePage
  const formattedData = {
    username: profileData.username,
    avatar: profileData.avatarUrl || profileData.avatar,
    fullName: profileData.fullName,
    bio: {
      about: profileData.about || "",
      website: profileData.website || ""
    }
  };

  return (
    <div>
      {isOwner ? (
        // Якщо це мій профіль — показуємо форму редагування
        <EditProfilePanel user={profileData} />
      ) : (
        // Якщо чужий — тільки перегляд
        <UserProfileContent isOwnProfile={false} userData={formattedData} />
      )}
    </div>
  );
};

export default UserProfilePanel;