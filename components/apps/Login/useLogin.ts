import { useEffect } from "react";
import { type ContainerHookProps } from "components/system/Apps/AppContainer";

const useLogin = ({ setLoading }: ContainerHookProps): void => {
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);
};

export default useLogin;
