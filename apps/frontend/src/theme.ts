import { extendTheme } from "@mui/joy/styles";

// Workspace theme: white page, hairline rules instead of cards, a graphite
// ink and a single violet accent. Numbers are set in mono so counts and
// ranks line up down the column.
export const theme = extendTheme({
  fontFamily: {
    display: '"Manrope", -apple-system, BlinkMacSystemFont, sans-serif',
    body: '"Manrope", -apple-system, BlinkMacSystemFont, sans-serif',
    code: '"JetBrains Mono", ui-monospace, monospace',
  },
  radius: {
    xs: "5px",
    sm: "7px",
    md: "9px",
    lg: "13px",
    xl: "18px",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#F6F3FE",
          100: "#EBE4FD",
          200: "#D7C9FB",
          300: "#BCA5F6",
          400: "#9D7BEF",
          500: "#7F52E3",
          600: "#6A3DCB",
          700: "#5730A6",
          800: "#422480",
          900: "#2C1857",
          solidBg: "#6A3DCB",
          solidHoverBg: "#5C33B4",
          solidActiveBg: "#5730A6",
          plainColor: "#5730A6",
          outlinedColor: "#5730A6",
        },
        neutral: {
          50: "#FAFAFA",
          100: "#F4F4F5",
          200: "#E9E9EC",
          300: "#D6D7DB",
          400: "#A3A5AD",
          500: "#767A85",
          600: "#565A65",
          700: "#3C4049",
          800: "#26292F",
          900: "#121417",
        },
        background: {
          body: "#FFFFFF",
          surface: "#FFFFFF",
          level1: "#FAFAFA",
          level2: "#F4F4F5",
        },
        text: {
          primary: "#121417",
          secondary: "#565A65",
          tertiary: "#767A85",
        },
        divider: "#ECECEF",
      },
    },
    // The neutral ramp is inverted here — 50 is the darkest step and 900 the
    // lightest — so components can keep asking for the same token in both
    // schemes and still mean "faint background" or "strongest ink".
    dark: {
      palette: {
        primary: {
          50: "#1E1533",
          100: "#2A1D47",
          200: "#3B2A63",
          300: "#5B4193",
          400: "#8B6BE0",
          500: "#9D7BEF",
          600: "#AE92F3",
          700: "#C4B0F8",
          800: "#DACCFB",
          900: "#EFE7FE",
          solidBg: "#7F52E3",
          solidColor: "#FFFFFF",
          solidHoverBg: "#8B62E8",
          solidActiveBg: "#7345D6",
          plainColor: "#BCA5F6",
          outlinedColor: "#BCA5F6",
        },
        neutral: {
          50: "#1C1F24",
          100: "#24282E",
          200: "#2F343C",
          300: "#3B424B",
          400: "#5A616C",
          500: "#838A95",
          600: "#A6ACB6",
          700: "#C8CDD4",
          800: "#E2E5E9",
          900: "#F2F3F5",
          // Joy derives these from its own ramp direction, which the
          // inversion above turns inside out (dark ink on a dark page, and
          // glaring borders). Pin them instead.
          plainColor: "#E2E5E9",
          plainHoverBg: "#24282E",
          plainActiveBg: "#2F343C",
          plainDisabledColor: "#5A616C",
          outlinedColor: "#E2E5E9",
          outlinedBorder: "#3B424B",
          outlinedHoverBg: "#24282E",
          outlinedActiveBg: "#2F343C",
          outlinedDisabledColor: "#5A616C",
          outlinedDisabledBorder: "#2F343C",
          softColor: "#E2E5E9",
          softBg: "#24282E",
          softHoverBg: "#2F343C",
          softActiveBg: "#3B424B",
          solidColor: "#0F1114",
          solidBg: "#C8CDD4",
          solidHoverBg: "#E2E5E9",
        },
        background: {
          body: "#0F1114",
          surface: "#16181C",
          level1: "#1C1F24",
          level2: "#24282E",
        },
        text: {
          primary: "#F2F3F5",
          secondary: "#A6ACB6",
          tertiary: "#838A95",
        },
        divider: "#262B32",
      },
    },
  },
});
