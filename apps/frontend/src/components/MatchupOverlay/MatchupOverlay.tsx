import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Modal from "@mui/joy/Modal";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import TeamsPanel from "../TeamsPanel/TeamsPanel";
import { PlayerDef } from "../../types";
import { teamRank } from "../../lib/teams";
import { downloadRosterCsv, downloadRosterPdf } from "../../lib/exports";

/**
 * The result surface. Drawing teams doesn't navigate anywhere — it lifts a
 * sheet over the roster so exporting and leaving is two clicks from here.
 */
export default function MatchupOverlay({
  open,
  teams,
  onReshuffle,
  onClose,
}: {
  open: boolean;
  teams: PlayerDef[][];
  onReshuffle: () => void;
  onClose: () => void;
}) {
  const gap = Math.abs(teamRank(teams[0] ?? []) - teamRank(teams[1] ?? []));

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        // Joy's Modal root is display:block, so opt into flex to centre.
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflowY: "auto",
        "& .MuiModal-backdrop": { backdropFilter: "blur(2px)" },
      }}
    >
      <Box
        className="popIn"
        sx={{
          outline: "none",
          mt: { xs: 2, sm: "7vh" },
          mb: 2,
          mx: 1.5,
          width: "min(720px, calc(100vw - 24px))",
          maxHeight: { xs: "94dvh", sm: "84dvh" },
          overflowY: "auto",
          bgcolor: "background.surface",
          borderRadius: "lg",
          border: "1px solid",
          borderColor: "neutral.200",
          boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
        }}
      >
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{ px: { xs: 2.5, sm: 4 }, pt: { xs: 2.5, sm: 3.5 }, pb: 2 }}
        >
          <Box>
            <Typography sx={{ fontSize: { xs: 24, sm: 28 }, fontWeight: 800, lineHeight: 1.15 }}>
              Today's matchup
            </Typography>
            <Typography sx={{ fontSize: 14, color: "text.tertiary", mt: 0.5 }}>
              {gap === 0 ? "Dead even on points" : `${gap} point spread`}
            </Typography>
          </Box>
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onClick={onClose}
            aria-label="Close matchup"
          >
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <Box sx={{ px: { xs: 2.5, sm: 4 }, pb: 2 }}>
          <TeamsPanel darkTeam={teams[0] ?? []} lightTeam={teams[1] ?? []} />
        </Box>

        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          alignItems={{ xs: "stretch", sm: "center" }}
          justifyContent="space-between"
          spacing={1.25}
          sx={{
            px: { xs: 2.5, sm: 4 },
            py: 2.5,
            borderTop: "1px solid",
            borderColor: "divider",
            bgcolor: "neutral.50",
            borderBottomLeftRadius: "13px",
            borderBottomRightRadius: "13px",
          }}
        >
          <Button
            variant="plain"
            color="neutral"
            startDecorator={<AutorenewRoundedIcon sx={{ fontSize: 18 }} />}
            onClick={onReshuffle}
            sx={{ fontWeight: 600 }}
          >
            Reshuffle
          </Button>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => downloadRosterPdf(teams)}
              sx={{ bgcolor: "background.surface", fontWeight: 600 }}
            >
              PDF
            </Button>
            <Button
              variant="solid"
              color="primary"
              onClick={() => downloadRosterCsv(teams)}
              sx={{ fontWeight: 600 }}
            >
              Download CSV
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
