import { Button, List, ListItem, Sheet, Stack, Typography } from "@mui/joy";
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
        t1 = t1.concat(split);
        t2 = t2.concat(ranked);
      }

      if (sorted[j] === undefined) break;

      i = j;
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

  const updatePlayer = (playerId: string, change: Partial<PlayerDef>) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === playerId ? { ...p, ...change } : p)),
    );
  };

  return (
    <Sheet
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 375,
        alignItems: "center",
        borderRadius: "md",
        p: 2,
        height: "100%",
        borderColor: "primary.300",
        boxShadow: "sm",
      }}
    >
      <Typography sx={{ mb: 1 }}>
        Players Attending: {players.filter((p) => p.attending).length}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Button
          variant="soft"
          size="sm"
          sx={{ border: "1px solid gray" }}
          onClick={handleAddPlayer}
        >
          Add Player
        </Button>
        <Button
          variant="soft"
          color="warning"
          size="sm"
          sx={{ border: "1px solid gray" }}
          onClick={handleGenerateRandomTeams}
        >
          Generate Random Teams
        </Button>
        <Button
          variant="soft"
          size="sm"
          sx={{ border: "1px solid gray" }}
          onClick={handleSetAllToOut}
        >
          Set All to Out
        </Button>
      </Stack>
      <List>
        {players.map((player) => (
          <ListItem
            key={player.id}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Player
              {...player}
              handleChange={updatePlayer}
              handleRemove={handleRemovePlayer}
            />
          </ListItem>
        ))}
      </List>
    </Sheet>
  );
}
