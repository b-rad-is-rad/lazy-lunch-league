import { extendTheme } from "@mui/joy/styles";

// "Stadium lights" theme: near-black chrome, a glowing amber accent, and
// the Light team card literally lit up against the dark surroundings.
// Big Shoulders Display for headings, IBM Plex Sans for body copy,
// IBM Plex Mono for every number (ranks, counts) for a scoreboard feel.
export const theme = extendTheme({
  fontFamily: {
    display: '"Big Shoulders Display", "Arial Narrow", sans-serif',
    body: '"IBM Plex Sans", sans-serif',
    code: '"IBM Plex Mono", monospace',
  },
  radius: {
    xs: "3px",
    sm: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
  },
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          50: "#FFF6E4",
          100: "#FFE9BE",
          200: "#FFD37D",
          300: "#FFBB47",
          400: "#FFA724",
          500: "#F2951A",
          600: "#CC7A12",
          700: "#A25F0E",
          800: "#78450A",
          900: "#4D2C06",
          solidBg: "#F2951A",
          solidColor: "#14110C",
          solidHoverBg: "#FFA724",
          solidActiveBg: "#CC7A12",
          outlinedColor: "#FFBB47",
          outlinedBorder: "#78450A",
          plainColor: "#FFBB47",
        },
        success: {
          solidBg: "#3AB57B",
          solidHoverBg: "#45C989",
        },
        neutral: {
          50: "#F4F1EC",
          100: "#E4DFD6",
          200: "#C7BFB0",
          300: "#9C9284",
          400: "#726A5E",
          500: "#524C43",
          600: "#3B362F",
          700: "#2A2621",
          800: "#1B1815",
          900: "#100E0B",
        },
        background: {
          body: "#100E0B",
          surface: "#1B1815",
          level1: "#211D19",
          level2: "#2A2621",
        },
        text: {
          primary: "#F4F1EC",
          secondary: "#9C9284",
        },
        divider: "#2E2822",
      },
    },
  },
});
