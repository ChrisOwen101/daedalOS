import { useState } from "react";
import StyledLogin from "components/apps/Login/StyledLogin";
import useLogin from "components/apps/Login/useLogin";
import AppContainer from "components/system/Apps/AppContainer";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";
import { useSession } from "contexts/session";
import { useProcesses } from "contexts/process";
import { playSystemSound, SYSTEM_SOUNDS } from "utils/audio";

const Login: FC<ComponentProcessProps> = ({ id }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setSessionValue } = useSession();
  const { close } = useProcesses();

  const handleLogin = (): void => {
    // Simple validation - accept any non-empty username
    if (username.trim()) {
      // Play login success sound
      playSystemSound(SYSTEM_SOUNDS.notification);

      setSessionValue("user", { isLoggedIn: true, name: username });
      setSessionValue("isLoggedIn", true);
      close(id);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent): void => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <AppContainer StyledComponent={StyledLogin} id={id} useHook={useLogin}>
      <div className="login-container">
        <div className="login-logo">
          <h1>daedalOS</h1>
          <p>Web Desktop Environment</p>
        </div>

        <div className="login-form">
          <div className="input-group">
            <input
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Username"
              type="text"
              value={username}
              autoFocus
            />
          </div>

          <div className="input-group">
            <input
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Password"
              type="password"
              value={password}
            />
          </div>

          <button className="login-button" onClick={handleLogin} type="button">
            Sign In
          </button>
        </div>

        <div className="login-footer">Enter any username to continue</div>
      </div>
    </AppContainer>
  );
};

export default Login;
