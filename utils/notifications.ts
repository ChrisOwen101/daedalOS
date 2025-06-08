import {
  type NotificationAction,
  type NotificationPriority,
  type Notification,
} from "contexts/notification/types"

type AddNotificationFn = (
  notification: Omit<Notification, "id" | "timestamp">
) => string

// Global notification manager for programmers to easily add notifications
class NotificationManager {
  private addNotificationFn: AddNotificationFn | undefined = undefined;

  // Internal method to set the add function (used by the notification context)
  public setAddFunction(addFn: AddNotificationFn): void {
    this.addNotificationFn = addFn
  }

  // Public API for programmers to add notifications
  public add(options: {
    actions?: NotificationAction[]
    body?: string
    priority?: NotificationPriority
    title: string
    type?: "info" | "warning" | "error" | "success"
  }): string | undefined {
    if (!this.addNotificationFn) {
      // eslint-disable-next-line no-console
      console.warn("Notification system not initialized yet")
      return undefined
    }

    return this.addNotificationFn({
      priority: "medium",
      type: "info",
      ...options,
    })
  }

  // Convenience methods for different types of notifications
  public info(
    title: string,
    body?: string,
    actions?: NotificationAction[]
  ): string | undefined {
    return this.add({ actions, body, priority: "medium", title, type: "info" })
  }

  public success(
    title: string,
    body?: string,
    actions?: NotificationAction[]
  ): string | undefined {
    return this.add({
      actions,
      body,
      priority: "medium",
      title,
      type: "success",
    })
  }

  public warning(
    title: string,
    body?: string,
    actions?: NotificationAction[]
  ): string | undefined {
    return this.add({
      actions,
      body,
      priority: "high",
      title,
      type: "warning",
    })
  }

  public error(
    title: string,
    body?: string,
    actions?: NotificationAction[]
  ): string | undefined {
    return this.add({
      actions,
      body,
      priority: "critical",
      title,
      type: "error",
    })
  }

  // Story/narrative helper - adds a notification from the system assistant
  public story(
    title: string,
    body?: string,
    actions?: NotificationAction[]
  ): string | undefined {
    return this.add({
      actions,
      body,
      priority: "medium",
      title: `🤖 ${title}`,
      type: "info",
    })
  }
}

// Export singleton instance for global use
export const notifications = new NotificationManager()

// Make it available globally for easy debugging/testing
if (typeof window !== "undefined") {
  (window as unknown as { notifications: NotificationManager }).notifications =
    notifications
}
