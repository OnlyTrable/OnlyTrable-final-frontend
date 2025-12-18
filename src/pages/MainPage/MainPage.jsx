import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import NotificationsPanel from "../../components/NotificationsPanel/NotificationsPanel.jsx";
import SearchPanel from "../../components/SearchPanel /SearchPanel.jsx";
import ExplorePanel from '../../components/ExplorePanel/ExplorePanel.jsx';
import MessagesPanel from '../../components/MessagesPanel/MessagesPanel.jsx';
import EditProfilePanel from '../../components/EditProfilePanel/EditProfilePanel.jsx';

// Використовуємо CreatePostModal, але імпортуємо як CreatePostPanel для логіки
import CreatePostPanel from '../../components/CreatePostModal/CreatePostModal.jsx'; 

import styles from "./MainPage.module.css";
import sashaAvatar from "../../assets/avatars/sashaa.jpg";
import endIcon from "../../assets/icons/confirm.svg";

const mockNotifications = [
  {
    avatarSrc: "https://i.pravatar.cc/150?img=1",
    username: "john.doe",
    actionText: "liked your photo.",
    timeAgo: "1h",
    thumbnailSrc: "https://picsum.photos/id/101/50/50",
  },
  {
    avatarSrc: "https://i.pravatar.cc/150?img=2",
    username: "jane.smith",
    actionText: "started following you.",
    timeAgo: "3h",
    thumbnailSrc: "https://picsum.photos/id/102/50/50",
  },
];

const mockSearchItems = [
  { id: '1', avatarSrc: 'https://i.pravatar.cc/150?img=5', username: 'user_one' },
  { id: '2', avatarSrc: 'https://i.pravatar.cc/150?img=6', username: 'user_two' },
  { id: '3', avatarSrc: 'https://i.pravatar.cc/150?img=7', username: 'another_user' },
  { id: '4', avatarSrc: sashaAvatar, username: 'sashaa' },
];

const MainPage = () => {
  const { user } = useAuth();
  
  // Всі стани панелей
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);
  const [isExplorePanelOpen, setIsExplorePanelOpen] = useState(false);
  const [isMessagesPanelOpen, setIsMessagesPanelOpen] = useState(false);
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false); 

  // Функція Home — закриває абсолютно все
  const handleHomeClick = () => {
    setIsNotificationsPanelOpen(false);
    setIsSearchPanelOpen(false);
    setIsExplorePanelOpen(false);
    setIsMessagesPanelOpen(false);
    setIsProfilePanelOpen(false);
    setIsCreatePanelOpen(false);
  };

  // Універсальний перемикач, який закриває інші панелі при відкритті нової
  const togglePanel = (setter) => {
    handleHomeClick(); // Спочатку все закриваємо
    setter(true);      // Відкриваємо потрібне
  };

  const activePage = isProfilePanelOpen ? 'Profile' :
                     isMessagesPanelOpen ? 'Messages' : 
                     isExplorePanelOpen ? 'Explore' : 
                     isCreatePanelOpen ? 'Create' : 'Home';

  const mockFeedContent = (
    <div className={styles.feedContainer}>
      {[...Array(10)].map((_, index) => (
        <div key={index} className={styles.postCard}>
          <div className={styles.postHeader}>
            <div className={styles.avatarContainer}>
              {/* SPA-клік замість href="/profile" */}
              <div onClick={() => togglePanel(setIsProfilePanelOpen)} className={styles.profileLink} style={{cursor: 'pointer'}}>
                <img src={sashaAvatar} alt="avatar" className={styles.profilePic} />
              </div>
              <svg className={styles.avatarFrame} viewBox="0 0 100 100" fill="none" stroke="url(#gradient)" strokeWidth="3">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#f09433" }} />
                    <stop offset="100%" style={{ stopColor: "#bc1888" }} />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" />
              </svg>
            </div>
            <div className={styles.headerInfo}>
              <span onClick={() => togglePanel(setIsProfilePanelOpen)} className={styles.username} style={{cursor: 'pointer'}}>sashaa</span>
              <span className={styles.dot}>•</span>
              <span className={styles.postTime}>2 wek</span>
            </div>
          </div>

          <img src={`https://picsum.photos/404/506?random=${index}`} alt="Post" className={styles.postImage} />

          <div className={styles.postDetails}>
            <div className={styles.likes}>1,234 likes</div>
            <div className={styles.caption}>
              <span onClick={() => togglePanel(setIsProfilePanelOpen)} className={styles.captionUsername} style={{cursor: 'pointer'}}>Sashaa</span>
              <span> 𝘐𝘵’𝘴 𝒈𝒐𝘭𝒅𝒆𝘯, 𝘗𝘰𝘯𝘺𝘣𝘰𝘺!</span>
            </div>
          </div>
          <div className={styles.commentSeparator}></div>
        </div>
      ))}
      <div className={styles.endOfFeedBlock}>
        <div className={styles.endIcon}><img src={endIcon} alt="end" /></div>
        <h2 className={styles.endTitle}>You're All Caught Up</h2>
      </div>
    </div>
  );

  return (
    <div className={styles.appContainer}>
      <Sidebar
        onHomeClick={handleHomeClick}
        onNotificationClick={() => togglePanel(setIsNotificationsPanelOpen)}
        isNotificationsPanelOpen={isNotificationsPanelOpen}
        onSearchClick={() => togglePanel(setIsSearchPanelOpen)}
        isSearchPanelOpen={isSearchPanelOpen}
        onExploreClick={() => togglePanel(setIsExplorePanelOpen)}
        isExplorePanelOpen={isExplorePanelOpen}
        onMessagesClick={() => togglePanel(setIsMessagesPanelOpen)}
        isMessagesPanelOpen={isMessagesPanelOpen}
        onCreateClick={() => togglePanel(setIsCreatePanelOpen)}
        isCreatePanelOpen={isCreatePanelOpen}
        onProfileClick={() => togglePanel(setIsProfilePanelOpen)}
        isProfilePanelOpen={isProfilePanelOpen}
        activePage={activePage}
      />

      <div className={styles.mainLayout}>
        <main className={styles.contentArea}>
          {
            isProfilePanelOpen ? <EditProfilePanel user={user} /> :
            isMessagesPanelOpen ? <MessagesPanel /> :
            isExplorePanelOpen ? <ExplorePanel /> :
            isCreatePanelOpen ? <CreatePostPanel isOpen={true} onClose={handleHomeClick} /> : 
            mockFeedContent
          }
        </main>
        <Footer />

        {isSearchPanelOpen && (
          <>
            <div className={styles.backdrop} onClick={handleHomeClick}></div>
            <div className={styles.searchOverlay}><SearchPanel items={mockSearchItems} /></div>
          </>
        )}

        {isNotificationsPanelOpen && (
          <>
            <div className={styles.backdrop} onClick={handleHomeClick}></div>
            <div className={styles.notificationsOverlay}><NotificationsPanel notifications={mockNotifications} /></div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainPage;