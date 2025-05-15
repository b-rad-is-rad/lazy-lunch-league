import { useState } from "react";
import { PlayerDef, shuffle } from "./components/PlayerList/PlayerList";
import {
  Tab,
  TabList,
  Tabs,
  TabPanel,
  Box,
  Stack,
  Grid,
  Button,
} from "@mui/joy";
import { RosterPanel } from "./components/RosterPanel/RosterPanel";
import TeamPanel from "./components/TeamsPanel/TeamsPanel";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { download, generateCsv, mkConfig } from "export-to-csv";

const renderGenerateCSVButton = (teams: PlayerDef[][]) => {
  const genCSVHandler = () => {
    const roster: {'Dark': string; 'Light': string}[] = [];
    const t1 = teams[0];
    const t2 = teams[1];
    shuffle(t1);
    shuffle(t2);

    let k = 0;

    while (true) {
      if (t1[k] === undefined && t2[k] === undefined) break;
      const row = {
        Dark: t1[k]?.name ?? "",
        Light: t2[k]?.name ?? "",
      }
      roster.push(row);
      k++;
    }
    const csvConfig = mkConfig({ filename: 'roster', useKeysAsHeaders: true });
    const csv = generateCsv(csvConfig)(roster);
    download(csvConfig)(csv) 
  }

  return (
    <Button
      variant="soft"
      size="sm"
      sx={{ border: "1px solid gray", maxWidth: "200px" }}
      startDecorator={<EditDocumentIcon />}
      onClick={genCSVHandler}
    >
      Save Roster CSV
    </Button>
  )
}

const renderGeneratePDFButton = (teams: PlayerDef[][]) => {
  const genPDFHandler = () => {
    const doc = new jsPDF();
    const roster: string[][] = [];
    const t1 = teams[0];
    const t2 = teams[1];
    shuffle(t1);
    shuffle(t2);

    let k = 0;

    // Generate roster in format that jspdf-autotable expects
    while (true) {
      if (t1[k] === undefined && t2[k] === undefined) break;
      roster.push([t1[k]?.name ?? "", t2[k]?.name ?? ""]);
      k++;
    }

    autoTable(doc, {
      theme: "grid",
      headStyles: {
        fillColor: [230, 230, 230],
        fontSize: 20,
        fontStyle: "bold",
        textColor: [0, 0, 0],
      },
      bodyStyles: { fontSize: 14 },
      head: [["Dark", "Light"]],
      body: [...roster],
    });

    doc.save("roster.pdf");
  };

  return (
    <Button
      variant="soft"
      size="sm"
      sx={{ border: "1px solid gray", maxWidth: "200px" }}
      startDecorator={<PictureAsPdfIcon />}
      onClick={genPDFHandler}
    >
      Save Roster PDF
    </Button>
  );
};

function App() {
  const [tuesdayRoster, setTuesdayRoster] = useState<PlayerDef[]>([]);
  const [thursdayRoster, setThursdayRoster] = useState<PlayerDef[]>([]);
  const [fridayRoster, setFridayRoster] = useState<PlayerDef[]>([]);
  const [tuesdayTeams, setTuesdayTeams] = useState<PlayerDef[][]>([[], []]);
  const [thursdayTeams, setThursdayTeams] = useState<PlayerDef[][]>([[], []]);
  const [fridayTeams, setFridayTeams] = useState<PlayerDef[][]>([[], []]);

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
            <Grid container spacing={2}>
              <Grid>
                <RosterPanel
                  day={"tuesday"}
                  players={tuesdayRoster}
                  setPlayers={setTuesdayRoster}
                  setTeams={setTuesdayTeams}
                />
              </Grid>
              <Grid sx={{ flexGrow: 1 }}>
                <Stack direction="column" spacing={6}>
                  <TeamPanel
                    darkTeam={tuesdayTeams[0]}
                    lightTeam={tuesdayTeams[1]}
                  />
                <Stack direction='column' spacing={1}>
                  {renderGeneratePDFButton(tuesdayTeams)}
                  {renderGenerateCSVButton(tuesdayTeams)}
                </Stack>
                </Stack>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={1}>
            <Grid container spacing={2}>
              <Grid>
                <RosterPanel
                  day={"thursday"}
                  players={thursdayRoster}
                  setPlayers={setThursdayRoster}
                  setTeams={setThursdayTeams}
                />
              </Grid>
              <Grid sx={{ flexGrow: 1 }}>
                <Stack direction="column" spacing={6}>
                  <TeamPanel
                    darkTeam={thursdayTeams[0]}
                    lightTeam={thursdayTeams[1]}
                  />
                  <Stack direction='column' spacing={1}>
                    {renderGeneratePDFButton(thursdayTeams)}
                    {renderGenerateCSVButton(thursdayTeams)}
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={2}>
            <Grid container spacing={2}>
              <Grid>
                <RosterPanel
                  day={"friday"}
                  players={fridayRoster}
                  setPlayers={setFridayRoster}
                  setTeams={setFridayTeams}
                />
              </Grid>
              <Grid sx={{ flexGrow: 1 }}>
                <Stack direction="column" spacing={6}>
                  <TeamPanel
                    darkTeam={fridayTeams[0]}
                    lightTeam={fridayTeams[1]}
                  />
                  <Stack direction='column' spacing={1}>
                    {renderGeneratePDFButton(fridayTeams)}
                    {renderGenerateCSVButton(fridayTeams)}
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </TabPanel>
        </Box>
      </Tabs>
    </>
  );
}

export default App;
