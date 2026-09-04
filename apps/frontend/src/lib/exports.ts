import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { PlayerDef } from "../types";

// Reads the first column of each row, skipping a "Name" header and blank lines.
export const parseAttendanceCsv = (text: string): string[] =>
  text
    .split(/\r?\n/)
    .map((line) => line.split(",")[0]?.trim().replace(/^"|"$/g, ""))
    .filter((name): name is string => !!name && name.toLowerCase() !== "name");

const byName = (team: PlayerDef[]) =>
  [...team].sort((a, b) => a.name.localeCompare(b.name));

/** Zips the two teams into aligned Dark/Light rows for export. */
const pairRows = (teams: PlayerDef[][]): [string, string][] => {
  const t1 = byName(teams[0] ?? []);
  const t2 = byName(teams[1] ?? []);
  const rows: [string, string][] = [];

  for (let k = 0; k < Math.max(t1.length, t2.length); k++) {
    rows.push([t1[k]?.name ?? "", t2[k]?.name ?? ""]);
  }

  return rows;
};

export const downloadRosterCsv = (teams: PlayerDef[][]) => {
  const roster = pairRows(teams).map(([dark, light]) => ({
    Dark: dark,
    Light: light,
  }));

  const csvConfig = mkConfig({ filename: "roster", useKeysAsHeaders: true });
  download(csvConfig)(generateCsv(csvConfig)(roster));
};

export const downloadRosterPdf = (teams: PlayerDef[][]) => {
  const doc = new jsPDF();

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
    body: pairRows(teams),
  });

  doc.save("roster.pdf");
};
