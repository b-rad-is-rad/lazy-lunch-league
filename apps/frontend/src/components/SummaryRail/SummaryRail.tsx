import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { PlayerDef, RANKS } from "../../types";

const Stat = ({ label, value }: { label: string; value: string }) => (
  <Stack direction="row" alignItems="baseline" justifyContent="space-between">
    <Typography sx={{ fontSize: 14, color: "text.secondary" }}>{label}</Typography>
    <Typography
      sx={{ fontFamily: "var(--joy-fontFamily-code)", fontSize: 14, fontWeight: 600 }}
    >
      {value}
    </Typography>
  </Stack>
);

/** Live read-out of the roster: who's in, and how the ranks are distributed. */
export default function SummaryRail({
  players,
  onImport,
  onMarkAllOut,
}: {
  players: PlayerDef[];
  onImport: () => void;
  onMarkAllOut: () => void;
}) {
  const attending = players.filter((p) => p.attending);
  const points = attending.reduce((s, p) => s + (p.rank ?? 0), 0);
  const perTeam = Math.floor(attending.length / 2);
  const spread = RANKS.map((r) => ({
    rank: r,
    count: attending.filter((p) => p.rank === r).length,
  }));
  const max = Math.max(...spread.map((s) => s.count), 1);

  return (
    <Box
      component="aside"
      sx={{
        width: { xs: "100%", lg: 268 },
        flexShrink: 0,
        bgcolor: "neutral.50",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "lg",
        p: 2.5,
        position: { lg: "sticky" },
        top: { lg: 88 },
      }}
    >
      <Typography sx={{ fontSize: 15, fontWeight: 700, mb: 2 }}>
        This session
      </Typography>

      <Stack spacing={1.25}>
        <Stat label="Playing" value={`${attending.length}`} />
        <Stat label="On the bench" value={`${players.length - attending.length}`} />
        <Stat
          label="Teams of"
          value={
            attending.length < 2
              ? "–"
              : attending.length % 2 === 0
                ? `${perTeam}`
                : `${perTeam}/${perTeam + 1}`
          }
        />
        <Stat label="Total points" value={`${points}`} />
      </Stack>

      <Divider sx={{ my: 2.5 }} />

      <Typography
        sx={{
          fontSize: 11.5,
          fontWeight: 700,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: "text.tertiary",
          mb: 1.5,
        }}
      >
        Rank spread
      </Typography>

      <Stack spacing={0.75}>
        {spread.map((s) => (
          <Stack key={s.rank} direction="row" alignItems="center" spacing={1.25}>
            <Typography
              sx={{
                fontFamily: "var(--joy-fontFamily-code)",
                fontSize: 12,
                color: "text.tertiary",
                width: 10,
              }}
            >
              {s.rank}
            </Typography>
            <Box
              sx={{
                flex: 1,
                height: 6,
                borderRadius: "999px",
                bgcolor: "neutral.200",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: `${(s.count / max) * 100}%`,
                  height: "100%",
                  bgcolor: s.count ? "primary.400" : "transparent",
                  transition: "width 240ms ease",
                }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: "var(--joy-fontFamily-code)",
                fontSize: 12,
                color: "text.tertiary",
                width: 14,
                textAlign: "right",
              }}
            >
              {s.count}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 2.5 }} />

      <Stack spacing={1}>
        <Button
          variant="outlined"
          color="neutral"
          size="sm"
          onClick={onImport}
          sx={{ bgcolor: "background.surface", fontWeight: 600, justifyContent: "flex-start" }}
        >
          Import attendance CSV
        </Button>
        <Button
          variant="plain"
          color="neutral"
          size="sm"
          onClick={onMarkAllOut}
          sx={{ fontWeight: 500, color: "text.tertiary", justifyContent: "flex-start" }}
        >
          Mark everyone out
        </Button>
      </Stack>
    </Box>
  );
}
