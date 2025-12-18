import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Для отримання ID з URL
import api from "../../api/axios.js"; // Ваш екземпляр axios
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import UserProfileContent from "../../components/UserProfileContent/UserProfileContent.jsx";
import styles from "./OtherProfilePage.module.css";

const OtherProfilePage = () => {
  const { userId } = useParams(); // Отримуємо ID користувача з параметрів шляху
  const [otherUserData, setOtherUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        // Запит до вашого бекенду (MongoDB) за даними конкретного користувача
        const response = await api.get(`/user/${userId}`); 
        const user = response.data.user;

        // Формуємо об'єкт userData у форматі, який очікує UserProfileContent
        setOtherUserData({
          username: user.username,
          avatar: user.avatarUrl || user.avatar,
          fullName: user.fullName,
          bio: {
            about: user.about || "",
            website: user.website || ""
          }
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!otherUserData) return <div>User not found</div>;

  return (
    <div className={styles.appContainer}>
      <Sidebar activePage="Profile" />
      
      <div className={styles.mainLayout}>
        <main className={styles.contentArea}>
          {/* Тепер otherUserData визначено і приходить з БД */}
          <UserProfileContent isOwnProfile={false} userData={otherUserData} />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default OtherProfilePage;