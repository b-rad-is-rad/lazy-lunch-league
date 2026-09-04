import { extendTheme } from "@mui/joy/styles";

// Airy product-surface theme: near-white canvas, white cards, hairline
// dividers and a single blue accent reserved for the primary action.
export const theme = extendTheme({
  fontFamily: {
    display: '"Instrument Serif", Georgia, serif',
    body: '"Instrument Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    code: '"Instrument Sans", monospace',
  },
  radius: {
    xs: "6px",
    sm: "8px",
    md: "10px",
    lg: "14px",
    xl: "20px",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#EEF3FF",
          100: "#DCE5FF",
          200: "#BACCFF",
          300: "#8FAAFF",
          400: "#5F84FA",
          500: "#3B5BEA",
          600: "#2A45CC",
          700: "#2036A3",
          800: "#18287A",
          900: "#101B52",
          solidBg: "#3B5BEA",
          solidHoverBg: "#2A45CC",
          solidActiveBg: "#2036A3",
          plainColor: "#2A45CC",
          outlinedColor: "#2A45CC",
        },
        neutral: {
          50: "#FAFBFC",
          100: "#F2F4F7",
          200: "#E7EAEF",
          300: "#D5DAE2",
          400: "#A8B0BF",
          500: "#7A8497",
          600: "#5A6377",
          700: "#3E4657",
          800: "#272E3D",
          900: "#141922",
        },
        background: {
          body: "#F7F8FA",
          surface: "#FFFFFF",
          level1: "#F2F4F7",
          level2: "#E7EAEF",
        },
        text: {
          primary: "#141922",
          secondary: "#5A6377",
          tertiary: "#7A8497",
        },
        divider: "#EAEDF2",
      },
    },
  },
});
