import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";
import PlayerList, { PlayerDef } from "../PlayerList/PlayerList";
import { useEffect, useState } from "react";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import { useDebounce } from "use-debounce";

interface Roster {
  players: PlayerDef[];
}

export const RosterPanel = ({
  day,
  players,
  setPlayers,
  setTeams,
}: {
  day: string;
  players: PlayerDef[];
  setPlayers: React.Dispatch<React.SetStateAction<PlayerDef[]>>;
  setTeams: React.Dispatch<React.SetStateAction<PlayerDef[][]>>;
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [debouncedPlayers] = useDebounce(players, 400);

  useEffect(() => {
    const fetchRoster = async () => {
      const resp = await fetch(
        `https://3n76og7xwvuca6yrhkdubpbo2m0harpp.lambda-url.us-east-1.on.aws/day/${day}`,
      );

      if (!resp.ok) {
        console.log(resp);
        throw new Error(`HTTP error! status: ${resp.status}`);
      }

      const data = (await resp.json()) as Roster;
      data.players.sort((a, b) => {
        if (a.name.split(" ")[0] < b.name.split(" ")[0]) {
          return -1;
        }
        if (a.name.split(" ")[0] > b.name.split(" ")[0]) {
          return 1;
        }
        return 0;
      });

      setPlayers(data.players);
      setLoading(false);
    };

    fetchRoster();
  }, []);

  useEffect(() => {
    const updateRoster = async () => {
      const resp = await fetch(
        `https://3n76og7xwvuca6yrhkdubpbo2m0harpp.lambda-url.us-east-1.on.aws/day/${day}`,
        {
          method: "POST",
          body: JSON.stringify({
            players: debouncedPlayers,
          }),
        },
      );

      if (!resp.ok) {
        console.log(resp);
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
    };

    if (!loading) {
      updateRoster();
    }
  }, [debouncedPlayers]);

  return loading ? (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", md: 360 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
      }}
    >
      <CircularProgress color="primary">
        <SportsHockeyIcon color="inherit" />
      </CircularProgress>
    </Box>
  ) : (
    <PlayerList players={players} setPlayers={setPlayers} setTeams={setTeams} />
  );
};
