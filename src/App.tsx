import { useState } from "react";
import Player from "./components/Player/Player";
import PlayerList, { PlayerDef } from "./components/PlayerList/PlayerList";
import { Tab, TabList, Tabs, TabPanel } from "@mui/joy";

function App() {
  const [tuesdayRoster, setTuesdayRoster] = useState<PlayerDef[]>([]);
  const [thursdayRoster, setThursdayRoster] = useState<PlayerDef[]>([]);
  const [fridayRoster, setFridayRoster] = useState<PlayerDef[]>([]);

  return (
    <>
      <Tabs aria-label="Basic tabs" defaultValue={0}>
        <TabList>
          <Tab>Tuesday</Tab>
          <Tab>Thursday</Tab>
          <Tab>Friday</Tab>
        </TabList>
        <TabPanel value={0}>
          <PlayerList players={tuesdayRoster} setPlayers={setTuesdayRoster} />
        </TabPanel>
        <TabPanel value={1}>
          <PlayerList players={thursdayRoster} setPlayers={setThursdayRoster} />
        </TabPanel>
        <TabPanel value={2}>
          <PlayerList players={fridayRoster} setPlayers={setFridayRoster} />
        </TabPanel>
      </Tabs>
    </>
  );
}

export default App;
