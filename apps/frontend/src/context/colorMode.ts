import { createContext, useContext } from "react";

export type ColorMode = "light" | "dark" | "system";

export interface ColorModeValue {
  /** What the user picked; "system" follows the OS. */
  mode: ColorMode;
  /** What that resolves to right now. */
  isDark: boolean;
  setMode: (mode: ColorMode) => void;
  /** Flip to the opposite of whatever is currently showing. */
  toggle: () => void;
}

export const ColorModeContext = createContext<ColorModeValue | null>(null);

export const useColorMode = (): ColorModeValue => {
  const value = useContext(ColorModeContext);
  if (!value) {
    throw new Error("useColorMode must be used inside <ColorModeProvider>");
  }
  return value;
};
