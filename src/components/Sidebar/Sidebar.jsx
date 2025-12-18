import React from "react";
import styles from "./Sidebar.module.css";
import logo from "../../assets/icons/logo.svg";
import { useAuth } from "../../context/AuthContext.jsx";
import { useSidebarNavigation } from "../../hooks/useSidebarNavigation.js";
import {
  Home,
  UserCircle,
  LogOut,
} from "lucide-react";

const Sidebar = ({
  onHomeClick,         // Функція для скидання станів у MainPage
  onNotificationClick,
  isNotificationsPanelOpen,
  onSearchClick,
  isSearchPanelOpen,
  onExploreClick,
  isExplorePanelOpen,
  onMessagesClick = () => {},
  isMessagesPanelOpen,
  onCreateClick,      // Тепер це відкриває панель у MainPage
  isCreatePanelOpen,  
  onProfileClick,     // Відкриває панель профілю у MainPage
  isProfilePanelOpen, 
  activePage,
}) => {
  const { logout } = useAuth();

  // Отримуємо список елементів через твій хук
  const { navItems } = useSidebarNavigation({
    activePage,
    isNotificationsPanelOpen, onNotificationClick,
    isSearchPanelOpen, onSearchClick,
    isExplorePanelOpen, onExploreClick,
    isMessagesPanelOpen, onMessagesClick,
    isCreateModalOpen: isCreatePanelOpen, 
    onToggleCreateModal: onCreateClick,   
  });

  return (
    <div className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="ICHGRAM logo" className={styles.logo} />
      </div>

      <nav className={styles.nav}>
        {/* 1. HOME: Спеціальна логіка повернення до стрічки */}
        <div
          className={`${styles.navItem} ${
            activePage === "Home" && !isSearchPanelOpen && !isNotificationsPanelOpen 
            ? styles.activeNavItem : ""
          }`}
          onClick={() => {
            if (window.location.pathname === "/main") {
              onHomeClick(); // Скидаємо всі панелі в MainPage
            } else {
              window.location.href = "/main"; // Перехід, якщо ми на іншій сторінці
            }
          }}
        >
          <Home 
            className={styles.navIcon} 
            fill={activePage === "Home" ? "black" : "none"} 
          />
          <span className={styles.navLabel}>Home</span>
        </div>

        {/* 2. ІНШІ ПУНКТИ: Search, Explore, Messages, Notifications, Create */}
        {navItems
          .filter(item => item.label !== "Home") // Уникаємо дублювання Home
          .map((item) => {
            const { Icon, label, isActive, onClick } = item;
            return (
              <div
                key={label}
                className={`${styles.navItem} ${isActive ? styles.activeNavItem : ""}`}
                onClick={onClick}
              >
                <Icon
                  className={styles.navIcon}
                  fill={isActive ? "black" : "none"}
                />
                <span className={styles.navLabel}>{label}</span>
              </div>
            );
          })}

        {/* 3. PROFILE: Окрема SPA-логіка без перезавантаження */}
        <div
          className={`${styles.navItem} ${
            isProfilePanelOpen || activePage === "Profile" ? styles.activeNavItem : ""
          }`}
          onClick={onProfileClick}
        >
          <UserCircle
            className={styles.navIcon}
            fill={(isProfilePanelOpen || activePage === "Profile") ? "black" : "none"}
          />
          <span className={styles.navLabel}>Profile</span>
        </div>
      </nav>

      <div className={styles.footerNav}>
        {/* 4. LOGOUT: Чистий виклик функції з контексту */}
        <div 
          className={styles.navItem} 
          onClick={logout} 
        >
          <LogOut className={styles.navIcon} />
          <span className={styles.navLabel}>Log out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;