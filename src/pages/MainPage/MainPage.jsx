import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./MainPage.module.css";
// Оригінальні імпорти локальних асетів (sashaAvatar, FrameSvg, confirmIcon)
// видалено, щоб уникнути помилок компіляції 'Could not resolve'.
// Замість них використовуються inline SVG та публічні URL-адреси.

const MainPage = () => {
  // Тимчасовий заглушка для вмісту стрічки, щоб показати роботу прокрутки та футера

  const mockFeedContent = (
    <>
      <div className={styles.feedContainer}>
        {/* Імітація 10 постів для створення довгої сторінки */}
        {[...Array(10)].map((_, index) => (
          <div key={index} className={styles.postCard}>
            <div className={styles.postHeader}>
              <div className={styles.avatarContainer}>
                <a href="/profile" className={styles.profileLink}>
                  {/* Заміна локального аватара на плейсхолдер URL */}
                  <img
                    src={`https://placehold.co/27x27/f09433/ffffff?text=A`} 
                    alt="profile avatar"
                    className={styles.profilePic}
                  />
                </a>
                {/* Заміна SVG-рамки на inline SVG з градієнтом */}
                <svg className={styles.avatarFrame} viewBox="0 0 100 100" fill="none" stroke="url(#gradient)" strokeWidth="3">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: "#f09433", stopOpacity: 1}} />
                      <stop offset="50%" style={{stopColor: "#e6683c", stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: "#bc1888", stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="48" strokeLinecap="round" />
                </svg>
              </div>
              <div className={styles.headerInfo}>
                <a href="/profile" className={styles.username}>
                  user_name_{index + 1}
                </a>
                <span className={styles.dot}>•</span>
                <span className={styles.postTime}>2 wek</span>
                <span className={styles.dot}>•</span>
                <button className={styles.followButton}>Follow</button>
              </div>
              {/* Іконка "більше" (опціонально) */}
              <div className={styles.moreOptions}>
                <svg
                  aria-label="More options"
                  fill="currentColor"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <circle cx="12" cy="12" r="1.5"></circle>
                  <circle cx="6" cy="12" r="1.5"></circle>
                  <circle cx="18" cy="12" r="1.5"></circle>
                </svg>
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
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-6.12 8.424L12 21.878l-3.38-3.332C5.152 14.08 2.5 12.192 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175 2.489 1.175 3.33 0a4.21 4.21 0 0 1 3.675-1.941z"></path>
              </svg>
              <svg
                className={styles.actionIcon}
                aria-label="Comment"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"></path>
              </svg>
            </div>

            <div className={styles.postDetails}>
              <div className={styles.likes}>1,234 likes</div>
              <div className={styles.caption}>
                <a href="/profile" className={styles.captionUsername}>
                  user_name_{index + 1}
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
          {/* Заміна confirmIcon на inline SVG (проста галочка) */}
          <svg
            className={styles.endIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
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
      {/* Sidebar: Залишається у першій колонці Grid */}
      <Sidebar />

      {/* 2. mainLayout: Права колонка Grid. Використовує Flex-контейнер для притискання футера */}
      <div className={styles.mainLayout}>
        {/* 3. contentArea: Займе весь простір, відштовхуючи Footer. Тут знаходиться сама стрічка */}
        <div className={styles.contentArea}>{mockFeedContent}</div>

        {/* Footer: Притиснутий до низу mainLayout. На мобільному він буде після контенту */}
        <Footer />
      </div>
    </div>
  );
};
export default MainPage;