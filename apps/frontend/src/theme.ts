import { extendTheme } from "@mui/joy/styles";

// "Roster sheet" theme: warm paper, ink text, one confident amber accent.
// Big Shoulders Display for headings (condensed/athletic), IBM Plex Sans for
// body copy, IBM Plex Mono for every number on the page (ranks, counts,
// scores) so data reads like a scoreboard.
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
    light: {
      palette: {
        primary: {
          50: "#FDF8ED",
          100: "#FAEDCB",
          200: "#F3D896",
          300: "#EABD5C",
          400: "#DFA23A",
          500: "#C98527",
          600: "#A8691C",
          700: "#855015",
          800: "#623A10",
          900: "#40270A",
          solidBg: "#C98527",
          solidHoverBg: "#A8691C",
          solidActiveBg: "#855015",
          outlinedColor: "#A8691C",
          outlinedBorder: "#EABD5C",
          plainColor: "#A8691C",
        },
        neutral: {
          50: "#FAF7F1",
          100: "#F3EEE3",
          200: "#E7DFCF",
          300: "#D3C7AF",
          400: "#B0A38A",
          500: "#8C806A",
          600: "#6B6152",
          700: "#4E463A",
          800: "#332D24",
          900: "#1C1814",
        },
        background: {
          body: "#F3EEE3",
          surface: "#FBF9F4",
          level1: "#EDE6D8",
          level2: "#E7DFCF",
        },
        text: {
          primary: "#1C1814",
          secondary: "#6B6152",
        },
        divider: "#E0D7C3",
      },
    },
  },
});
