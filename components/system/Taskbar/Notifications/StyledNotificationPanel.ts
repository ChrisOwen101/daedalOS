import styled from "styled-components";
import { TASKBAR_HEIGHT } from "utils/constants";

const StyledNotificationPanel = styled.div`
  background: ${({ theme }) => theme.colors.window.background};
  border: 1px solid ${({ theme }) => theme.colors.window.outline};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.colors.window.shadow};
  max-height: 400px;
  min-width: 350px;
  position: fixed;
  right: 8px;
  bottom: ${TASKBAR_HEIGHT + 8}px;
  z-index: 1000;

  .notification-header {
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.window.outline};
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;

    h3 {
      color: ${({ theme }) => theme.colors.text};
      font-size: 14px;
      font-weight: 600;
      margin: 0;
    }

    .clear-all-button {
      background: transparent;
      border: 1px solid ${({ theme }) => theme.colors.window.outline};
      border-radius: 4px;
      color: ${({ theme }) => theme.colors.text};
      cursor: pointer;
      font-size: 12px;
      padding: 4px 8px;
      transition: all 0.15s ease;

      &:hover {
        background: ${({ theme }) => theme.colors.taskbar.hover};
      }
    }
  }

  .notification-list {
    max-height: 320px;
    overflow-y: auto;
    padding: 8px;

    .no-notifications {
      align-items: center;
      color: ${({ theme }) => theme.colors.text};
      display: flex;
      flex-direction: column;
      gap: 8px;
      opacity: 0.6;
      padding: 32px 16px;
      text-align: center;

      svg {
        fill: currentColor;
        height: 32px;
        width: 32px;
      }

      p {
        font-size: 14px;
        margin: 0;
      }
    }
  }
`;

export default StyledNotificationPanel;
