import { useMemo } from "react";
import { useColorScheme } from "@mui/joy/styles";
import { ColorMode, ColorModeContext, ColorModeValue } from "./colorMode";

/**
 * Wraps Joy's colour-scheme machinery (which handles the OS preference and
 * persistence) in a small context, so components toggle the theme without
 * each one reaching into the styling library.
 *
 * Must be rendered inside <CssVarsProvider>.
 */
export default function ColorModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode, systemMode, setMode } = useColorScheme();

  const resolved = mode === "system" ? systemMode : mode;
  const isDark = resolved === "dark";

  const value = useMemo<ColorModeValue>(
    () => ({
      mode: (mode ?? "system") as ColorMode,
      isDark,
      setMode,
      toggle: () => setMode(isDark ? "light" : "dark"),
    }),
    [mode, isDark, setMode],
  );

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
}
