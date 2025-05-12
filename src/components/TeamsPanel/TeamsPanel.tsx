import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemContent,
  Typography,
  Chip,
  Sheet,
  Grid,
  Avatar,
  Stack,
} from "@mui/joy";
import { JSX } from "@emotion/react/jsx-runtime";
import { PlayerDef } from "../PlayerList/PlayerList";
/**
 * Props interface for TeamPanel component
 */
interface TeamPanelProps {
  darkTeam: PlayerDef[];
  lightTeam: PlayerDef[];
}

/**
 * TeamPanel component displays two teams side by side
 */
const TeamPanel: React.FC<TeamPanelProps> = ({
  darkTeam = [],
  lightTeam = [],
}) => {
  // Sort players by rank (highest to lowest)
  const sortedDarkTeam: PlayerDef[] = [...darkTeam].sort(
    (a, b) => (b.rank ?? 0) - (a.rank ?? 0),
  );

  const sortedLightTeam: PlayerDef[] = [...lightTeam].sort(
    (a, b) => (b.rank ?? 0) - (a.rank ?? 0),
  );

  /**
   * Renders a single player item
   */
  const renderPlayer = (player: PlayerDef): JSX.Element => {
    // Get initials from name
    const initials: string = player.name
      .split(" ")
      .map((word: string) => word[0])
      .join("")
      .toUpperCase();

    return (
      <ListItem
        key={player.id}
        sx={{
          borderRadius: "sm",
          "&:hover": { bgcolor: "background.level1" },
        }}
      >
        <Avatar size="sm">{initials}</Avatar>
        <ListItemContent sx={{ ml: 1 }}>
          <Typography level="body-md">{player.name}</Typography>
          <Typography level="body-xs" color="neutral">
            Rank: {player.rank}
          </Typography>
        </ListItemContent>
      </ListItem>
    );
  };

  /**
   * Renders a team section
   */
  const renderTeam = (
    team: PlayerDef[],
    title: string,
    color: any,
  ): JSX.Element => (
    <Sheet
      variant="outlined"
      sx={{
        borderRadius: "md",
        p: 2,
        height: "100%",
        borderColor: `${color}.300`,
        boxShadow: "sm",
      }}
    >
      <Typography
        level="title-md"
        sx={{
          mb: 2,
          textAlign: "center",
          color: `${color}.600`,
          pb: 1,
          borderBottom: 1,
          borderColor: `${color}.200`,
        }}
      >
        {title} Team ({team.length} {team.length === 1 ? "Player" : "Players"})
      </Typography>

      {team.length > 0 ? (
        <List sx={{ px: 1 }}>{team.map(renderPlayer)}</List>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
          }}
        >
          <Typography level="body-sm" color="neutral">
            No players
          </Typography>
        </Box>
      )}

      <Stack
        direction="row"
        spacing={1}
        sx={{ mt: 2, justifyContent: "center" }}
      >
        <Chip size="sm" variant="soft" color={color}>
          Total Rank: {team.reduce((sum, p) => sum + (p.rank ?? 0), 0)}
        </Chip>
      </Stack>
    </Sheet>
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={12} md={6}>
          {renderTeam(sortedDarkTeam, "Dark", "primary")}
        </Grid>
        <Grid xs={12} md={6}>
          {renderTeam(sortedLightTeam, "Light", "warning")}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeamPanel;
