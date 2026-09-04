import React from "react";
import Box from "@mui/joy/Box";
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
  <Box sx={{ flex: 1, minWidth: 0 }}>
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ pb: 1.25, mb: 0.5, borderBottom: "2px solid", borderColor: "neutral.900" }}
    >
      <Stack direction="row" alignItems="center" spacing={1.25}>
        <Box
          sx={{
            width: 11,
            height: 11,
            borderRadius: "50%",
            bgcolor: swatch,
            border: "1px solid",
            borderColor: "neutral.400",
          }}
        />
        <Typography sx={{ fontSize: 15, fontWeight: 700 }}>{title}</Typography>
      </Stack>
      <Typography
        sx={{
          fontFamily: "var(--joy-fontFamily-code)",
          fontSize: 12.5,
          color: "text.tertiary",
        }}
      >
        {team.length} · {teamRank(team)}pt
      </Typography>
    </Stack>

    {team.length === 0 ? (
      <Typography sx={{ py: 3, fontSize: 14, color: "text.tertiary" }}>
        No players
      </Typography>
    ) : (
      [...team]
        .sort((a, b) => (b.rank ?? 0) - (a.rank ?? 0))
        .map((p) => (
          <Stack
            key={p.id}
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{
              py: 1,
              borderBottom: "1px solid",
              borderColor: "divider",
              "&:last-of-type": { borderBottom: "none" },
            }}
          >
            <InitialsAvatar name={p.name} size={30} />
            <Typography sx={{ flex: 1, minWidth: 0, fontSize: 14.5, fontWeight: 500 }} noWrap>
              {p.name}
            </Typography>
            <Typography
              sx={{
                fontFamily: "var(--joy-fontFamily-code)",
                fontSize: 13,
                color: "text.tertiary",
              }}
            >
              {p.rank}
            </Typography>
          </Stack>
        ))
    )}
  </Box>
);

const TeamPanel: React.FC<TeamPanelProps> = ({
  darkTeam = [],
  lightTeam = [],
}) => (
  <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 3, sm: 6 }}>
    <Team team={darkTeam} title="Dark" swatch="#26292F" />
    <Team team={lightTeam} title="Light" swatch="#FFFFFF" />
  </Stack>
);

export default TeamPanel;
