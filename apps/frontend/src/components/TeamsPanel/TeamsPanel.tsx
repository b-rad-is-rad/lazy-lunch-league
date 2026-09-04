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
  dark,
}: {
  team: PlayerDef[];
  title: string;
  swatch: string;
  dark?: boolean;
}) => (
  // Both sides stay white; the jersey is carried by the outline instead —
  // near-black for dark, light grey for light.
  <Box
    sx={{
      flex: 1,
      minWidth: 0,
      bgcolor: "background.surface",
      border: "2px solid",
      borderColor: dark ? "neutral.900" : "neutral.300",
      borderRadius: "lg",
      p: { xs: 1.75, sm: 2.25 },
    }}
  >
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        pb: 1.25,
        mb: 0.5,
        borderBottom: "2px solid",
        borderColor: dark ? "neutral.900" : "neutral.300",
      }}
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
  <Stack
    direction={{ xs: "column", sm: "row" }}
    spacing={{ xs: 1.5, sm: 2 }}
    alignItems="stretch"
  >
    <Team team={darkTeam} title="Dark" swatch="#26292F" dark />
    <Team team={lightTeam} title="Light" swatch="#FFFFFF" />
  </Stack>
);

export default TeamPanel;
