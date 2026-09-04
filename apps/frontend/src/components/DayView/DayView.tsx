import { useState } from "react";
import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";
import Stack from "@mui/joy/Stack";
import Stepper from "../Stepper/Stepper";
import AttendanceStep from "../AttendanceStep/AttendanceStep";
import TeamsStep from "../TeamsStep/TeamsStep";
import ExportStep from "../ExportStep/ExportStep";
import HelpRail, { RailSection } from "../HelpRail/HelpRail";
import { PlayerDef } from "../../types";
import { generateTeams } from "../../lib/teams";
import { useRoster } from "../../hooks/useRoster";

const RAIL: { title: string; intro: string; sections: RailSection[]; footnote?: string }[] = [
  {
    title: "Who's playing",
    intro:
      "Set who's in for this day. The roster is saved automatically, so you can leave and come back to it.",
    sections: [
      {
        heading: "Importing a CSV",
        body: "Drop in a CSV with a column of names. Anyone listed is marked in; names that aren't on the roster yet are added at rank 3.",
      },
      {
        heading: "Ranks",
        body: "Rank 5 is your strongest player, rank 1 your least. Ranks only matter for balancing — they're never exported.",
      },
    ],
    footnote: "Only players marked in are considered when teams are drawn.",
  },
  {
    title: "How teams are drawn",
    intro:
      "Players are grouped by rank and each group is split across both teams, so talent is spread evenly rather than clustered.",
    sections: [
      {
        heading: "Point spread",
        body: "The spread is the difference in total rank between the two sides. Anything under 4 points is a fair game.",
      },
      {
        heading: "Not happy with it?",
        body: "Reshuffle redraws from the same attendance list. Every draw is random, so you'll get a different split.",
      },
    ],
  },
  {
    title: "Taking it with you",
    intro:
      "Both formats contain the same thing: the Dark and Light rosters side by side, sorted alphabetically.",
    sections: [
      {
        heading: "Which one?",
        body: "CSV if you're pasting into a spreadsheet or a message. PDF if someone's printing it or pinning it to a board.",
      },
    ],
    footnote: "Teams aren't saved — export before you close the tab.",
  },
];

export default function DayView({
  day,
  players,
  setPlayers,
}: {
  day: string;
  players: PlayerDef[];
  setPlayers: React.Dispatch<React.SetStateAction<PlayerDef[]>>;
}) {
  const loading = useRoster(day, players, setPlayers);
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [teams, setTeams] = useState<PlayerDef[][]>([[], []]);

  const goTo = (i: number) => {
    setStep(i);
    setMaxStep((m) => Math.max(m, i));
  };

  const draw = () => setTeams(generateTeams(players));

  if (loading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", py: 12 }}>
        <CircularProgress size="sm" />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Stepper step={step} maxStep={maxStep} onSelect={goTo} />
      </Box>

      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={{ xs: 4, lg: 8 }}
        alignItems="flex-start"
      >
        <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
          {step === 0 && (
            <AttendanceStep
              players={players}
              setPlayers={setPlayers}
              onContinue={() => {
                draw();
                goTo(1);
              }}
            />
          )}
          {step === 1 && (
            <TeamsStep
              teams={teams}
              onReshuffle={draw}
              onBack={() => goTo(0)}
              onContinue={() => goTo(2)}
            />
          )}
          {step === 2 && (
            <ExportStep
              teams={teams}
              onBack={() => goTo(1)}
              onDone={() => {
                setMaxStep(0);
                setStep(0);
              }}
            />
          )}
        </Box>

        <HelpRail {...RAIL[step]} />
      </Stack>
    </>
  );
}
