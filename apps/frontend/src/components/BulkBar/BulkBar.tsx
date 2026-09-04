import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Action = ({
  children,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) => (
  <Box
    component="button"
    type="button"
    onClick={onClick}
    sx={{
      border: "none",
      bgcolor: "transparent",
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: 13.5,
      fontWeight: 600,
      whiteSpace: "nowrap",
      px: 1.25,
      py: 0.75,
      borderRadius: "sm",
      color: danger ? "#FF9A93" : "rgba(255,255,255,0.92)",
      transition: "background-color 130ms ease",
      "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
    }}
  >
    {children}
  </Box>
);

/** Floating bar that appears only while rows are selected. */
export default function BulkBar({
  count,
  onMarkIn,
  onMarkOut,
  onRemove,
  onClear,
}: {
  count: number;
  onMarkIn: () => void;
  onMarkOut: () => void;
  onRemove: () => void;
  onClear: () => void;
}) {
  if (count === 0) return null;

  return (
    // Centring lives on this wrapper rather than a transform, because the
    // entrance animation animates transform and would clobber it.
    <Box
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: { xs: 14, sm: 26 },
        zIndex: 30,
        display: "flex",
        justifyContent: "center",
        px: 1.25,
        pointerEvents: "none",
      }}
    >
      <Stack
        className="riseIn"
        direction="row"
        alignItems="center"
        spacing={{ xs: 0.25, sm: 0.75 }}
        sx={{
          pointerEvents: "auto",
          maxWidth: "100%",
          bgcolor: "neutral.900",
          borderRadius: "999px",
          pl: 2,
          pr: 0.75,
          py: 0.75,
          boxShadow: "0 8px 30px rgba(0,0,0,0.28)",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 13, sm: 13.5 },
            fontWeight: 600,
            color: "#fff",
            whiteSpace: "nowrap",
            mr: 0.5,
          }}
        >
          {count} selected
        </Typography>
        {/* "Mark" is dropped on narrow screens so the bar never needs to scroll. */}
        <Action onClick={onMarkIn}>
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            Mark&nbsp;
          </Box>
          In
        </Action>
        <Action onClick={onMarkOut}>
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            Mark&nbsp;
          </Box>
          Out
        </Action>
        <Action onClick={onRemove} danger>
          Remove
        </Action>
        <Box
          component="button"
          type="button"
          aria-label="Clear selection"
          onClick={onClear}
          sx={{
            border: "none",
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            width: 30,
            height: 30,
            flexShrink: 0,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.1)",
            color: "#fff",
            "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
          }}
        >
          <CloseRoundedIcon sx={{ fontSize: 17 }} />
        </Box>
      </Stack>
    </Box>
  );
}
