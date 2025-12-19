import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import NotificationsPanel from "../../components/NotificationsPanel/NotificationsPanel.jsx";
import SearchPanel from "../../components/SearchPanel /SearchPanel.jsx";
import ExplorePanel from "../../components/ExplorePanel/ExplorePanel.jsx";
import MessagesPanel from "../../components/MessagesPanel/MessagesPanel.jsx";
import ProfilePanel from "../../components/ProfilePanel/ProfilePanel.jsx";
import CreatePostPanel from "../../components/CreatePostModal/CreatePostModal.jsx";
import api from "../../api/axios.js";

import styles from "./MainPage.module.css";

const MainPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { conversationId } = useParams();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] =
    useState(false);
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);
  const [isExplorePanelOpen, setIsExplorePanelOpen] = useState(false);
  const [isMessagesPanelOpen, setIsMessagesPanelOpen] = useState(false);
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false);

  const [viewingUserId, setViewingUserId] = useState(null);

  // Завантаження постів з бази
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(res.data.posts || res.data || []);
      } catch (err) {
        // Помилки ігноруємо
      } finally {
        setLoading(false);
      }
    };

    if (!isMessagesPanelOpen && !isProfilePanelOpen && !isExplorePanelOpen) {
      fetchPosts();
    }
  }, [isMessagesPanelOpen, isProfilePanelOpen, isExplorePanelOpen]);

  useEffect(() => {
    if (location.pathname.startsWith("/direct")) {
      handleHomeClick();
      setIsMessagesPanelOpen(true);
    }
  }, [location.pathname, conversationId]);

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
    setViewingUserId(id || user?._id);
    setIsProfilePanelOpen(true);
  };

  const activePage = isProfilePanelOpen
    ? "Profile"
    : isMessagesPanelOpen
    ? "Messages"
    : isExplorePanelOpen
    ? "Explore"
    : "Home";

  return (
    <div className={styles.appContainer}>
      <Sidebar
        onHomeClick={handleHomeClick}
        onNotificationClick={() =>
          setIsNotificationsPanelOpen(!isNotificationsPanelOpen)
        }
        onSearchClick={() => setIsSearchPanelOpen(!isSearchPanelOpen)}
        onExploreClick={() => {
          handleHomeClick();
          setIsExplorePanelOpen(true);
        }}
        onMessagesClick={() => {
          handleHomeClick();
          setIsMessagesPanelOpen(true);
        }}
        onCreateClick={() => {
          handleHomeClick();
          setIsCreatePanelOpen(true);
        }}
        onProfileClick={() => handleOpenProfile()}
        activePage={activePage}
      />

      <div className={styles.mainLayout}>
        <main className={styles.contentArea}>
          {isProfilePanelOpen ? (
            <ProfilePanel targetUserId={viewingUserId} />
          ) : isMessagesPanelOpen ? (
            <MessagesPanel activeConversationId={conversationId} />
          ) : isExplorePanelOpen ? (
            <ExplorePanel />
          ) : isCreatePanelOpen ? (
            <CreatePostPanel isOpen={true} onClose={handleHomeClick} />
          ) : (
            <div className={styles.feedContainer}>
              {loading ? (
                <p style={{ color: "#8e8e8e" }}>Завантаження...</p>
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <article
                    key={post._id?.$oid || post._id}
                    className={styles.postCard}
                  >
                    <header className={styles.postHeader}>
                      <div className={styles.avatarContainer}>
                        <img
                          /* Перевіряємо, чи автор завантажився як об'єкт */
                          src={
                            post.author?.avatarUrl ||
                            "https://i.pravatar.cc/150"
                          }
                          className={styles.profilePic}
                          alt="avatar"
                        />
                      </div>
                      <div className={styles.headerInfo}>
                        <span className={styles.username}>
                          {post.author?.username || "Анонім"}
                        </span>
                        <span className={styles.dot}>•</span>
                        <span className={styles.postTime}>
                          {/* Обробка дати з формату $date */}
                          {new Date(
                            post.createdAt?.$date || post.createdAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </header>

                    {/* Відображення зображення (imageUrl з JSON) */}
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        className={styles.postImage}
                        alt="Post content"
                      />
                    )}

                    <div className={styles.postDetails}>
                      <div className={styles.caption}>
                        <span className={styles.captionUsername}>
                          {post.author?.username}
                        </span>
                        {/* В базі це поле називається content */}
                        {post.content}
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className={styles.endOfFeedBlock}>
                  <h2 className={styles.endTitle}>Стрічка порожня</h2>
                  <p className={styles.endText}>
                    Будьте першим, хто завантажить фото!
                  </p>
                </div>
              )}
            </div>
          )}
        </main>
        <Footer />

        {/* Оверлеї залишаються без змін */}
        {isSearchPanelOpen && (
          <>
            <div
              className={styles.backdrop}
              onClick={() => setIsSearchPanelOpen(false)}
            ></div>
            <div className={styles.searchOverlay}>
              <SearchPanel onUserClick={(id) => handleOpenProfile(id)} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainPage;
