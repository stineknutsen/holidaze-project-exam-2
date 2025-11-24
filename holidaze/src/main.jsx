import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Theme from "./style/Theme/index.jsx";
import App from "./App.jsx";
import GlobalStyle from "./style/GlobalStyle/index.jsx";
import { NotificationProvider } from "./context/NotificationContext";
import { UserProvider } from "./context/UserContext/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme>
      <UserProvider>
        <NotificationProvider>
          <BrowserRouter>
            <GlobalStyle />
            <App />
          </BrowserRouter>
        </NotificationProvider>
      </UserProvider>
    </Theme>
  </StrictMode>
);
