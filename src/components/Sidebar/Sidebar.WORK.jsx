import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import logo from "../../assets/icons/logo.svg";
import { useAuth } from "../../context/AuthContext.jsx";
import CreatePostModal from "../CreatePostModal/CreatePostModal.jsx";
import { useSidebarNavigation } from "../../hooks/useSidebarNavigation.js";
import {
  UserCircle,
  LogOut,
} from "lucide-react";

const Sidebar = ({
  onNotificationClick,
  isNotificationsPanelOpen,
  onSearchClick,
  isSearchPanelOpen,
  onExploreClick,
  isExplorePanelOpen,
  onMessagesClick = () => {},
  isMessagesPanelOpen,
  activePage,
}) => {
  const { logout } = useAuth();
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const { navItems } = useSidebarNavigation({
    activePage,
    isNotificationsPanelOpen, onNotificationClick,
    isSearchPanelOpen, onSearchClick,
    isExplorePanelOpen, onExploreClick,
    isMessagesPanelOpen, onMessagesClick,
    isCreateModalOpen, 
    onToggleCreateModal: () => setCreateModalOpen(prev => !prev),
  });

  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="ICHGRAM logo" className={styles.logo} />
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const { Icon, label, path, isActive, onClick } = item;

            return (
              <a
                key={label}
                href={path || "#"}
                className={`${styles.navItem} ${isActive ? styles.activeNavItem : ""}`}
                onClick={onClick}
              >
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
            className={`${styles.navItem} ${activePage === "Profile" ? styles.activeNavItem : ""}`}
          >
            <UserCircle
              className={styles.navIcon}
              fill={activePage === "Profile" ? "black" : "none"}
            />
            <span className={styles.navLabel}>Profile</span>
          </a>
        </nav>

        <div className={styles.footerNav}>
          <a href="#" className={styles.navItem} onClick={(e) => { e.preventDefault(); logout(); }}>
            <LogOut className={styles.navIcon} />
            <span className={styles.navLabel}>Log out</span>
          </a>
        </div>
      </div>

      {/* Рендеримо модалку створення поста прямо тут */}
      <CreatePostModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setCreateModalOpen(false)} // Закриваємо модалку
      />
    </>
  );
};

export default Sidebar;