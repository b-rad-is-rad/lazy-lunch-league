import { useState } from "react";
import { PlayerDef } from "./components/PlayerList/PlayerList";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import Tabs from "@mui/joy/Tabs";
import TabPanel from "@mui/joy/TabPanel";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import { RosterPanel } from "./components/RosterPanel/RosterPanel";
import TeamPanel from "./components/TeamsPanel/TeamsPanel";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { download, generateCsv, mkConfig } from "export-to-csv";

const sortTeam = (team: PlayerDef[]) => {
  team.sort((a, b) => a.name.localeCompare(b.name));
};

const genCSV = (teams: PlayerDef[][]) => {
  const roster: { Dark: string; Light: string }[] = [];
  const t1 = teams[0];
  const t2 = teams[1];
  sortTeam(t1);
  sortTeam(t2);

  let k = 0;
  while (true) {
    if (t1[k] === undefined && t2[k] === undefined) break;
    roster.push({ Dark: t1[k]?.name ?? "", Light: t2[k]?.name ?? "" });
    k++;
  }
  const csvConfig = mkConfig({ filename: "roster", useKeysAsHeaders: true });
  const csv = generateCsv(csvConfig)(roster);
  download(csvConfig)(csv);
};

const genPDF = (teams: PlayerDef[][]) => {
  const doc = new jsPDF();
  const roster: string[][] = [];
  const t1 = teams[0];
  const t2 = teams[1];
  sortTeam(t1);
  sortTeam(t2);

  let k = 0;
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

function ExportActions({ teams }: { teams: PlayerDef[][] }) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
      <Button
        variant="outlined"
        color="neutral"
        size="sm"
        fullWidth
        startDecorator={<PictureAsPdfIcon fontSize="small" />}
        onClick={() => genPDF(teams)}
        sx={{ fontWeight: 600 }}
      >
        Save PDF
      </Button>
      <Button
        variant="outlined"
        color="neutral"
        size="sm"
        fullWidth
        startDecorator={<EditDocumentIcon fontSize="small" />}
        onClick={() => genCSV(teams)}
        sx={{ fontWeight: 600 }}
      >
        Save CSV
      </Button>
    </Stack>
  );
}

interface DayViewProps {
  day: string;
  roster: PlayerDef[];
  setRoster: React.Dispatch<React.SetStateAction<PlayerDef[]>>;
  teams: PlayerDef[][];
  setTeams: React.Dispatch<React.SetStateAction<PlayerDef[][]>>;
}

function DayView({ day, roster, setRoster, teams, setTeams }: DayViewProps) {
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="flex-start">
      <RosterPanel day={day} players={roster} setPlayers={setRoster} setTeams={setTeams} />
      <Stack spacing={1.5} sx={{ width: "100%", flex: 1, minWidth: 0 }}>
        <TeamPanel darkTeam={teams[0]} lightTeam={teams[1]} />
        <ExportActions teams={teams} />
      </Stack>
    </Stack>
  );
}

const days = ["tuesday", "thursday", "friday"] as const;

function App() {
  const [tuesdayRoster, setTuesdayRoster] = useState<PlayerDef[]>([]);
  const [thursdayRoster, setThursdayRoster] = useState<PlayerDef[]>([]);
  const [fridayRoster, setFridayRoster] = useState<PlayerDef[]>([]);
  const [tuesdayTeams, setTuesdayTeams] = useState<PlayerDef[][]>([[], []]);
  const [thursdayTeams, setThursdayTeams] = useState<PlayerDef[][]>([[], []]);
  const [fridayTeams, setFridayTeams] = useState<PlayerDef[][]>([[], []]);

  const dayProps: Record<(typeof days)[number], DayViewProps> = {
    tuesday: {
      day: "tuesday",
      roster: tuesdayRoster,
      setRoster: setTuesdayRoster,
      teams: tuesdayTeams,
      setTeams: setTuesdayTeams,
    },
    thursday: {
      day: "thursday",
      roster: thursdayRoster,
      setRoster: setThursdayRoster,
      teams: thursdayTeams,
      setTeams: setThursdayTeams,
    },
    friday: {
      day: "friday",
      roster: fridayRoster,
      setRoster: setFridayRoster,
      teams: fridayTeams,
      setTeams: setFridayTeams,
    },
  };

  return (
    <Box sx={{ minHeight: "100dvh" }}>
      <Tabs aria-label="Day selector" defaultValue={0} sx={{ bgcolor: "transparent" }}>
        <Box
          component="header"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            gap: 1,
            px: { xs: 2, sm: 3 },
            py: 1.5,
            borderBottom: "1px solid",
            borderColor: "neutral.300",
            bgcolor: "background.surface",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <Typography
            sx={{
              fontFamily: "var(--joy-fontFamily-display)",
              fontWeight: 800,
              fontSize: { xs: 22, sm: 24 },
              lineHeight: 1,
              letterSpacing: "0.01em",
              textTransform: "uppercase",
              color: "neutral.900",
            }}
          >
            Lazy Lunch{" "}
            <Box component="span" sx={{ color: "primary.500" }}>
              League
            </Box>
          </Typography>

          <TabList
            disableUnderline
            sx={{
              p: 0,
              gap: { xs: 0.5, sm: 1.5 },
              bgcolor: "transparent",
              justifyContent: { xs: "space-between", sm: "flex-end" },
            }}
          >
            {["Tuesday", "Thursday", "Friday"].map((label) => (
              <Tab
                key={label}
                disableIndicator
                sx={{
                  flex: { xs: 1, sm: "initial" },
                  bgcolor: "transparent",
                  fontFamily: "var(--joy-fontFamily-display)",
                  fontWeight: 700,
                  fontSize: 15,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "neutral.500",
                  borderBottom: "2px solid transparent",
                  borderRadius: 0,
                  py: 0.75,
                  "&:hover": { bgcolor: "transparent", color: "neutral.900" },
                  "&[aria-selected='true']": {
                    color: "neutral.900",
                    bgcolor: "transparent",
                    borderBottomColor: "primary.500",
                  },
                }}
              >
                {label}
              </Tab>
            ))}
          </TabList>
        </Box>

        <Box sx={{ px: { xs: 1.5, sm: 3 }, py: { xs: 1.5, sm: 2.5 } }}>
          {days.map((day, index) => (
            <TabPanel key={day} value={index} sx={{ p: 0 }}>
              <DayView {...dayProps[day]} />
            </TabPanel>
          ))}
        </Box>
      </Tabs>
    </Box>
  );
}

export default App;
