import { useState } from "react";
import PlayerList, { PlayerDef } from "./components/PlayerList/PlayerList";
import { Tab, TabList, Tabs, TabPanel, Box } from "@mui/joy";
import { RosterPanel } from "./components/RosterPanel/RosterPanel";

function App() {
  const [tuesdayRoster, setTuesdayRoster] = useState<PlayerDef[]>([]);
  const [thursdayRoster, setThursdayRoster] = useState<PlayerDef[]>([]);
  const [fridayRoster, setFridayRoster] = useState<PlayerDef[]>([]);

  // TODO: Hook to push debounced updates to DDB (call POST lambda)
  // TODO: Make sure each tab works independently
  // TODO: Maybe do some sort of password so the site can't be easily f'ed with??

  return (
    <>
      <Tabs aria-label="Basic tabs" defaultValue={0}>
        <TabList>
          <Tab>Tuesday</Tab>
          <Tab>Thursday</Tab>
          <Tab>Friday</Tab>
        </TabList>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TabPanel value={0}>
            <RosterPanel
              day={"tuesday"}
              players={tuesdayRoster}
              setPlayers={setTuesdayRoster}
            />
          </TabPanel>
          <TabPanel value={1}>
            <RosterPanel
              day={"thursday"}
              players={thursdayRoster}
              setPlayers={setThursdayRoster}
            />
          </TabPanel>
          <TabPanel value={2}>
            <RosterPanel
              day={"friday"}
              players={fridayRoster}
              setPlayers={setFridayRoster}
            />
          </TabPanel>
        </Box>
      </Tabs>
    </>
  );
}

export default App;
