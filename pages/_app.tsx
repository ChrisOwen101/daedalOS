import { type AppProps } from "next/app";
import { ErrorBoundary } from "components/pages/ErrorBoundary";
import Metadata from "components/pages/Metadata";
import StyledApp from "components/pages/StyledApp";
import { FileSystemProvider } from "contexts/fileSystem";
import { MenuProvider } from "contexts/menu";
import { NotificationProvider } from "contexts/notification";
import { ProcessProvider } from "contexts/process";
import { SessionProvider } from "contexts/session";
import { ViewportProvider } from "contexts/viewport";

const App = ({ Component: Index, pageProps }: AppProps): React.ReactElement => (
  <ViewportProvider>
    <ProcessProvider>
      <FileSystemProvider>
        <SessionProvider>
          <NotificationProvider>
            <ErrorBoundary>
              <Metadata />
              <StyledApp>
                <MenuProvider>
                  <Index {...pageProps} />
                </MenuProvider>
              </StyledApp>
            </ErrorBoundary>
          </NotificationProvider>
        </SessionProvider>
      </FileSystemProvider>
    </ProcessProvider>
  </ViewportProvider>
);

export default App;
