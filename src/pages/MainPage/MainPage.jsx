import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import NotificationsPanel from "../../components/NotificationsPanel/NotificationsPanel.jsx";
import SearchPanel from "../../components/SearchPanel /SearchPanel.jsx";
import ExplorePanel from '../../components/ExplorePanel/ExplorePanel.jsx';
import MessagesPanel from '../../components/MessagesPanel/MessagesPanel.jsx';
import ProfilePanel from '../../components/ProfilePanel/ProfilePanel.jsx'; 
import CreatePostPanel from '../../components/CreatePostModal/CreatePostModal.jsx'; 

import styles from "./MainPage.module.css";
import endIcon from "../../assets/icons/confirm.svg";

// Тимчасові дані, щоб панелі не падали
const mockNotifications = []; 

const MainPage = () => {
  const { user } = useAuth();
  
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);
  const [isExplorePanelOpen, setIsExplorePanelOpen] = useState(false);
  const [isMessagesPanelOpen, setIsMessagesPanelOpen] = useState(false);
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false); 

  const [viewingUserId, setViewingUserId] = useState(null);

  const handleHomeClick = () => {
    setIsNotificationsPanelOpen(false);
    setIsSearchPanelOpen(false);
    setIsExplorePanelOpen(false);
    setIsMessagesPanelOpen(false);
    setIsProfilePanelOpen(false);
    setIsCreatePanelOpen(false);
    setViewingUserId(null);
  };

  const handleOpenProfile = (id = null) => {
    handleHomeClick();
    // Якщо ID прийшов з пошуку — ставимо його, якщо ні — ставимо свій ID
    setViewingUserId(id || user._id); 
    setIsProfilePanelOpen(true);
  };

  const activePage = isProfilePanelOpen ? 'Profile' :
                     isMessagesPanelOpen ? 'Messages' : 
                     isExplorePanelOpen ? 'Explore' : 'Home';

  return (
    <div className={styles.appContainer}>
      <Sidebar
        onHomeClick={handleHomeClick}
        onNotificationClick={() => setIsNotificationsPanelOpen(!isNotificationsPanelOpen)} // Не закриваємо все, просто тоглимо
        onSearchClick={() => setIsSearchPanelOpen(!isSearchPanelOpen)} // Пошук тепер — оверлей
        onExploreClick={() => { handleHomeClick(); setIsExplorePanelOpen(true); }}
        onMessagesClick={() => { handleHomeClick(); setIsMessagesPanelOpen(true); }}
        onCreateClick={() => { handleHomeClick(); setIsCreatePanelOpen(true); }}
        onProfileClick={() => handleOpenProfile()} 
        activePage={activePage}
      />

      <div className={styles.mainLayout}>
        <main className={styles.contentArea}>
          {
            isProfilePanelOpen ? <ProfilePanel targetUserId={viewingUserId} /> :
            isMessagesPanelOpen ? <MessagesPanel /> :
            isExplorePanelOpen ? <ExplorePanel /> :
            isCreatePanelOpen ? <CreatePostPanel isOpen={true} onClose={handleHomeClick} /> : 
            <div className={styles.feedContainer}>
                <h1 style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>Feed</h1>
                {/* Твій контент стрічки */}
            </div>
          }
        </main>
        <Footer />

        {/* ПАНЕЛІ-ОВЕРЛЕЇ (випливають збоку/зверху) */}
        
        {isSearchPanelOpen && (
          <>
            <div className={styles.backdrop} onClick={() => setIsSearchPanelOpen(false)}></div>
            <div className={styles.searchOverlay}>
              <SearchPanel onUserClick={(id) => handleOpenProfile(id)} />
            </div>
          </>
        )}

        {isNotificationsPanelOpen && (
          <>
            <div className={styles.backdrop} onClick={() => setIsNotificationsPanelOpen(false)}></div>
            <div className={styles.notificationsOverlay}>
                {/* Передаємо хоча б порожній масив, щоб не вбивати сторінку */}
                <NotificationsPanel notifications={mockNotifications} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainPage;