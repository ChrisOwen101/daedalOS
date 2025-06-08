import { AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import { memo, useEffect } from "react";
import { useProcesses } from "contexts/process";
import { useSession } from "contexts/session";

const RenderComponent = dynamic(
  () => import("components/system/Apps/RenderComponent")
);

const AppsLoader: FC = () => {
  const { processes = {}, open } = useProcesses();
  const { isLoggedIn, sessionLoaded } = useSession();

  useEffect(() => {
    if (sessionLoaded && !isLoggedIn) {
      open("Login");
    }
  }, [isLoggedIn, open, sessionLoaded]);

  return (
    <AnimatePresence initial={false} presenceAffectsLayout={false}>
      {Object.entries(processes).map(
        ([id, { closing, Component, hasWindow }]) =>
          id &&
          Component &&
          !closing && (
            <RenderComponent
              key={id}
              Component={Component}
              hasWindow={hasWindow}
              id={id}
            />
          )
      )}
    </AnimatePresence>
  );
};

export default memo(AppsLoader);
