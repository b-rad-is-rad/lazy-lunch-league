import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { PlayerDef } from "../types";

const API = "https://3n76og7xwvuca6yrhkdubpbo2m0harpp.lambda-url.us-east-1.on.aws";

interface Roster {
  players: PlayerDef[];
}

const byFirstName = (a: PlayerDef, b: PlayerDef) =>
  a.name.split(" ")[0].localeCompare(b.name.split(" ")[0]);

/**
 * Loads the roster for a day and persists edits back, debounced so typing a
 * name doesn't fire a request per keystroke.
 */
export const useRoster = (
  day: string,
  players: PlayerDef[],
  setPlayers: React.Dispatch<React.SetStateAction<PlayerDef[]>>,
) => {
  const [loading, setLoading] = useState(true);
  const [debouncedPlayers] = useDebounce(players, 400);

  useEffect(() => {
    const fetchRoster = async () => {
      const resp = await fetch(`${API}/day/${day}`);

      if (!resp.ok) {
        console.log(resp);
        throw new Error(`HTTP error! status: ${resp.status}`);
      }

      const data = (await resp.json()) as Roster;
      setPlayers([...data.players].sort(byFirstName));
      setLoading(false);
    };

    fetchRoster();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updateRoster = async () => {
      const resp = await fetch(`${API}/day/${day}`, {
        method: "POST",
        body: JSON.stringify({ players: debouncedPlayers }),
      });

      if (!resp.ok) {
        console.log(resp);
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
    };

    if (!loading) {
      updateRoster();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPlayers]);

  return loading;
};
