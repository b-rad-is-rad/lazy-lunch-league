import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import IconButton from "@mui/joy/IconButton";
import Tooltip from "@mui/joy/Tooltip";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import InitialsAvatar from "../InitialsAvatar/InitialsAvatar";
import { PlayerDef, RANKS } from "../../types";
import styles from "./PlayerRow.module.css";

/**
 * One roster line: avatar, editable name, rank pill, in/out pill, remove.
 * The name is a borderless input that only reveals its field on interaction,
 * so a settled roster reads as plain text.
 */
export default function PlayerRow({
  player,
  onChange,
  onRemove,
}: {
  player: PlayerDef;
  onChange: (id: string, change: Partial<PlayerDef>) => void;
  onRemove: (id: string) => void;
}) {
  const { id, name, rank, attending } = player;

  return (
    <Box className={`${styles.row} ${attending ? "" : styles.out}`}>
      <InitialsAvatar name={name} muted={!attending} />

      <Input
        placeholder="Add a name"
        variant="plain"
        value={name}
        onChange={(e) => onChange(id, { name: e.target.value })}
        sx={{
          flex: 1,
          minWidth: 0,
          "--Input-paddingInline": "8px",
          bgcolor: "transparent",
          fontSize: 15,
          fontWeight: 500,
          color: "text.primary",
          "&:hover": { bgcolor: "neutral.100" },
          "&::before": { display: "none" },
          "&:focus-within": { bgcolor: "neutral.100" },
        }}
      />

      <Select
        value={rank}
        onChange={(_, v) => onChange(id, { rank: v as number })}
        placeholder="Rank"
        variant="plain"
        size="sm"
        indicator={<KeyboardArrowDownRoundedIcon />}
        slotProps={{ listbox: { placement: "bottom-end" } }}
        // Drops to a bare number on narrow screens so the name keeps its room.
        renderValue={(opt) => (
          <>
            <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
              Rank&nbsp;
            </Box>
            {opt?.value ?? "–"}
          </>
        )}
        sx={{
          flexShrink: 0,
          width: { xs: 62, sm: 96 },
          bgcolor: "neutral.100",
          fontWeight: 500,
          color: "text.secondary",
          "&:hover": { bgcolor: "neutral.200" },
        }}
      >
        {RANKS.map((r) => (
          <Option key={r} value={r}>
            Rank {r}
          </Option>
        ))}
      </Select>

      <Box
        component="button"
        type="button"
        aria-pressed={attending}
        onClick={() => onChange(id, { attending: !attending })}
        sx={{
          flexShrink: 0,
          cursor: "pointer",
          border: "1px solid",
          borderColor: attending ? "transparent" : "neutral.300",
          bgcolor: attending ? "#E4F5EE" : "transparent",
          color: attending ? "#12805C" : "neutral.500",
          fontFamily: "inherit",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.02em",
          width: 52,
          height: 30,
          borderRadius: "999px",
          transition: "all 140ms ease",
          "&:hover": { filter: "brightness(0.97)" },
        }}
      >
        {attending ? "In" : "Out"}
      </Box>

      <Tooltip title="Remove player" size="sm" variant="outlined">
        <IconButton
          className={styles.remove}
          size="sm"
          variant="plain"
          color="neutral"
          onClick={() => onRemove(id)}
          sx={{
            flexShrink: 0,
            "&:hover": { color: "danger.500", bgcolor: "danger.50" },
          }}
        >
          <PersonRemoveOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
