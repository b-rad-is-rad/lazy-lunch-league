// TeamsPanel.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { CssVarsProvider } from "@mui/joy/styles";
import TeamsPanel from "./TeamsPanel";
import { PlayerDef } from "../../types";

// Mock player data with ranks 1-7
const mockPlayers = {
  darkTeam: [
    { id: "d1", name: "Alex Johnson", attending: true, rank: 3 },
    { id: "d2", name: "Maria Garcia", attending: true, rank: 1 },
    { id: "d3", name: "James Wilson", attending: true, rank: 5 },
    { id: "d4", name: "Sarah Lee", attending: true, rank: 2 },
  ],
  lightTeam: [
    { id: "l1", name: "David Chen", attending: true, rank: 2 },
    { id: "l2", name: "Emma Davis", attending: true, rank: 4 },
    { id: "l3", name: "Michael Brown", attending: true, rank: 1 },
  ],
};

// Helper function to create player data with different ranks (1-7)
const generateTeamWithRanks = (teamId: string, size: number): PlayerDef[] => {
  return Array.from({ length: size }, (_, i) => {
    // Distribute ranks 1-7 evenly across the team
    const rank = (i % 7) + 1;
    return {
      id: `${teamId}${i}`,
      name: `Player ${i + 1}`,
      attending: true, // All players are attending
      rank: rank,
    };
  });
};

// Component wrapper with CssVarsProvider for proper Joy UI styling
const TeamsPanelWrapper = (props: React.ComponentProps<typeof TeamsPanel>) => (
  <CssVarsProvider>
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <TeamsPanel {...props} />
    </div>
  </CssVarsProvider>
);

// Storybook metadata
const meta = {
  title: "Components/TeamsPanel",
  component: TeamsPanelWrapper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A component that displays two teams (dark and light) side by side.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    darkTeam: {
      description: "Array of players for the dark team",
    },
    lightTeam: {
      description: "Array of players for the light team",
    },
  },
} satisfies Meta<typeof TeamsPanelWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with mock data
export const Default: Story = {
  args: {
    darkTeam: mockPlayers.darkTeam,
    lightTeam: mockPlayers.lightTeam,
  },
};

// Story with empty teams
export const EmptyTeams: Story = {
  args: {
    darkTeam: [],
    lightTeam: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          "How the component looks when there are no players in either team.",
      },
    },
  },
};

// Story with many players
export const ManyPlayers: Story = {
  args: {
    darkTeam: generateTeamWithRanks("d", 12),
    lightTeam: generateTeamWithRanks("l", 10),
  },
  parameters: {
    docs: {
      description: {
        story: "Teams with many players to test scrolling behavior.",
      },
    },
  },
};

// Story with mixed rank players
export const MixedRankPlayers: Story = {
  args: {
    darkTeam: [
      { id: "d1", name: "Alex Johnson", attending: true, rank: 1 },
      { id: "d2", name: "Maria Garcia", attending: true, rank: 3 },
      { id: "d3", name: "James Wilson", attending: true, rank: 5 },
      { id: "d4", name: "Sarah Lee", attending: true, rank: 7 },
    ],
    lightTeam: [
      { id: "l1", name: "David Chen", attending: true, rank: 2 },
      { id: "l2", name: "Emma Davis", attending: true, rank: 4 },
      { id: "l3", name: "Michael Brown", attending: true, rank: 6 },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Teams with mixed rank distribution.",
      },
    },
  },
};
