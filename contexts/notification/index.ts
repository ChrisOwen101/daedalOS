import contextFactory from "contexts/contextFactory";
import useNotificationContextState from "contexts/notification/useNotificationContextState";

const { Provider, useContext } = contextFactory(useNotificationContextState);

export { Provider as NotificationProvider, useContext as useNotification };
