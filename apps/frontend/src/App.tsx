import { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Workspace from "./components/Workspace/Workspace";
import { DAYS, Day, PlayerDef } from "./types";

const label = (d: string) => d[0].toUpperCase() + d.slice(1);

function App() {
  const [day, setDay] = useState<Day>("tuesday");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [rosters, setRosters] = useState<Record<Day, PlayerDef[]>>({
    tuesday: [],
    thursday: [],
    friday: [],
  });

  // ⌘K / Ctrl-K from anywhere, including while a field has focus.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const setPlayersFor =
    (d: Day): React.Dispatch<React.SetStateAction<PlayerDef[]>> =>
    (update) =>
      setRosters((prev) => ({
        ...prev,
        [d]: typeof update === "function" ? update(prev[d]) : update,
      }));

  return (
    <Box sx={{ minHeight: "100dvh" }}>
      <Box
        component="header"
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "rgba(255,255,255,0.86)",
          backdropFilter: "blur(8px)",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, sm: 4 }, height: 60 }}
        >
          <Stack direction="row" alignItems="center" spacing={2.5} sx={{ minWidth: 0 }}>
            <Stack direction="row" alignItems="center" spacing={1.25}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "7px",
                  bgcolor: "primary.600",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                L
              </Box>
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 700,
                  display: { xs: "none", md: "block" },
                  whiteSpace: "nowrap",
                }}
              >
                Lazy Lunch League
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.25}>
              {DAYS.map((d) => (
                <Box
                  key={d}
                  component="button"
                  type="button"
                  onClick={() => setDay(d)}
                  sx={{
                    border: "none",
                    bgcolor: "transparent",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: 14,
                    fontWeight: 600,
                    px: { xs: 1, sm: 1.5 },
                    py: 2,
                    color: day === d ? "text.primary" : "text.tertiary",
                    borderBottom: "2px solid",
                    borderColor: day === d ? "primary.500" : "transparent",
                    transition: "color 140ms ease, border-color 140ms ease",
                    "&:hover": { color: "text.primary" },
                  }}
                >
                  {label(d)}
                </Box>
              ))}
            </Stack>
          </Stack>

          <Stack
            component="button"
            type="button"
            onClick={() => setPaletteOpen(true)}
            direction="row"
            alignItems="center"
            spacing={1}
            aria-label="Open command palette"
            sx={{
              border: "1px solid",
              borderColor: "neutral.200",
              bgcolor: "neutral.50",
              borderRadius: "999px",
              cursor: "pointer",
              fontFamily: "inherit",
              px: { xs: 1, sm: 1.5 },
              py: 0.75,
              flexShrink: 0,
              transition: "background-color 140ms ease",
              "&:hover": { bgcolor: "neutral.100" },
            }}
          >
            <SearchRoundedIcon sx={{ fontSize: 17, color: "text.tertiary" }} />
            <Typography
              sx={{
                display: { xs: "none", sm: "block" },
                fontSize: 13.5,
                color: "text.tertiary",
              }}
            >
              Actions
            </Typography>
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
                fontFamily: "var(--joy-fontFamily-code)",
                fontSize: 11,
                color: "text.tertiary",
                border: "1px solid",
                borderColor: "neutral.200",
                bgcolor: "background.surface",
                borderRadius: "xs",
                px: 0.6,
              }}
            >
              ⌘K
            </Box>
          </Stack>
        </Stack>
      </Box>

      <Box
        component="main"
        sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, sm: 4 }, py: { xs: 3, sm: 4.5 } }}
      >
        {/* Remount per day so each day runs its own fetch and selection state. */}
        <Workspace
          key={day}
          day={day}
          players={rosters[day]}
          setPlayers={setPlayersFor(day)}
          onSwitchDay={setDay}
          paletteOpen={paletteOpen}
          setPaletteOpen={setPaletteOpen}
        />
      </Box>
    </Box>
  );
}

export default App;
