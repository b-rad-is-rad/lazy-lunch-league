import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

export const STEPS = ["Attendance", "Teams", "Export"];

/** Linear progress across the three things you came here to do. */
export default function Stepper({
  step,
  maxStep,
  onSelect,
}: {
  step: number;
  maxStep: number;
  onSelect: (i: number) => void;
}) {
  return (
    <Stack direction="row" alignItems="center" spacing={{ xs: 0.75, sm: 1.5 }}>
      {STEPS.map((label, i) => {
        const done = i < step;
        const active = i === step;
        const reachable = i <= maxStep;

        return (
          <Stack key={label} direction="row" alignItems="center" spacing={{ xs: 0.75, sm: 1.5 }}>
            {i > 0 && (
              <Box
                sx={{
                  width: { xs: 14, sm: 28 },
                  height: "1px",
                  bgcolor: done || active ? "primary.200" : "neutral.200",
                }}
              />
            )}
            <Stack
              component="button"
              type="button"
              disabled={!reachable}
              onClick={() => reachable && onSelect(i)}
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                border: "none",
                bgcolor: "transparent",
                p: 0,
                fontFamily: "inherit",
                cursor: reachable ? "pointer" : "default",
                opacity: reachable ? 1 : 0.45,
              }}
            >
              <Box
                sx={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 12,
                  fontWeight: 600,
                  transition: "all 160ms ease",
                  bgcolor: active
                    ? "primary.500"
                    : done
                      ? "primary.100"
                      : "neutral.200",
                  color: active ? "#fff" : done ? "primary.600" : "neutral.500",
                }}
              >
                {done ? <CheckRoundedIcon sx={{ fontSize: 14 }} /> : i + 1}
              </Box>
              <Typography
                sx={{
                  display: { xs: active ? "block" : "none", sm: "block" },
                  fontSize: 14,
                  fontWeight: active ? 600 : 500,
                  color: active ? "text.primary" : "text.tertiary",
                }}
              >
                {label}
              </Typography>
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
}
