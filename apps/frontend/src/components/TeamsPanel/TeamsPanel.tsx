import React from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { PlayerDef } from "../PlayerList/PlayerList";

interface TeamPanelProps {
  darkTeam: PlayerDef[];
  lightTeam: PlayerDef[];
}

const totalRank = (team: PlayerDef[]) =>
  team.reduce((sum, p) => sum + (p.rank ?? 0), 0);

// The "Dark" card sinks into the void of the page background, marked only
// by a faint ember-tinted edge. The "Light" card is a bright surface that
// glows outward, as if it's the one actually lit up in the room.
const TeamPanel: React.FC<TeamPanelProps> = ({
  darkTeam = [],
  lightTeam = [],
}) => {
  const sortedDarkTeam = [...darkTeam].sort(
    (a, b) => (b.rank ?? 0) - (a.rank ?? 0),
  );
  const sortedLightTeam = [...lightTeam].sort(
    (a, b) => (b.rank ?? 0) - (a.rank ?? 0),
  );

  const renderTeam = (team: PlayerDef[], title: string, isLight: boolean) => (
    <Sheet
      variant={isLight ? "solid" : "outlined"}
      sx={{
        borderRadius: "md",
        p: 1.75,
        height: "100%",
        bgcolor: isLight ? "#F4F1EC" : "#0A0908",
        color: isLight ? "#14110C" : "neutral.50",
        border: isLight ? "none" : "1px solid",
        borderColor: "neutral.600",
        boxShadow: isLight ? "0 0 40px rgba(244, 241, 236, 0.18)" : "none",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
        sx={{
          mb: 1,
          pb: 1,
          borderBottom: "1px solid",
          borderColor: isLight ? "rgba(20,17,12,0.12)" : "rgba(255,255,255,0.08)",
        }}
      >
        <Typography
          sx={{
            fontFamily: "var(--joy-fontFamily-display)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 700,
            fontSize: 17,
            color: "inherit",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontFamily: "var(--joy-fontFamily-code)",
            fontSize: 12,
            color: isLight ? "rgba(20,17,12,0.55)" : "neutral.400",
          }}
        >
          {team.length} · {totalRank(team)}pt
        </Typography>
      </Stack>

      {team.length > 0 ? (
        <Stack spacing={0.25}>
          {team.map((player) => (
            <Stack
              key={player.id}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ py: 0.5, px: 0.25 }}
            >
              <Typography level="body-sm" sx={{ color: "inherit" }} noWrap>
                {player.name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "var(--joy-fontFamily-code)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: isLight ? "rgba(20,17,12,0.5)" : "neutral.400",
                  pl: 1,
                }}
              >
                {player.rank}
              </Typography>
            </Stack>
          ))}
        </Stack>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 72,
          }}
        >
          <Typography
            level="body-sm"
            sx={{ color: isLight ? "rgba(20,17,12,0.4)" : "neutral.500" }}
          >
            No players yet
          </Typography>
        </Box>
      )}
    </Sheet>
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        alignItems="stretch"
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {renderTeam(sortedDarkTeam, "Dark", false)}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {renderTeam(sortedLightTeam, "Light", true)}
        </Box>
      </Stack>
    </Box>
  );
};

export default TeamPanel;
