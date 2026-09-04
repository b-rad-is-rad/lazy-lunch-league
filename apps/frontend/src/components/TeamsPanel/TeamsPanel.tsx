import React from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import InitialsAvatar from "../InitialsAvatar/InitialsAvatar";
import { PlayerDef } from "../../types";
import { teamRank } from "../../lib/teams";

interface TeamPanelProps {
  darkTeam: PlayerDef[];
  lightTeam: PlayerDef[];
}

const Team = ({
  team,
  title,
  swatch,
}: {
  team: PlayerDef[];
  title: string;
  swatch: string;
}) => (
  <Sheet
    variant="outlined"
    sx={{
      flex: 1,
      minWidth: 0,
      borderRadius: "lg",
      borderColor: "divider",
      bgcolor: "background.surface",
      overflow: "hidden",
    }}
  >
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ px: 2.5, py: 1.75, borderBottom: "1px solid", borderColor: "divider" }}
    >
      <Stack direction="row" alignItems="center" spacing={1.25}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: swatch,
            border: "1px solid",
            borderColor: "neutral.300",
          }}
        />
        <Typography sx={{ fontSize: 15, fontWeight: 600 }}>{title}</Typography>
      </Stack>
      <Typography sx={{ fontSize: 13, color: "text.tertiary" }}>
        {team.length} players · {teamRank(team)} pts
      </Typography>
    </Stack>

    {team.length === 0 ? (
      <Typography
        sx={{ px: 2.5, py: 4, textAlign: "center", fontSize: 14, color: "text.tertiary" }}
      >
        No players yet
      </Typography>
    ) : (
      <Box sx={{ px: 1.5, py: 0.5 }}>
        {[...team]
          .sort((a, b) => (b.rank ?? 0) - (a.rank ?? 0))
          .map((p) => (
            <Stack
              key={p.id}
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{
                px: 1,
                py: 1,
                borderBottom: "1px solid",
                borderColor: "divider",
                "&:last-of-type": { borderBottom: "none" },
              }}
            >
              <InitialsAvatar name={p.name} size={30} />
              <Typography sx={{ flex: 1, minWidth: 0, fontSize: 14.5 }} noWrap>
                {p.name}
              </Typography>
              <Typography sx={{ fontSize: 13, color: "text.tertiary" }}>
                {p.rank}
              </Typography>
            </Stack>
          ))}
      </Box>
    )}
  </Sheet>
);

const TeamPanel: React.FC<TeamPanelProps> = ({
  darkTeam = [],
  lightTeam = [],
}) => (
  <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="stretch">
    <Team team={darkTeam} title="Dark" swatch="#2B3242" />
    <Team team={lightTeam} title="Light" swatch="#FFFFFF" />
  </Stack>
);

export default TeamPanel;
