import { createRoot } from "react-dom/client";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import App from "./App.tsx";
import ColorModeProvider from "./context/ColorModeProvider.tsx";
import { theme } from "./theme.ts";
import "./global.css";

createRoot(document.getElementById("root")!).render(
  <CssVarsProvider
    theme={theme}
    defaultMode="system"
    modeStorageKey="lll-color-mode"
  >
    <CssBaseline />
    <ColorModeProvider>
      <App />
    </ColorModeProvider>
  </CssVarsProvider>,
);
