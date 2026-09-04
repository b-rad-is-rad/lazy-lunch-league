import { PlayerDef } from "../types";

export const shuffle = <T,>(arr: T[]) => {
  let currentIndex = arr.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }
};

export const isOdd = (n: number) => n % 2 !== 0;

export const teamRank = (team: PlayerDef[]) =>
  team.reduce((sum, p) => sum + (p.rank ?? 0), 0);

/**
 * Splits the attending players into two rank-balanced teams. Players are
 * grouped by rank and each group is split evenly between the teams, with the
 * larger half going to whichever team is currently short a player.
 */
export const generateTeams = (players: PlayerDef[]): PlayerDef[][] => {
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
      let firstAssign: PlayerDef[];
      let secondAssign: PlayerDef[];

      if (Math.random() < 0.5) {
        firstAssign = split;
        secondAssign = ranked;
      } else {
        firstAssign = ranked;
        secondAssign = split;
      }

      t1 = t1.concat(firstAssign);
      t2 = t2.concat(secondAssign);
    }

    if (sorted[j] === undefined) break;

    i = j;
  }

  // One team will naturally end up with a higher rank than another
  // If this gap is greater than 4 points, swap a 4 and a 2.
  const t1Rank = teamRank(t1);
  const t2Rank = teamRank(t2);

  if (Math.abs(t1Rank - t2Rank) > 4) {
    // take a 4 from the higher team and swap with a 2 on the lower team
    if (t1Rank > t2Rank) {
      const rank4 = t1.findIndex((p) => p.rank === 4);
      const rank2 = t2.findIndex((p) => p.rank === 2);

      t2.push(t1.splice(rank4, 1)[0]);
      t1.push(t2.splice(rank2, 1)[0]);
    } else {
      const rank4 = t2.findIndex((p) => p.rank === 4);
      const rank2 = t1.findIndex((p) => p.rank === 2);

      t1.push(t2.splice(rank4, 1)[0]);
      t2.push(t1.splice(rank2, 1)[0]);
    }
  }

  return [t1, t2];
};
