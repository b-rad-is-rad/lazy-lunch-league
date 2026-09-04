import { useEffect, useRef, useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import { v4 as uuidv4 } from "uuid";
import RosterTable from "../RosterTable/RosterTable";
import BulkBar from "../BulkBar/BulkBar";
import SummaryRail from "../SummaryRail/SummaryRail";
import MatchupOverlay from "../MatchupOverlay/MatchupOverlay";
import CommandPalette, { Command } from "../CommandPalette/CommandPalette";
import { Day, DAYS, PlayerDef } from "../../types";
import { generateTeams } from "../../lib/teams";
import { downloadRosterCsv, downloadRosterPdf, parseAttendanceCsv } from "../../lib/exports";
import { useRoster } from "../../hooks/useRoster";

const label = (d: string) => d[0].toUpperCase() + d.slice(1);

export default function Workspace({
  day,
  players,
  setPlayers,
  onSwitchDay,
  paletteOpen,
  setPaletteOpen,
}: {
  day: Day;
  players: PlayerDef[];
  setPlayers: React.Dispatch<React.SetStateAction<PlayerDef[]>>;
  onSwitchDay: (d: Day) => void;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
}) {
  const loading = useRoster(day, players, setPlayers);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [teams, setTeams] = useState<PlayerDef[][]>([[], []]);
  const [matchupOpen, setMatchupOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const attending = players.filter((p) => p.attending).length;

  // Removing a player would otherwise strand their id in the selection.
  useEffect(() => {
    setSelected((prev) => {
      const live = new Set(players.map((p) => p.id));
      const next = new Set([...prev].filter((id) => live.has(id)));
      return next.size === prev.size ? prev : next;
    });
  }, [players]);

  const updatePlayer = (id: string, change: Partial<PlayerDef>) =>
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, ...change } : p)));

  const addPlayer = () =>
    setPlayers((prev) => [
      ...prev,
      { id: uuidv4(), name: "", rank: 3, attending: true },
    ]);

  const markAllOut = () =>
    setPlayers((prev) => prev.map((p) => ({ ...p, attending: false })));

  const applyToSelected = (change: Partial<PlayerDef>) => {
    setPlayers((prev) =>
      prev.map((p) => (selected.has(p.id) ? { ...p, ...change } : p)),
    );
    setSelected(new Set());
  };

  const removeSelected = () => {
    setPlayers((prev) => prev.filter((p) => !selected.has(p.id)));
    setSelected(new Set());
  };

  const toggleSelect = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleAll = () =>
    setSelected((prev) =>
      players.length > 0 && players.every((p) => prev.has(p.id))
        ? new Set()
        : new Set(players.map((p) => p.id)),
    );

  const drawTeams = () => {
    setTeams(generateTeams(players));
    setMatchupOpen(true);
  };

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

  const hasTeams = teams[0].length > 0 || teams[1].length > 0;

  const commands: Command[] = [
    {
      id: "import",
      label: "Import attendance CSV",
      group: "Roster",
      run: () => fileInputRef.current?.click(),
    },
    { id: "add", label: "Add a player", group: "Roster", run: addPlayer },
    { id: "allout", label: "Mark everyone out", group: "Roster", run: markAllOut },
    {
      id: "draw",
      label: "Create teams",
      group: "Teams",
      hint: "↵",
      disabled: attending < 2,
      run: drawTeams,
    },
    {
      id: "view",
      label: "View last matchup",
      group: "Teams",
      disabled: !hasTeams,
      run: () => setMatchupOpen(true),
    },
    {
      id: "csv",
      label: "Download roster CSV",
      group: "Export",
      disabled: !hasTeams,
      run: () => downloadRosterCsv(teams),
    },
    {
      id: "pdf",
      label: "Download roster PDF",
      group: "Export",
      disabled: !hasTeams,
      run: () => downloadRosterPdf(teams),
    },
    ...DAYS.filter((d) => d !== day).map((d) => ({
      id: `day-${d}`,
      label: `Switch to ${label(d)}`,
      group: "Day",
      run: () => onSwitchDay(d),
    })),
  ];

  if (loading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", py: 12 }}>
        <CircularProgress size="sm" />
      </Box>
    );
  }

  return (
    <>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "stretch", md: "flex-end" }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography sx={{ fontSize: { xs: 28, sm: 34 }, fontWeight: 800, lineHeight: 1.1 }}>
            {label(day)} roster
          </Typography>
          <Typography sx={{ fontSize: 14.5, color: "text.tertiary", mt: 0.5 }}>
            <Box component="span" sx={{ fontFamily: "var(--joy-fontFamily-code)" }}>
              {attending}
            </Box>{" "}
            of{" "}
            <Box component="span" sx={{ fontFamily: "var(--joy-fontFamily-code)" }}>
              {players.length}
            </Box>{" "}
            skating
          </Typography>
        </Box>

        {/* Ordered the way the session runs: import, tweak, create. */}
        <Stack
          direction="row"
          spacing={1.25}
          alignItems="center"
          useFlexGap
          sx={{ flexWrap: "wrap" }}
        >
          <Button
            variant="outlined"
            color="primary"
            startDecorator={<FileUploadOutlinedIcon sx={{ fontSize: 19 }} />}
            onClick={() => fileInputRef.current?.click()}
            sx={{
              whiteSpace: "nowrap",
              fontWeight: 700,
              bgcolor: "primary.50",
              borderColor: "primary.200",
              "&:hover": { bgcolor: "primary.100" },
            }}
          >
            Import CSV
          </Button>
          <Button
            variant="outlined"
            color="neutral"
            startDecorator={<AddRoundedIcon sx={{ fontSize: 19 }} />}
            onClick={addPlayer}
            sx={{ whiteSpace: "nowrap", fontWeight: 600 }}
          >
            Add player
          </Button>
          <Button
            variant="solid"
            color="primary"
            disabled={attending < 2}
            startDecorator={<SportsHockeyIcon sx={{ fontSize: 19 }} />}
            onClick={drawTeams}
            sx={{ whiteSpace: "nowrap", fontWeight: 700, flexGrow: { xs: 1, sm: 0 } }}
          >
            Create teams
          </Button>
        </Stack>
      </Stack>

      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={importCsv}
      />

      <Stack direction={{ xs: "column", lg: "row" }} spacing={{ xs: 3, lg: 5 }} alignItems="flex-start">
        <Box sx={{ flex: 1, minWidth: 0, width: "100%", pb: selected.size ? 8 : 0 }}>
          <RosterTable
            players={players}
            selected={selected}
            onToggleSelect={toggleSelect}
            onToggleAll={toggleAll}
            onChange={updatePlayer}
            emptyMessage="No players yet — import a CSV or add someone."
          />
        </Box>

        <SummaryRail players={players} onMarkAllOut={markAllOut} />
      </Stack>

      <BulkBar
        count={selected.size}
        onMarkIn={() => applyToSelected({ attending: true })}
        onMarkOut={() => applyToSelected({ attending: false })}
        onRemove={removeSelected}
        onClear={() => setSelected(new Set())}
      />

      <MatchupOverlay
        open={matchupOpen}
        teams={teams}
        onReshuffle={() => setTeams(generateTeams(players))}
        onClose={() => setMatchupOpen(false)}
      />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        commands={commands}
      />
    </>
  );
}
