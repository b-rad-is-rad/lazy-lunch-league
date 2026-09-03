import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Chip from "@mui/joy/Chip";
import IconButton from "@mui/joy/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { PlayerDef } from "../PlayerList/PlayerList";
import styles from "./Player.module.css";

export const ranks = ["5", "4", "3", "2", "1"];

function Player({
  id,
  name,
  rank,
  attending,
  handleChange,
  handleRemove,
}: PlayerDef & {
  handleChange: (id: string, change: Partial<PlayerDef>) => void;
  handleRemove: (id: string) => void;
}) {
  return (
    <div className={styles.row}>
      <Chip
        size="sm"
        variant={attending ? "solid" : "outlined"}
        color={attending ? "success" : "neutral"}
        onClick={() =>
          handleChange(id, {
            attending: !attending,
          })
        }
        sx={{
          fontFamily: "var(--joy-fontFamily-code)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.04em",
          justifyContent: "center",
          minWidth: 44,
          cursor: "pointer",
        }}
      >
        {attending ? "IN" : "OUT"}
      </Chip>
      <Input
        placeholder="Player name"
        variant="plain"
        size="sm"
        color="neutral"
        value={name}
        onChange={(e) => {
          handleChange(id, {
            name: e.target.value,
          });
        }}
        sx={{
          fontWeight: 500,
          color: "text.primary",
          "--Input-focusedThickness": "1.5px",
          "&:hover": { bgcolor: "background.level2" },
        }}
      />
      <Select
        placeholder="Rank"
        name="rank"
        variant="plain"
        size="sm"
        indicator={null}
        sx={{
          fontFamily: "var(--joy-fontFamily-code)",
          fontWeight: 600,
          color: "text.primary",
          justifyContent: "center",
          "&:hover": { bgcolor: "background.level2" },
        }}
        value={rank?.toString()}
        onChange={(_, newRank) => {
          handleChange(id, {
            rank: Number(newRank),
          });
        }}
      >
        {ranks.map((r) => (
          <Option key={r} value={r}>
            {r}
          </Option>
        ))}
      </Select>
      <IconButton
        size="sm"
        color="danger"
        variant="plain"
        className={styles.removeBtn}
        onClick={() => {
          handleRemove(id);
        }}
        sx={{ minHeight: 32, minWidth: 32 }}
      >
        <CloseRoundedIcon fontSize="small" />
      </IconButton>
    </div>
  );
}

export default Player;
