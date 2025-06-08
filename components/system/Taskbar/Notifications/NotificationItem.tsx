import { memo, type FC, useEffect } from "react";
import StyledNotificationItem from "components/system/Taskbar/Notifications/StyledNotificationItem";
import { type Notification } from "contexts/notification/types";
import { useNotification } from "contexts/notification";
import { playSystemSound, SYSTEM_SOUNDS } from "utils/audio";

const formatTime = (time: number): string => {
  const now = Date.now();
  const diff = now - time;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

type NotificationItemProps = {
  notification: Notification;
};

const NotificationItem: FC<NotificationItemProps> = ({ notification }) => {
  const { removeNotification } = useNotification();
  const {
    actions,
    body,
    id,
    priority,
    timestamp,
    title,
    type = "info",
  } = notification;

  // Play sound when notification appears
  useEffect(() => {
    playSystemSound(SYSTEM_SOUNDS.notification);
  }, []);

  const handleRemove = (): void => {
    removeNotification(id);
  };

  return (
    <StyledNotificationItem $priority={priority} $type={type}>
      <div className="notification-content">
        <div className="notification-main">
          <h4>{title}</h4>
          <button
            aria-label="Remove notification"
            className="remove-button"
            onClick={handleRemove}
            type="button"
          >
            ×
          </button>
        </div>
        {body && <p>{body}</p>}
        <div className="notification-meta">
          <span className="timestamp">{formatTime(timestamp)}</span>
          {priority !== "medium" && (
            <span className={`priority priority-${priority}`}>
              {priority.toUpperCase()}
            </span>
          )}
        </div>
        {actions && actions.length > 0 && (
          <div className="notification-actions">
            {actions.map((action) => (
              <button
                key={action.id}
                className="action-button"
                onClick={() => {
                  action.onClick();
                  handleRemove();
                }}
                type="button"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </StyledNotificationItem>
  );
};

export default memo(NotificationItem);
