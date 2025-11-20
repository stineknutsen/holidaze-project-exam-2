import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Theme from "./style/Theme/index.jsx";
import App from "./App.jsx";
import GlobalStyle from "./style/GlobalStyle/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme>
      <BrowserRouter>
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </Theme>
  </StrictMode>
);
