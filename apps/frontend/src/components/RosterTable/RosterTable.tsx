import Box from "@mui/joy/Box";
import Checkbox from "@mui/joy/Checkbox";
import Input from "@mui/joy/Input";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import InitialsAvatar from "../InitialsAvatar/InitialsAvatar";
import { PlayerDef, RANKS } from "../../types";
import styles from "./RosterTable.module.css";

const StatusPill = ({
  attending,
  onClick,
}: {
  attending: boolean;
  onClick: () => void;
}) => (
  <Box
    component="button"
    type="button"
    aria-pressed={attending}
    onClick={onClick}
    sx={{
      cursor: "pointer",
      border: "1px solid",
      borderColor: attending ? "primary.200" : "neutral.300",
      bgcolor: attending ? "primary.50" : "transparent",
      color: attending ? "primary.700" : "neutral.500",
      fontFamily: "inherit",
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.02em",
      width: 50,
      height: 28,
      borderRadius: "999px",
      flexShrink: 0,
      transition: "all 130ms ease",
      "&:hover": { filter: "brightness(0.97)" },
    }}
  >
    {attending ? "In" : "Out"}
  </Box>
);

export default function RosterTable({
  players,
  selected,
  onToggleSelect,
  onToggleAll,
  onChange,
  emptyMessage,
}: {
  players: PlayerDef[];
  selected: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleAll: () => void;
  onChange: (id: string, change: Partial<PlayerDef>) => void;
  emptyMessage: string;
}) {
  const allSelected = players.length > 0 && players.every((p) => selected.has(p.id));
  const someSelected = players.some((p) => selected.has(p.id));

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        spacing={{ xs: 1.25, sm: 2 }}
        sx={{
          px: 1,
          pb: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Checkbox
          size="sm"
          checked={allSelected}
          indeterminate={someSelected && !allSelected}
          onChange={onToggleAll}
          slotProps={{ input: { "aria-label": "Select all players" } }}
        />
        <Typography
          sx={{
            flex: 1,
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "text.tertiary",
          }}
        >
          Player
        </Typography>
        <Typography
          sx={{
            width: { xs: 62, sm: 96 },
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "text.tertiary",
          }}
        >
          Rank
        </Typography>
        <Typography
          sx={{
            width: 50,
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "text.tertiary",
          }}
        >
          In
        </Typography>
      </Stack>

      {players.length === 0 ? (
        <Typography
          sx={{ py: 7, textAlign: "center", fontSize: 14.5, color: "text.tertiary" }}
        >
          {emptyMessage}
        </Typography>
      ) : (
        players.map((p) => {
          const isSelected = selected.has(p.id);
          return (
            <Stack
              key={p.id}
              direction="row"
              alignItems="center"
              spacing={{ xs: 1.25, sm: 2 }}
              className={`${styles.row} ${isSelected ? styles.selected : ""} ${
                p.attending ? "" : styles.out
              }`}
            >
              <Checkbox
                size="sm"
                checked={isSelected}
                onChange={() => onToggleSelect(p.id)}
                slotProps={{
                  input: { "aria-label": `Select ${p.name || "unnamed player"}` },
                }}
              />

              <Stack
                direction="row"
                alignItems="center"
                spacing={1.5}
                sx={{ flex: 1, minWidth: 0 }}
              >
                <InitialsAvatar name={p.name} size={32} muted={!p.attending} />
                <Input
                  placeholder="Add a name"
                  variant="plain"
                  value={p.name}
                  onChange={(e) => onChange(p.id, { name: e.target.value })}
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    "--Input-paddingInline": "6px",
                    bgcolor: "transparent",
                    fontSize: 15,
                    fontWeight: 500,
                    "&::before": { display: "none" },
                    "&:hover, &:focus-within": { bgcolor: "neutral.100" },
                  }}
                />
              </Stack>

              <Select
                value={p.rank}
                onChange={(_, v) => onChange(p.id, { rank: v as number })}
                variant="plain"
                size="sm"
                placeholder="–"
                indicator={<KeyboardArrowDownRoundedIcon />}
                slotProps={{ listbox: { placement: "bottom-end" } }}
                sx={{
                  width: { xs: 62, sm: 96 },
                  flexShrink: 0,
                  bgcolor: "neutral.100",
                  fontFamily: "var(--joy-fontFamily-code)",
                  fontSize: 13,
                  fontWeight: 500,
                  "&:hover": { bgcolor: "neutral.200" },
                }}
              >
                {RANKS.map((r) => (
                  <Option key={r} value={r} sx={{ fontFamily: "var(--joy-fontFamily-code)" }}>
                    {r}
                  </Option>
                ))}
              </Select>

              <StatusPill
                attending={p.attending}
                onClick={() => onChange(p.id, { attending: !p.attending })}
              />
            </Stack>
          );
        })
      )}
    </Box>
  );
}
