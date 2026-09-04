export interface PlayerDef {
  id: string;
  name: string;
  rank: number | null;
  attending: boolean;
}

export const RANKS = [5, 4, 3, 2, 1];

export const DAYS = ["tuesday", "thursday", "friday"] as const;

export type Day = (typeof DAYS)[number];
