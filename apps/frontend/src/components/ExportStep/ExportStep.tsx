import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { PlayerDef } from "../../types";
import { downloadRosterCsv, downloadRosterPdf } from "../../lib/exports";

const Card = ({
  icon,
  title,
  caption,
  action,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  caption: string;
  action: string;
  onClick: () => void;
}) => (
  <Sheet
    variant="outlined"
    sx={{
      flex: 1,
      minWidth: 0,
      borderRadius: "lg",
      borderColor: "divider",
      bgcolor: "background.surface",
      p: 3,
      display: "flex",
      flexDirection: "column",
      gap: 1,
      transition: "border-color 160ms ease, box-shadow 160ms ease",
      "&:hover": {
        borderColor: "primary.200",
        boxShadow: "0 1px 3px rgba(20,25,34,0.06)",
      },
    }}
  >
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: "md",
        display: "grid",
        placeItems: "center",
        bgcolor: "primary.50",
        color: "primary.600",
        mb: 1,
      }}
    >
      {icon}
    </Box>
    <Typography sx={{ fontSize: 16, fontWeight: 600 }}>{title}</Typography>
    <Typography sx={{ fontSize: 14, lineHeight: 1.6, color: "text.secondary", mb: 2 }}>
      {caption}
    </Typography>
    <Button
      variant="outlined"
      color="neutral"
      onClick={onClick}
      sx={{ mt: "auto", alignSelf: "flex-start", fontWeight: 600 }}
    >
      {action}
    </Button>
  </Sheet>
);

export default function ExportStep({
  teams,
  onBack,
  onDone,
}: {
  teams: PlayerDef[][];
  onBack: () => void;
  onDone: () => void;
}) {
  const total = (teams[0]?.length ?? 0) + (teams[1]?.length ?? 0);

  return (
    <Box className="stepEnter">
      <Stack direction="row" alignItems="baseline" spacing={2} sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontFamily: "var(--joy-fontFamily-display)",
            fontSize: { xs: 34, sm: 42 },
            lineHeight: 1.05,
          }}
        >
          Export
        </Typography>
        <Typography sx={{ fontSize: 14.5, color: "text.tertiary" }}>
          {total} players across 2 teams
        </Typography>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Card
          icon={<DescriptionOutlinedIcon />}
          title="Spreadsheet"
          caption="A two-column CSV of the Dark and Light rosters, sorted alphabetically."
          action="Download CSV"
          onClick={() => downloadRosterCsv(teams)}
        />
        <Card
          icon={<PictureAsPdfOutlinedIcon />}
          title="Printable sheet"
          caption="A clean PDF table you can print or drop into a group chat."
          action="Download PDF"
          onClick={() => downloadRosterPdf(teams)}
        />
      </Stack>

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
          Back to teams
        </Button>
        <Button
          variant="plain"
          color="neutral"
          onClick={onDone}
          sx={{ fontWeight: 500, color: "text.tertiary" }}
        >
          Start over
        </Button>
      </Stack>
    </Box>
  );
}
