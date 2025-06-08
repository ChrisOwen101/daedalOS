import styled from "styled-components";

type StyledNotificationButtonProps = {
  $active: boolean;
  $hasNotifications: boolean;
};

const StyledNotificationButton = styled.button<StyledNotificationButtonProps>`
  background: ${({ $active, theme }) =>
    $active ? theme.colors.taskbar.hover : "transparent"};
  border: none;
  border-radius: 0;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0;
  position: absolute;
  right: 0;
  transition: background-color 0.15s ease;
  width: ${({ theme }) => theme.sizes.taskbar.ai.buttonWidth};

  &:hover {
    background: ${({ theme }) => theme.colors.taskbar.hover};
  }

  &:active {
    background: ${({ theme }) => theme.colors.taskbar.active};
  }

  svg {
    fill: ${({ $hasNotifications, theme }) =>
      $hasNotifications ? theme.colors.selectionHighlight : theme.colors.text};
    height: 16px;
    width: 16px;
  }

  .notification-badge {
    background: ${({ theme }) => theme.colors.selectionHighlight};
    border-radius: 8px;
    color: #fff;
    font-size: 10px;
    font-weight: 600;
    line-height: 1;
    min-width: 16px;
    padding: 2px 4px;
    position: absolute;
    right: 2px;
    text-align: center;
    top: 2px;
  }
`;

export default StyledNotificationButton;
