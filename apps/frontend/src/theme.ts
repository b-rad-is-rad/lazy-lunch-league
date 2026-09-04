import { extendTheme } from "@mui/joy/styles";

// Workspace theme: white page, hairline rules instead of cards, a graphite
// ink and a single evergreen accent. Numbers are set in mono so counts and
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
          50: "#ECFAF5",
          100: "#D2F2E7",
          200: "#A6E3CE",
          300: "#6FCDAF",
          400: "#37B08E",
          500: "#12906F",
          600: "#0C7359",
          700: "#0A5B47",
          800: "#084537",
          900: "#052D24",
          solidBg: "#0C7359",
          solidHoverBg: "#0A5B47",
          solidActiveBg: "#084537",
          plainColor: "#0C7359",
          outlinedColor: "#0C7359",
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
