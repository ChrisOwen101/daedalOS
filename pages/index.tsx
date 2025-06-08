import { memo, useEffect } from "react";
import AppsLoader from "components/system/Apps/AppsLoader";
import Desktop from "components/system/Desktop";
import Taskbar from "components/system/Taskbar";
import { useSession } from "contexts/session";
import useGlobalErrorHandler from "hooks/useGlobalErrorHandler";
import useGlobalKeyboardShortcuts from "hooks/useGlobalKeyboardShortcuts";
import useIFrameFocuser from "hooks/useIFrameFocuser";
import useUrlLoader from "hooks/useUrlLoader";
import { notifications } from "utils/notifications";

const Index = (): React.ReactElement => {
  const { isLoggedIn, sessionLoaded } = useSession();

  useIFrameFocuser();
  useUrlLoader();
  useGlobalKeyboardShortcuts();
  useGlobalErrorHandler();

  // Add welcome notification 5 seconds after launch
  useEffect(() => {
    if (!sessionLoaded || !isLoggedIn) return;

    const timer = setTimeout(() => {
      notifications.app(
        "Welcome to daedalOS!",
        "FileExplorer",
        "Your desktop environment is ready. Click to open File Explorer.",
        { url: "/" },
        "info"
      );
    }, 5000);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timer);
  }, [sessionLoaded, isLoggedIn]);

  return sessionLoaded && isLoggedIn ? (
    <Desktop>
      <Taskbar />
      <AppsLoader />
    </Desktop>
  ) : (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        height: "100vh",
        width: "100vw",
      }}
    >
      <AppsLoader />
    </div>
  );
};

export default memo(Index);
