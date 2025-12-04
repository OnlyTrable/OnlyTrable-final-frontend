import React from 'react';
import styles from './Sidebar.module.css';
import logo from '../../assets/icons/logo.svg';
import HomeIcon from '../../assets/icons/home.svg'; // +
import SearchIcon from '../../assets/icons/search.svg'; // +
import ExploreIcon from '../../assets/icons/explore.svg'; // +
import MessagesIcon from '../../assets/icons/messages.svg'; // +
import NotificationIcon from '../../assets/icons/notificaton.svg'; 
import ProfileIcon from '../../assets/icons/profile.svg'; // +
import CreateIcon from '../../assets/icons/create.svg';

// Дані для пунктів меню
const navItems = [
  { icon: HomeIcon, label: 'Home', path: '/main' },
  { icon: SearchIcon, label: 'Search', path: '/search' },
  { icon: ExploreIcon, label: 'Explore', path: '/interest' },
  { icon: MessagesIcon, label: 'Messages', path: '/messages' },
  { icon: NotificationIcon, label: 'Notification', path: '/notifications' },
  { icon: CreateIcon, label: 'Create', path: '/create' },
];

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="ICHGRAM logo" className={styles.logo} />
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <a key={item.label} href={item.path} className={styles.navItem}>
            <img src={item.icon} alt={`${item.label} icon`} className={styles.navIcon} />
            <span className={styles.navLabel}>{item.label}</span>
          </a>
        ))}
        
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