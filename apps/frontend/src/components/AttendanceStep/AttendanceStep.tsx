import { useMemo, useRef, useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { v4 as uuidv4 } from "uuid";
import PlayerRow from "../PlayerRow/PlayerRow";
import { PlayerDef } from "../../types";
import { parseAttendanceCsv } from "../../lib/exports";

export default function AttendanceStep({
  players,
  setPlayers,
  onContinue,
}: {
  players: PlayerDef[];
  setPlayers: React.Dispatch<React.SetStateAction<PlayerDef[]>>;
  onContinue: () => void;
}) {
  const [query, setQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const attending = players.filter((p) => p.attending).length;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? players.filter((p) => p.name.toLowerCase().includes(q)) : players;
  }, [players, query]);

  const updatePlayer = (id: string, change: Partial<PlayerDef>) =>
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...change } : p)),
    );

  const removePlayer = (id: string) =>
    setPlayers((prev) => prev.filter((p) => p.id !== id));

  const addPlayer = () =>
    setPlayers((prev) => [
      ...prev,
      { id: uuidv4(), name: "", rank: 3, attending: true },
    ]);

  const setAllOut = () =>
    setPlayers((prev) => prev.map((p) => ({ ...p, attending: false })));

  const importCsv = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const names = parseAttendanceCsv(await file.text());

    setPlayers((prev) => {
      const updated = prev.map((p) =>
        names.some((n) => n.toLowerCase() === p.name.trim().toLowerCase())
          ? { ...p, attending: true }
          : p,
      );

      const known = new Set(updated.map((p) => p.name.trim().toLowerCase()));
      const added: PlayerDef[] = [];

      for (const name of names) {
        const key = name.toLowerCase();
        if (known.has(key)) continue;
        known.add(key);
        added.push({ id: uuidv4(), name, rank: 3, attending: true });
      }

      return [...updated, ...added];
    });
  };

  return (
    <Box className="stepEnter">
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "stretch", md: "center" }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Stack direction="row" alignItems="baseline" spacing={2}>
          <Typography
            sx={{
              fontFamily: "var(--joy-fontFamily-display)",
              fontSize: { xs: 34, sm: 42 },
              lineHeight: 1.05,
            }}
          >
            Attendance
          </Typography>
          <Typography sx={{ fontSize: 14.5, color: "text.tertiary", whiteSpace: "nowrap" }}>
            {attending} of {players.length} in
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1.25} alignItems="center">
          <Input
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            startDecorator={<SearchRoundedIcon sx={{ fontSize: 18 }} />}
            sx={{
              flex: { xs: 1, md: "initial" },
              width: { md: 200 },
              bgcolor: "neutral.100",
              borderColor: "transparent",
              "&:hover": { bgcolor: "neutral.200" },
            }}
          />
          <Button
            variant="solid"
            color="primary"
            startDecorator={<FileUploadOutlinedIcon sx={{ fontSize: 18 }} />}
            onClick={() => fileInputRef.current?.click()}
            sx={{ whiteSpace: "nowrap", fontWeight: 600 }}
          >
            Import CSV
          </Button>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={importCsv}
          />
        </Stack>
      </Stack>

      <Sheet
        variant="outlined"
        sx={{
          borderRadius: "lg",
          borderColor: "divider",
          bgcolor: "background.surface",
          px: { xs: 1.5, sm: 2.5 },
        }}
      >
        {visible.length === 0 ? (
          <Typography
            sx={{ py: 6, textAlign: "center", fontSize: 14.5, color: "text.tertiary" }}
          >
            {players.length === 0
              ? "No players yet — import a CSV or add someone."
              : `No players match “${query}”.`}
          </Typography>
        ) : (
          visible.map((p) => (
            <PlayerRow
              key={p.id}
              player={p}
              onChange={updatePlayer}
              onRemove={removePlayer}
            />
          ))
        )}
      </Sheet>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
        spacing={1.5}
        sx={{ mt: 2.5 }}
      >
        <Stack direction="row" spacing={1}>
          <Button
            variant="plain"
            color="neutral"
            startDecorator={<AddRoundedIcon sx={{ fontSize: 18 }} />}
            onClick={addPlayer}
            sx={{ fontWeight: 500 }}
          >
            Add player
          </Button>
          <Button
            variant="plain"
            color="neutral"
            onClick={setAllOut}
            sx={{ fontWeight: 500, color: "text.tertiary" }}
          >
            Mark all out
          </Button>
        </Stack>

        <Button
          size="lg"
          variant="solid"
          color="primary"
          disabled={attending < 2}
          endDecorator={<ArrowForwardRoundedIcon />}
          onClick={onContinue}
          sx={{ fontWeight: 600, borderRadius: "md" }}
        >
          Generate teams
        </Button>
      </Stack>
    </Box>
  );
}
