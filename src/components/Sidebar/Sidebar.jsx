import React from 'react';
import styles from './Sidebar.module.css';
import logo from '../../assets/icons/logo.svg';
import HomeIcon from '../../assets/icons/home.svg'; 
import SearchIcon from '../../assets/icons/search.svg';
import ExploreIcon from '../../assets/icons/explore.svg';
import MessagesIcon from '../../assets/icons/messages.svg';
import NotificationIcon from '../../assets/icons/notificaton.svg';
import ProfileIcon from '../../assets/icons/profile.svg';
import CreateIcon from '../../assets/icons/create.svg';

// Імпортуємо активні іконки
import HomeActiveIcon from '../../assets/icons/home-black.svg';
import SearchActiveIcon from '../../assets/icons/search-black.svg';
import ExploreActiveIcon from '../../assets/icons/explore-black.svg';
import MessagesActiveIcon from '../../assets/icons/messages-black.svg';
import NotificationActiveIcon from '../../assets/icons/notificaton-black.svg';

// Дані для пунктів меню
const navItems = [
  // Оновлюємо структуру, додаючи activeIcon
  { icon: HomeIcon, activeIcon: HomeActiveIcon, label: 'Home', path: '/main' },
  { icon: SearchIcon, activeIcon: SearchActiveIcon, label: 'Search', path: '/search' },
  { icon: ExploreIcon, activeIcon: ExploreActiveIcon, label: 'Explore', path: '/interest' },
  { icon: MessagesIcon, activeIcon: MessagesActiveIcon, label: 'Messages', path: '/messages' },
  { icon: NotificationIcon, activeIcon: NotificationActiveIcon, label: 'Notification', path: '/notifications' },
  { icon: CreateIcon, activeIcon: CreateIcon, label: 'Create', path: '/create' }, // Для Create поки що одна іконка
];

const Sidebar = ({ onNotificationClick, isNotificationsPanelOpen, onSearchClick, isSearchPanelOpen, activePage }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="ICHGRAM logo" className={styles.logo} />
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          // Логіка визначення активного стану:
          // 1. "Notification" активний, коли його панель відкрита.
          // 2. "Search" активний, коли його панель відкрита.
          // 3. Інший пункт (напр. "Home") активний, якщо він відповідає `activePage` І обидві панелі (пошуку та сповіщень) закриті.
          const isNotificationItemActive = item.label === 'Notification' && isNotificationsPanelOpen;
          const isSearchItemActive = item.label === 'Search' && isSearchPanelOpen;
          const isPageItemActive = item.label === activePage && !isNotificationsPanelOpen && !isSearchPanelOpen;

          const isActive = isNotificationItemActive || isSearchItemActive || isPageItemActive;

          const itemClasses = `${styles.navItem} ${isActive ? styles.activeNavItem : ''}`;
          const iconSrc = isActive ? item.activeIcon : item.icon;

          return (
            <a
              key={item.label}
              href={item.path}
              className={itemClasses}
              // Додаємо обробники кліку для "Notification" та "Search"
              onClick={(e) => {
                if (item.label === 'Notification') {
                  e.preventDefault(); onNotificationClick();
                }
                if (item.label === 'Search') {
                  e.preventDefault(); onSearchClick();
                }
              }}
            >
              <img src={iconSrc} alt={`${item.label} icon`} className={styles.navIcon} />
              <span className={styles.navLabel}>{item.label}</span>
            </a>
          );
        })}
        
        <a href="/profile" className={styles.navItem}>
          <div className={styles.profileIcon}>
            <img src={ProfileIcon} alt="Profile" className={styles.profileIcon} />
          </div>
          <span className={styles.navLabel}>Profile</span>
        </a>

      </nav>
    </div>
  );
};

export default Sidebar;