import { useState } from "react";
import {
  Box,
  Input,
  Button,
  List,
  ListItem,
  Checkbox,
  Typography,
  IconButton,
} from "@mui/joy";
import Player from "./Player";

interface Player {
  name: string;
  rank: string | null;
  attending: boolean;
}

export default function PlayerList() {
  const [players, setPlayers] = useState<Player[]>([
    { name: "brandon", rank: "4", attending: true },
    { name: "fucker", rank: "4", attending: true },
  ]);
  const [input, setInput] = useState("");

  console.log(players);
  const handleAddPlayer = () => {
    if (input.trim()) {
      const newPlayer: Player = {
        name: input,
        rank: null,
        attending: false,
      };
      setPlayers((prev) => [...prev, newPlayer]);
      setInput("");
    }
  };

  const updatePlayerName = (name: string) => {
    setPlayers((prev) =>
      prev.map((p) => (p.name === name ? { ...p, name } : p)),
    );
  };

  const updatePlayerRank = (name: string, rank: string) => {
    setPlayers((prev) =>
      prev.map((p) => (p.name === name ? { ...p, rank } : p)),
    );
  };

  const setAttending = (name: string) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.name === name ? { ...p, attending: !p.attending } : p,
      ),
    );
  };

  const deletePlayer = (name: string) => {
    setPlayers((prev) => prev.filter((p) => p.name !== name));
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <List>
        {players.map((player, index) => (
          <ListItem
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Player
              name={player.name}
              rank={player.rank}
              attending={player.attending}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
