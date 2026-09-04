import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import TeamsPanel from "../TeamsPanel/TeamsPanel";
import { PlayerDef } from "../../types";
import { teamRank } from "../../lib/teams";

export default function TeamsStep({
  teams,
  onReshuffle,
  onBack,
  onContinue,
}: {
  teams: PlayerDef[][];
  onReshuffle: () => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  const gap = Math.abs(teamRank(teams[0] ?? []) - teamRank(teams[1] ?? []));

  return (
    <Box className="stepEnter">
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "stretch", md: "center" }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Stack direction="row" alignItems="baseline" spacing={2}>
          <Typography
            sx={{
              fontFamily: "var(--joy-fontFamily-display)",
              fontSize: { xs: 34, sm: 42 },
              lineHeight: 1.05,
            }}
          >
            Teams
          </Typography>
          <Typography sx={{ fontSize: 14.5, color: "text.tertiary", whiteSpace: "nowrap" }}>
            {gap === 0 ? "Perfectly even" : `${gap} pt spread`}
          </Typography>
        </Stack>

        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<AutorenewRoundedIcon sx={{ fontSize: 18 }} />}
          onClick={onReshuffle}
          sx={{ fontWeight: 600, bgcolor: "background.surface" }}
        >
          Reshuffle
        </Button>
      </Stack>

      <TeamsPanel darkTeam={teams[0] ?? []} lightTeam={teams[1] ?? []} />

      <Stack
        direction={{ xs: "column-reverse", sm: "row" }}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
        spacing={1.5}
        sx={{ mt: 2.5 }}
      >
        <Button
          variant="plain"
          color="neutral"
          startDecorator={<ArrowBackRoundedIcon sx={{ fontSize: 18 }} />}
          onClick={onBack}
          sx={{ fontWeight: 500 }}
        >
          Back to attendance
        </Button>

        <Button
          size="lg"
          variant="solid"
          color="primary"
          endDecorator={<ArrowForwardRoundedIcon />}
          onClick={onContinue}
          sx={{ fontWeight: 600, borderRadius: "md" }}
        >
          Export
        </Button>
      </Stack>
    </Box>
  );
}
