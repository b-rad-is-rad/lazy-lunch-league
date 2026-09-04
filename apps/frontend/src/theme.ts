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
  },
});
