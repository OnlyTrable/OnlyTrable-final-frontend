import { useMemo } from "react";
import {
  Home,
  Search,
  Compass,
  MessageCircle,
  Heart,
  SquarePlus,
} from "lucide-react";

const baseNavItems = [
  { id: 'home', Icon: Home, label: "Home", path: "/main" },
  { id: 'search', Icon: Search, label: "Search" },
  { id: 'explore', Icon: Compass, label: "Explore" },
  { id: 'messages', Icon: MessageCircle, label: "Messages" },
  { id: 'notification', Icon: Heart, label: "Notification" },
  { id: 'create', Icon: SquarePlus, label: "Create" },
];

export const useSidebarNavigation = ({
  activePage,
  isNotificationsPanelOpen,
  onNotificationClick,
  isSearchPanelOpen,
  onSearchClick,
  isExplorePanelOpen,
  onExploreClick,
  isMessagesPanelOpen,
  onMessagesClick,
  isCreateModalOpen,
  onToggleCreateModal,
}) => {
  const clickHandlers = useMemo(() => ({
    notification: onNotificationClick,
    search: onSearchClick,
    explore: onExploreClick,
    messages: onMessagesClick,
    create: onToggleCreateModal,
  }), [onNotificationClick, onSearchClick, onExploreClick, onMessagesClick, onToggleCreateModal]);

  const navItems = useMemo(() => {
    return baseNavItems.map(item => {
      const { id, label, path } = item;

      const isNotificationActive = label === "Notification" && isNotificationsPanelOpen;
      const isSearchActive = label === "Search" && isSearchPanelOpen;
      const isExploreActive = label === "Explore" && isExplorePanelOpen;
      const isMessagesActive = label === "Messages" && isMessagesPanelOpen;
      const isCreateActive = label === "Create" && isCreateModalOpen;

      const isPageActive = label === activePage &&
        !isNotificationsPanelOpen && !isSearchPanelOpen &&
        !isExplorePanelOpen && !isMessagesPanelOpen && !isCreateModalOpen;

      const isActive = isNotificationActive || isSearchActive ||
                       isExploreActive || isMessagesActive ||
                       isCreateActive || isPageActive;

      const onClick = (e) => {
        if (!path) {
          e.preventDefault();
        }
        const handler = clickHandlers[id];
        if (handler) {
          handler();
        }
      };

      return { ...item, isActive, onClick };
    });
  }, [activePage, isNotificationsPanelOpen, isSearchPanelOpen, isExplorePanelOpen, isMessagesPanelOpen, isCreateModalOpen, clickHandlers]);

  return { navItems };
};