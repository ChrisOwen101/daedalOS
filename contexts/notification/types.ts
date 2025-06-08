export type NotificationPriority = "low" | "medium" | "high" | "critical";

export interface NotificationAction {
  id: string;
  label: string;
  onClick: () => void;
}

export interface Notification {
  actions?: NotificationAction[];
  appId?: string;
  appArguments?: Record<string, unknown>;
  body?: string;
  id: string;
  priority: NotificationPriority;
  timestamp: number;
  title: string;
  type?: "info" | "warning" | "error" | "success";
}

export interface NotificationContextState {
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp">
  ) => string;
  clearAllNotifications: () => void;
  notifications: Notification[];
  removeNotification: (id: string) => void;
  unreadCount: number;
}
