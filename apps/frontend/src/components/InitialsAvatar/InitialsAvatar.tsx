import Box from "@mui/joy/Box";

const TINTS = [
  { bg: "#E8EDFF", fg: "#3B5BEA" },
  { bg: "#E4F5EE", fg: "#12805C" },
  { bg: "#FDEBE7", fg: "#C0452B" },
  { bg: "#F3EAFB", fg: "#7B3FBF" },
  { bg: "#FFF2DC", fg: "#9A6412" },
  { bg: "#E3F2F8", fg: "#12708F" },
];

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

/** Soft tinted initials disc, picked deterministically from the name. */
export default function InitialsAvatar({
  name,
  size = 36,
  muted = false,
}: {
  name: string;
  size?: number;
  muted?: boolean;
}) {
  const label = initials(name);
  const tint = TINTS[
    [...name].reduce((sum, c) => sum + c.charCodeAt(0), 0) % TINTS.length
  ];

  return (
    <Box
      aria-hidden
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        fontSize: size * 0.36,
        fontWeight: 600,
        letterSpacing: "0.01em",
        bgcolor: muted || !label ? "neutral.100" : tint.bg,
        color: muted || !label ? "neutral.400" : tint.fg,
        transition: "opacity 150ms ease",
      }}
    >
      {label || "?"}
    </Box>
  );
}
