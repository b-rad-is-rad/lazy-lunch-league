import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Switch from "@mui/joy/Switch";
import { IconButton, Stack } from "@mui/joy";
import CancelIcon from "@mui/icons-material/Cancel";
import { PlayerDef } from "../PlayerList/PlayerList";

export const ranks = ["6", "5", "4", "3", "2", "1"];

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
    <Stack
      direction="row"
      spacing={1}
      sx={{
        width: 380,
        position: "relative",
      }}
    >
      <Input
        placeholder="Player Name"
        variant="outlined"
        size="sm"
        color="neutral"
        value={name}
        onChange={(e) => {
          handleChange(id, {
            name: e.target.value,
          });
        }}
        sx={{
          flexGrow: 1,
          maxWidth: 300,
        }}
      />
      <Select
        placeholder="Rank"
        name="rank"
        variant="outlined"
        size="sm"
        sx={{ minWidth: 100 }}
        value={rank?.toString()}
        onChange={(_, newRank) => {
          handleChange(id, {
            rank: Number(newRank),
          });
        }}
      >
        {ranks.map((r) => (
          <Option value={r}>{r}</Option>
        ))}
      </Select>
      <Switch
        checked={attending}
        onChange={(e) => {
          handleChange(id, {
            attending: e.target.checked,
          });
        }}
        color={attending ? "primary" : "neutral"}
        variant={attending ? "solid" : "outlined"}
        endDecorator={attending ? "In" : "Out"}
        slotProps={{
          endDecorator: {
            sx: {
              minWidth: 24,
            },
          },
        }}
      />
      <IconButton
        size="sm"
        color="danger"
        variant="plain"
        onClick={() => {
          handleRemove(id);
        }}
      >
        <CancelIcon />
      </IconButton>
    </Stack>
  );
}

export default Player;
