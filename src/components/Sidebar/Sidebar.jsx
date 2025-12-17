import React from "react";
import styles from "./Sidebar.module.css";
import logo from "../../assets/icons/logo.svg";
import { useAuth } from "../../context/AuthContext.jsx"; // 👈 Імпортуємо хук
import {
  Home,
  Search,
  Compass,
  MessageCircle,
  Heart,
  SquarePlus,
  UserCircle,
  LogOut,
} from "lucide-react";

// Дані для пунктів меню
const navItems = [
  { Icon: Home, label: "Home", path: "/main" },
  { Icon: Search, label: "Search", path: "/search" },
  { Icon: Compass, label: "Explore", path: "/interest" },
  { Icon: MessageCircle, label: "Messages", path: "/messages" },
  { Icon: Heart, label: "Notification", path: "/notifications" },
  { Icon: SquarePlus, label: "Create", path: "/create" },
];

const Sidebar = ({
  onNotificationClick,
  isNotificationsPanelOpen,
  onSearchClick,
  isSearchPanelOpen,
  onExploreClick,
  isExplorePanelOpen,
  onMessagesClick,
  isMessagesPanelOpen,
  onProfileClick,
  isProfilePanelOpen,
  activePage,
}) => {
  // 👈 Отримуємо функцію logout з контексту
  const { logout } = useAuth();

  return (
    <div className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="ICHGRAM logo" className={styles.logo} />
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const { Icon, label, path } = item;

          const isNotificationItemActive =
            item.label === "Notification" && isNotificationsPanelOpen;
          const isSearchItemActive =
            item.label === "Search" && isSearchPanelOpen;
          const isExploreItemActive =
            item.label === "Explore" && isExplorePanelOpen;
          const isMessagesItemActive =
            item.label === "Messages" && isMessagesPanelOpen;
          const isPageItemActive =
            item.label === activePage &&
            !isNotificationsPanelOpen &&
            !isSearchPanelOpen &&
            !isExploreItemActive &&
            !isMessagesItemActive &&
            !isProfilePanelOpen;

          const isActive =
            isNotificationItemActive ||
            isSearchItemActive ||
            isExploreItemActive ||
            isMessagesItemActive ||
            isPageItemActive;

          const itemClasses = `${styles.navItem} ${
            isActive ? styles.activeNavItem : ""
          }`;

          return (
            <a
              key={label}
              href={path}
              className={itemClasses}
              // Додаємо обробники кліку для "Notification" та "Search"
              onClick={(e) => {
                if (item.label === "Notification") {
                  e.preventDefault();
                  onNotificationClick();
                }
                if (item.label === "Search") {
                  e.preventDefault();
                  onSearchClick();
                }
                if (item.label === "Explore") {
                  e.preventDefault();
                  onExploreClick();
                }
                if (item.label === "Messages") {
                  e.preventDefault();
                  onMessagesClick();
                }
              }}
            >
              {/* 👇 Керуємо заливкою та кольором контуру залежно від стану isActive */}
              <Icon
                className={styles.navIcon}
                fill={isActive ? "black" : "none"}
              />
              <span className={styles.navLabel}>{label}</span>
            </a>
          );
        })}

        <a
          href="/profile"
          className={`${styles.navItem} ${
            activePage === "Profile" ? styles.activeNavItem : ""
          }`}
        >
          <UserCircle
            className={styles.navIcon}
            fill={activePage === "Profile" ? "black" : "none"}
          />
          <span className={styles.navLabel}>Profile</span>
        </a>
      </nav>

      <div className={styles.footerNav}>
        {/* 👇 Оновлюємо обробник кліку */}
        <a
          href="#"
          className={styles.navItem}
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        >
          <LogOut className={styles.navIcon} />
          <span className={styles.navLabel}>Log out</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
