import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import NotificationsPanel from "../../components/NotificationsPanel/NotificationsPanel.jsx";
import SearchPanel from "../../components/SearchPanel /SearchPanel.jsx";
import ExplorePanel from "../../components/ExplorePanel/ExplorePanel.jsx";
import MessagesPanel from "../../components/MessagesPanel/MessagesPanel.jsx";
import PostPanel from "../../components/CreatePostModal/CreatePostModal.jsx";
import EditProfilePanel from "../../components/EditProfilePanel/EditProfilePanel.jsx"; // 👈 Імпортуємо панель профілю

import styles from "./MainPage.module.css";
import sashaAvatar from "../../assets/avatars/sashaa.jpg";
import endIcon from "../../assets/icons/confirm.svg";

// Мокові дані для сповіщень
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

// Мокові дані для панелі пошуку
const mockSearchItems = [
  {
    id: "1",
    avatarSrc: "https://i.pravatar.cc/150?img=5",
    username: "user_one",
  },
  {
    id: "2",
    avatarSrc: "https://i.pravatar.cc/150?img=6",
    username: "user_two",
  },
  {
    id: "3",
    avatarSrc: "https://i.pravatar.cc/150?img=7",
    username: "another_user",
  },
  { id: "4", avatarSrc: sashaAvatar, username: "sashaa" },
];

const MainPage = () => {
  const { user } = useAuth();
  // Стан для контролю видимості панелі сповіщень.
  // За замовчуванням панель закрита.
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] =
    useState(false);
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);
  const [isExplorePanelOpen, setIsExplorePanelOpen] = useState(false);
  const [isMessagesPanelOpen, setIsMessagesPanelOpen] = useState(false);
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false);

  const toggleNotificationsPanel = () => {
    const opening = !isNotificationsPanelOpen;
    setIsNotificationsPanelOpen(opening);
    // Закриваємо інші панелі, якщо відкриваємо цю
    if (opening) {
      setIsSearchPanelOpen(false);
      setIsExplorePanelOpen(false);
      setIsMessagesPanelOpen(false);
      setIsProfilePanelOpen(false);
      setIsCreatePanelOpen(false);
    }
  };

  const toggleSearchPanel = () => {
    const opening = !isSearchPanelOpen;
    setIsSearchPanelOpen(opening);
    // Закриваємо інші панелі, якщо відкриваємо цю
    if (opening) {
      setIsNotificationsPanelOpen(false);
      setIsExplorePanelOpen(false);
      setIsMessagesPanelOpen(false);
      setIsProfilePanelOpen(false);
      setIsCreatePanelOpen(false);
    }
  };

  const toggleExplorePanel = () => {
    const opening = !isExplorePanelOpen;
    setIsExplorePanelOpen(opening);
    // Закриваємо інші панелі, якщо відкриваємо цю
    if (opening) {
      setIsNotificationsPanelOpen(false);
      setIsSearchPanelOpen(false);
      setIsMessagesPanelOpen(false);
      setIsProfilePanelOpen(false);
      setIsCreatePanelOpen(false);
    }
  };

  const toggleMessagesPanel = () => {
    const opening = !isMessagesPanelOpen;
    setIsMessagesPanelOpen(opening);
    // Закриваємо інші панелі, якщо відкриваємо цю
    if (opening) {
      setIsNotificationsPanelOpen(false);
      setIsSearchPanelOpen(false);
      setIsExplorePanelOpen(false);
      setIsProfilePanelOpen(false);
      setIsCreatePanelOpen(false);
    }
  };

  const toggleProfilePanel = () => {
    const opening = !isProfilePanelOpen;
    setIsProfilePanelOpen(opening);
    // Закриваємо інші панелі, якщо відкриваємо цю
    if (opening) {
      setIsNotificationsPanelOpen(false);
      setIsSearchPanelOpen(false);
      setIsExplorePanelOpen(false);
      setIsMessagesPanelOpen(false);
      setIsCreatePanelOpen(false);
    }
  };

  const toggleCreatePanel = () => {
    const opening = !isCreatePanelOpen;
    setIsCreatePanelOpen(opening);
    if (opening) {
      setIsNotificationsPanelOpen(false);
      setIsSearchPanelOpen(false);
      setIsExplorePanelOpen(false);
      setIsMessagesPanelOpen(false);
      setIsProfilePanelOpen(false);
    }
  };
  // Визначаємо, яка сторінка активна
  const activePage = isProfilePanelOpen
    ? "Profile"
    : isMessagesPanelOpen
    ? "Messages"
    : isExplorePanelOpen
    ? "Explore"
    : isCreatePanelOpen
    ? "Create"
    : isNotificationsPanelOpen
    ? "Notification"
    : "Home";

  const mockFeedContent = (
    <>
      <div className={styles.feedContainer}>
        {[...Array(10)].map((_, index) => (
          <div key={index} className={styles.postCard}>
            <div className={styles.postHeader}>
              <div className={styles.avatarContainer}>
                <a href="/profile" className={styles.profileLink}>
                  <img
                    src={sashaAvatar} // Тут використовується імпортована змінна
                    alt="profile avatar"
                    className={styles.profilePic}
                  />
                </a>
                {/* Заміна SVG-рамки на inline SVG з градієнтом */}
                <svg
                  className={styles.avatarFrame}
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                >
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#f09433", stopOpacity: 1 }}
                      />
                      <stop
                        offset="50%"
                        style={{ stopColor: "#e6683c", stopOpacity: 1 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#bc1888", stopOpacity: 1 }}
                      />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="48" strokeLinecap="round" />
                </svg>
              </div>
              <div className={styles.headerInfo}>
                <a href="/profile" className={styles.username}>
                  sashaa
                </a>
                <span className={styles.dot}>•</span>
                <span className={styles.postTime}>2 wek</span>
                <span className={styles.dot}>•</span>
                <button className={styles.followButton}>Follow</button>
              </div>
            </div>

            <img
              src={`https://picsum.photos/404/506?random=${index}`}
              alt={`Post ${index + 1}`}
              className={styles.postImage}
            />

            <div className={styles.postActions}>
              {/* Іконки: Лайк, Коментар (залишаємо inline SVG) */}
              <svg
                className={styles.actionIcon}
                aria-label="Like"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-6.12 8.424L12 21.878l-3.38-3.332C5.152 14.08 2.5 12.192 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175 2.489 1.175 3.33 0a4.21 4.21 0 0 1 3.675-1.941z"></path>
              </svg>
              <svg
                className={styles.actionIcon}
                aria-label="Comment"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"></path>
              </svg>
            </div>

            <div className={styles.postDetails}>
              <div className={styles.likes}>1,234 likes</div>
              <div className={styles.caption}>
                <a href="/profile" className={styles.captionUsername}>
                  Sashaa
                </a>
                <span style={{ fontStyle: "italic" }}>
                  𝘐𝘵’𝘴 𝒈𝒐𝘭𝒅𝒆𝘯, 𝘗𝘰𝘯𝘺𝘣𝘰𝘺!
                </span>
              </div>
              <div className={styles.commentPreview}>
                <span>heyyyyy</span>
                <span className={styles.moreComment}>| M...&nbsp;more</span>
              </div>
              <a href="#" className={styles.viewAllComments}>
                View all comments (732)
              </a>
            </div>
            <div className={styles.commentSeparator}></div>
          </div>
        ))}
      </div>
      {/* Імітація кінця стрічки */}
      <div className={styles.endOfFeedBlock}>
        <div className={styles.endIcon}>
          <img
            src={endIcon} // Тут використовується імпортована змінна
            alt="end icon"
          />
        </div>
        <h2 className={styles.endTitle}>You're All Caught Up</h2>
        <p className={styles.endText}>
          You've seen all the new posts from the last 7 days.
        </p>
      </div>
    </>
  );

  return (
    // 1. appContainer: Grid на десктопі (Sidebar + MainLayout)
    <div className={styles.appContainer}>
      {/* Sidebar: Залишається у першій колонці Grid. Передаємо функцію для відкриття/закриття сповіщень */}
      <Sidebar
        onNotificationClick={toggleNotificationsPanel}
        isNotificationsPanelOpen={isNotificationsPanelOpen}
        onSearchClick={toggleSearchPanel}
        isSearchPanelOpen={isSearchPanelOpen}
        onExploreClick={toggleExplorePanel}
        isExplorePanelOpen={isExplorePanelOpen}
        onMessagesClick={toggleMessagesPanel}
        isMessagesPanelOpen={isMessagesPanelOpen}
        onProfileClick={toggleProfilePanel}
        isProfilePanelOpen={isProfilePanelOpen}
        onCreateClick={toggleCreatePanel}
        isCreatePanelOpen={isCreatePanelOpen}
        activePage={activePage}
      />

      {/* 2. mainLayout: Права колонка Grid. Використовує Flex-контейнер для притискання футера */}
      <div className={styles.mainLayout}>
        {/* 3. contentArea: Займе весь простір, відштовхуючи Footer. Тут знаходиться сама стрічка */}
        <main className={styles.contentArea}>
          {/* Умовний рендеринг панелей */}
          {isProfilePanelOpen ? (
            <EditProfilePanel user={user} />
          ) : isMessagesPanelOpen ? (
            <MessagesPanel />
          ) : isExplorePanelOpen ? (
            <ExplorePanel />
          ) : isCreatePanelOpen ? (
            <PostPanel />
          ) : (
            mockFeedContent
          )}
        </main>
        {/* Footer: Притиснутий до низу mainLayout. На мобільному він буде після контенту */}
        <Footer />

        {/* Оверлей для панелі пошуку */}
        {isSearchPanelOpen && (
          <>
            {/* Затемнення фону (невидиме, для кліку) */}
            <div
              className={styles.backdrop}
              onClick={() => setIsSearchPanelOpen(false)}
            ></div>
            {/* Сама панель пошуку */}
            <div className={styles.searchOverlay}>
              <SearchPanel items={mockSearchItems} />
            </div>
          </>
        )}

        {/* Оверлей для панелі сповіщень */}
        {isNotificationsPanelOpen && (
          <>
            {/* Затемнення фону */}
            <div
              className={styles.backdrop}
              onClick={() => setIsNotificationsPanelOpen(false)}
            ></div>
            {/* Сама панель сповіщень */}
            <div className={styles.notificationsOverlay}>
              <NotificationsPanel notifications={mockNotifications} />
            </div>
          </>
        )}

        {/* Оверлей для панелі поста */}
        {isCreatePanelOpen && (
          <>
            {/* Затемнення фону (невидиме, для кліку) */}
            <div
              className={styles.backdrop}
              onClick={() => setIsCreatePanelOpen(false)}
            ></div>
            {/* Сама панель пошуку */}
            <div className={styles.searchOverlay}>
              <PostPanel />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default MainPage;
