import { memo, type FC } from "react";
import StyledNotificationButton from "components/system/Taskbar/Notifications/StyledNotificationButton";
import { useNotification } from "contexts/notification";

type NotificationButtonProps = {
  notificationsVisible: boolean;
  toggleNotifications: (showNotifications?: boolean) => void;
};

const NotificationButton: FC<NotificationButtonProps> = ({
  notificationsVisible,
  toggleNotifications,
}) => {
  const { unreadCount } = useNotification();

  return (
    <StyledNotificationButton
      $active={notificationsVisible}
      $hasNotifications={unreadCount > 0}
      aria-label="Notifications"
      onClick={() => toggleNotifications()}
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 19V20H3V19L5 17V11C5 7.9 7 5.2 10 4.3V4C10 2.9 10.9 2 12 2S14 2.9 14 4V4.3C17 5.2 19 7.9 19 11V17L21 19ZM17 11C17 8.2 14.8 6 12 6S7 8.2 7 11V18H17V11Z" />
      </svg>
      {unreadCount > 0 && (
        <span className="notification-badge">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </StyledNotificationButton>
  );
};

export default memo(NotificationButton);
