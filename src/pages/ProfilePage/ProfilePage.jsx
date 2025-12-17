import React from 'react';
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import UserProfileContent from "../../components/UserProfileContent/UserProfileContent.jsx"; // Винесемо сам контент профілю
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  return (
    <div className={styles.appContainer}>
      <Sidebar activePage="Profile" />
      
      <div className={styles.mainLayout}>
        <main className={styles.contentArea}>
          <UserProfileContent />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePage;