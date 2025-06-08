import { useCallback, useEffect, useState } from "react";
import {
  type Notification,
  type NotificationContextState,
} from "contexts/notification/types";
import { notifications as globalNotifications } from "utils/notifications";
import { playSystemSound, SYSTEM_SOUNDS } from "utils/audio";

const useNotificationContextState = (): NotificationContextState => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (notification: Omit<Notification, "id" | "timestamp">): string => {
      const id = `notification-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const newNotification: Notification = {
        ...notification,
        id,
        timestamp: Date.now(),
      };

      setNotifications((currentNotifications) => [
        newNotification,
        ...currentNotifications,
      ]);

      // Play notification sound when notification is added
      playSystemSound(SYSTEM_SOUNDS.notification);

      return id;
    },
    []
  );

  const removeNotification = useCallback((id: string): void => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter((notification) => notification.id !== id)
    );
  }, []);

  const clearAllNotifications = useCallback((): void => {
    setNotifications([]);
  }, []);

  // Connect the global notification manager to this context
  useEffect(() => {
    globalNotifications.setAddFunction(addNotification);
  }, [addNotification]);

  return {
    addNotification,
    clearAllNotifications,
    notifications,
    removeNotification,
    unreadCount: notifications.length,
  };
};

export default useNotificationContextState;
