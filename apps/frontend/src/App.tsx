import { useState } from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import DayView from "./components/DayView/DayView";
import { DAYS, Day, PlayerDef } from "./types";

const label = (d: string) => d[0].toUpperCase() + d.slice(1);

function App() {
  const [day, setDay] = useState<Day>("tuesday");
  const [rosters, setRosters] = useState<Record<Day, PlayerDef[]>>({
    tuesday: [],
    thursday: [],
    friday: [],
  });

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
          bgcolor: "background.surface",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ maxWidth: 1180, mx: "auto", px: { xs: 2, sm: 4 }, height: 60 }}
        >
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Box
              sx={{
                width: 26,
                height: 26,
                borderRadius: "8px",
                bgcolor: "primary.500",
                color: "#fff",
                display: "grid",
                placeItems: "center",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              L
            </Box>
            <Typography
              sx={{ fontSize: 15, fontWeight: 600, display: { xs: "none", sm: "block" } }}
            >
              Lazy Lunch League
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={0.5}
            sx={{ bgcolor: "neutral.100", p: "3px", borderRadius: "999px" }}
          >
            {DAYS.map((d) => (
              <Box
                key={d}
                component="button"
                type="button"
                onClick={() => setDay(d)}
                sx={{
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 13.5,
                  fontWeight: 600,
                  px: { xs: 1.75, sm: 2.25 },
                  py: 0.75,
                  borderRadius: "999px",
                  transition: "all 160ms ease",
                  bgcolor: day === d ? "background.surface" : "transparent",
                  color: day === d ? "text.primary" : "text.tertiary",
                  boxShadow: day === d ? "0 1px 2px rgba(20,25,34,0.08)" : "none",
                }}
              >
                {label(d)}
              </Box>
            ))}
          </Stack>
        </Stack>
      </Box>

      <Box
        component="main"
        sx={{ maxWidth: 1180, mx: "auto", px: { xs: 2, sm: 4 }, py: { xs: 3, sm: 5 } }}
      >
        {/* Remount per day so each day gets its own fetch and step position. */}
        <DayView
          key={day}
          day={day}
          players={rosters[day]}
          setPlayers={setPlayersFor(day)}
        />
      </Box>
    </Box>
  );
}

export default App;
