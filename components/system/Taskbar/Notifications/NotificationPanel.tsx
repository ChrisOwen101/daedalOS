import { memo, type FC } from "react";
import { m as motion } from "motion/react";
import NotificationItem from "components/system/Taskbar/Notifications/NotificationItem";
import StyledNotificationPanel from "components/system/Taskbar/Notifications/StyledNotificationPanel";
import { useNotification } from "contexts/notification";

type NotificationPanelProps = {
  toggleNotifications: (showNotifications?: boolean) => void;
};

const NotificationPanel: FC<NotificationPanelProps> = () => {
  const { notifications, clearAllNotifications } = useNotification();

  return (
    <StyledNotificationPanel
      animate={{ opacity: 1, scale: 1 }}
      as={motion.div}
      exit={{ opacity: 0, scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      <div className="notification-header">
        <h3>Notifications</h3>
        {notifications.length > 0 && (
          <button
            className="clear-all-button"
            onClick={clearAllNotifications}
            type="button"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="notification-list">
        {notifications.length === 0 ? (
          <div className="no-notifications">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 19V20H3V19L5 17V11C5 7.9 7 5.2 10 4.3V4C10 2.9 10.9 2 12 2S14 2.9 14 4V4.3C17 5.2 19 7.9 19 11V17L21 19ZM17 11C17 8.2 14.8 6 12 6S7 8.2 7 11V18H17V11Z" />
            </svg>
            <p>No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))
        )}
      </div>
    </StyledNotificationPanel>
  );
};

export default memo(NotificationPanel);
