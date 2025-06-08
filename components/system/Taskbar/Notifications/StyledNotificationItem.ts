import styled from "styled-components";
import { type NotificationPriority } from "contexts/notification/types";

type StyledNotificationItemProps = {
  $clickable?: boolean;
  $priority: NotificationPriority;
  $type: "info" | "warning" | "error" | "success";
};

const StyledNotificationItem = styled.div<StyledNotificationItemProps>`
  background: ${({ theme }) => theme.colors.taskbar.background};
  border: 1px solid ${({ theme }) => theme.colors.window.outline};
  border-left: 3px solid
    ${({ $type, theme }) => {
      switch ($type) {
        case "error":
          return theme.colors.titleBar.closeHover;
        case "warning":
          return "#ff9500";
        case "success":
          return theme.colors.progressBarRgb;
        default:
          return theme.colors.selectionHighlight;
      }
    }};
  border-radius: 6px;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  margin-bottom: 8px;
  padding: 12px;
  transition: all 0.15s ease;

  &:hover {
    background: ${({ $clickable, theme }) => 
      $clickable ? theme.colors.taskbar.active : theme.colors.taskbar.hover};
  }

  &:last-child {
    margin-bottom: 0;
  }

  .notification-content {
    .notification-main {
      align-items: flex-start;
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;

      h4 {
        color: ${({ theme }) => theme.colors.text};
        font-size: 13px;
        font-weight: 600;
        line-height: 1.3;
        margin: 0;
        padding-right: 8px;
      }

      .remove-button {
        background: transparent;
        border: none;
        color: ${({ theme }) => theme.colors.text};
        cursor: pointer;
        font-size: 16px;
        height: 20px;
        line-height: 1;
        opacity: 0.6;
        padding: 0;
        transition: opacity 0.15s ease;
        width: 20px;

        &:hover {
          opacity: 1;
        }
      }
    }

    p {
      color: ${({ theme }) => theme.colors.text};
      font-size: 12px;
      line-height: 1.4;
      margin: 0 0 8px 0;
      opacity: 0.8;
    }

    .notification-app-hint {
      color: ${({ theme }) => theme.colors.selectionHighlight};
      font-size: 11px;
      font-style: italic;
      margin: 4px 0 8px 0;
      opacity: 0.7;
    }

    .notification-meta {
      align-items: center;
      display: flex;
      gap: 8px;
      margin-bottom: 8px;

      .timestamp {
        color: ${({ theme }) => theme.colors.text};
        font-size: 11px;
        opacity: 0.6;
      }

      .priority {
        border-radius: 3px;
        font-size: 10px;
        font-weight: 600;
        padding: 2px 4px;

        &.priority-high {
          background: #ff9500;
          color: #fff;
        }

        &.priority-critical {
          background: ${({ theme }) => theme.colors.titleBar.closeHover};
          color: #fff;
        }

        &.priority-low {
          background: ${({ theme }) => theme.colors.taskbar.foreground};
          color: ${({ theme }) => theme.colors.text};
        }
      }
    }

    .notification-actions {
      display: flex;
      gap: 8px;

      .action-button {
        background: ${({ theme }) => theme.colors.selectionHighlight};
        border: none;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
        font-size: 11px;
        padding: 4px 8px;
        transition: opacity 0.15s ease;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
`;

export default StyledNotificationItem;
