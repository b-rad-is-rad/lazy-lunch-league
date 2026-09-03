import { useRef } from "react";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Tooltip from "@mui/joy/Tooltip";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import { v4 as uuidv4 } from "uuid";
import Player from "../Player/Player";

export const shuffle = (arr: any) => {
  let currentIndex = arr.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }
};

export const isOdd = (n: number) => n % 2 !== 0;

// Reads the first column of each row, skipping a "Name" header and blank lines.
const parseAttendanceCsv = (text: string): string[] => {
  return text
    .split(/\r?\n/)
    .map((line) => line.split(",")[0]?.trim().replace(/^"|"$/g, ""))
    .filter((name): name is string => !!name && name.toLowerCase() !== "name");
};

export interface PlayerDef {
  id: string;
  name: string;
  rank: number | null;
  attending: boolean;
}

export default function PlayerList({
  players,
  setPlayers,
  setTeams,
}: {
  players: PlayerDef[];
  setPlayers: React.Dispatch<React.SetStateAction<PlayerDef[]>>;
  setTeams: React.Dispatch<React.SetStateAction<PlayerDef[][]>>;
}) {
  const handleGenerateRandomTeams = () => {
    let t1: PlayerDef[] = [];
    let t2: PlayerDef[] = [];
    let i = 0;
    let j = 0;

    const sorted = players
      .filter((p) => p.attending)
      .sort((p1, p2) => Number(p2.rank) - Number(p1.rank));

    // Get just the ranks in the roster
    const ranks = new Set();
    sorted.forEach((p) => {
      ranks.add(p.rank);
    });

    for (const rank of ranks) {
      // Use a sliding window to find all of the players in a given rank
      while (sorted[j]?.rank === rank) {
        j++;
      }
      const ranked = sorted.slice(i, j);
      shuffle(ranked);
      const split = ranked.splice(0, Math.floor(ranked.length / 2));

      // If odd players in rank, give the larger split to the
      // team with less players. If even players in rank, it doesn't matter.
      // Example: T1.length = 6, T2.length = 7
      //    Rank 3 has 7 players, so we will split the 7 to 4 and 3.
      //    Give the 4 to T1 and the 3 to T2. Now each team has 10.
      if (t1.length !== t2.length) {
        if (split.length > ranked.length) {
          if (t1.length > t2.length) {
            t2 = t2.concat(split);
            t1 = t1.concat(ranked);
          } else {
            t1 = t1.concat(split);
            t2 = t2.concat(ranked);
          }
        } else {
          if (t1.length > t2.length) {
            t1 = t1.concat(split);
            t2 = t2.concat(ranked);
          } else {
            t2 = t2.concat(split);
            t1 = t1.concat(ranked);
          }
        }
      } else {
        let firstAssign: PlayerDef[]
        let secondAssign: PlayerDef[]

        if (Math.random() < 0.5) {
          firstAssign = split
          secondAssign = ranked
        } else {
          firstAssign = ranked
          secondAssign = split
        }

        t1 = t1.concat(firstAssign);
        t2 = t2.concat(secondAssign);
      }

      if (sorted[j] === undefined) break;

      i = j;
    }

    // One team will naturally end up with a higher rank than another
    // If this gap is greater than 4 points, swap a 4 and a 2.
    const t1Rank = t1.reduce((sum, p) => sum + (p.rank ?? 0), 0)
    const t2Rank = t2.reduce((sum, p) => sum + (p.rank ?? 0), 0)

    if (Math.abs(t1Rank - t2Rank) > 4) {
      // take a 4 from the higher team and swap with a 2 on the lower team
      if (t1Rank > t2Rank) {
        const rank4 = t1.findIndex((p) => p.rank === 4)
        const rank2 = t2.findIndex((p) => p.rank === 2)

        t2.push(t1.splice(rank4,1)[0])
        t1.push(t2.splice(rank2,1)[0])
      } else {
        const rank4 = t2.findIndex((p) => p.rank === 4)
        const rank2 = t1.findIndex((p) => p.rank === 2)

        t1.push(t2.splice(rank4,1)[0])
        t2.push(t1.splice(rank2,1)[0])
      }
    }


    setTeams([t1, t2]);
  };

  const handleRemovePlayer = (playerId: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== playerId));
  };

  const handleAddPlayer = () => {
    setPlayers((prev) => [
      ...prev,
      {
        id: uuidv4(),
        name: "",
        rank: null,
        attending: true,
      },
    ]);
  };

  const handleSetAllToOut = () => {
    setPlayers((prev) => prev.map((p) => ({...p, attending: false})))
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportAttendanceCsv = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const names = parseAttendanceCsv(await file.text());

    setPlayers((prev) => {
      const updated = prev.map((p) => {
        const isAttending = names.some(
          (n) => n.toLowerCase() === p.name.trim().toLowerCase(),
        );
        return isAttending ? { ...p, attending: true } : p;
      });

      const knownNames = new Set(
        updated.map((p) => p.name.trim().toLowerCase()),
      );
      const newPlayers: PlayerDef[] = [];

      for (const name of names) {
        const key = name.toLowerCase();
        if (knownNames.has(key)) continue;
        knownNames.add(key);
        newPlayers.push({
          id: uuidv4(),
          name,
          rank: 3,
          attending: true,
        });
      }

      return [...updated, ...newPlayers];
    });
  };

  const updatePlayer = (playerId: string, change: Partial<PlayerDef>) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === playerId ? { ...p, ...change } : p)),
    );
  };

  const attendingCount = players.filter((p) => p.attending).length;

  return (
    <Sheet
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: { xs: "100%", md: 360 },
        borderRadius: "md",
        borderColor: "neutral.300",
        bgcolor: "background.surface",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        alignItems="baseline"
        justifyContent="space-between"
        sx={{ px: 2, pt: 1.5, pb: 1 }}
      >
        <Typography
          sx={{
            fontFamily: "var(--joy-fontFamily-display)",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "neutral.900",
          }}
        >
          Roster
        </Typography>
        <Typography
          sx={{
            fontFamily: "var(--joy-fontFamily-code)",
            fontSize: 12,
            color: "neutral.600",
          }}
        >
          {attendingCount}/{players.length} IN
        </Typography>
      </Stack>

      <Stack direction="row" spacing={0.5} sx={{ px: 1.5, pb: 1 }}>
        <Tooltip title="Add player" size="sm" variant="outlined">
          <IconButton
            size="sm"
            variant="soft"
            color="neutral"
            onClick={handleAddPlayer}
            sx={{ minHeight: 36, minWidth: 36 }}
          >
            <PersonAddAlt1Icon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Import attendance CSV" size="sm" variant="outlined">
          <IconButton
            size="sm"
            variant="soft"
            color="neutral"
            onClick={() => fileInputRef.current?.click()}
            sx={{ minHeight: 36, minWidth: 36 }}
          >
            <UploadFileIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Set all to out" size="sm" variant="outlined">
          <IconButton
            size="sm"
            variant="soft"
            color="neutral"
            onClick={handleSetAllToOut}
            sx={{ minHeight: 36, minWidth: 36 }}
          >
            <RestartAltIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImportAttendanceCsv}
        />
      </Stack>

      <Divider />

      <List size="sm" sx={{ maxHeight: { xs: "none", md: 420 }, overflowY: "auto", py: 0.5, px: 0.5 }}>
        {players.map((player) => (
          <ListItem key={player.id} sx={{ p: 0 }}>
            <Player
              {...player}
              handleChange={updatePlayer}
              handleRemove={handleRemovePlayer}
            />
          </ListItem>
        ))}
        {players.length === 0 && (
          <Typography
            level="body-sm"
            sx={{ textAlign: "center", color: "neutral.500", py: 3 }}
          >
            No players yet — add one or import a CSV.
          </Typography>
        )}
      </List>

      <Divider />

      <Button
        size="md"
        color="primary"
        variant="solid"
        onClick={handleGenerateRandomTeams}
        startDecorator={<ShuffleRoundedIcon />}
        sx={{
          m: 1.5,
          fontFamily: "var(--joy-fontFamily-display)",
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        Generate Teams
      </Button>
    </Sheet>
  );
}
