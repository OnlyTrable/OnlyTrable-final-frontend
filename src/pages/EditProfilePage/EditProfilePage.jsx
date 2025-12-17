import React from 'react';
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import EditProfilePanel from "../../components/EditProfilePanel/EditProfilePanel.jsx";
import { useAuth } from "../../context/AuthContext.jsx"; // Беремо дані юзера
import styles from "./EditProfilePage.module.css";

const EditProfilePage = () => {
  const { user } = useAuth(); // Отримуємо поточного юзера з контексту

  return (
    <div className={styles.appContainer}>
      <Sidebar activePage="Profile" />
      
      <div className={styles.mainLayout}>
        <main className={styles.contentArea}>
          {/* Передаємо об'єкт користувача в панель */}
          <EditProfilePanel user={user} />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default EditProfilePage;