import type { IncubatorProject } from "./projects";

const PREFERRED_CARD_SIZE = 48;
const MINIMUM_GAP = 8;

export interface GridLayout {
  cardSize: number;
  columns: number;
  rows: number;
  tileCount: number;
}

export type IncubatorTile =
  | { kind: "project"; project: IncubatorProject }
  | { id: number; kind: "placeholder" };

function calculateTrackCount(length: number) {
  if (!Number.isFinite(length) || length <= 0) {
    return 0;
  }

  return Math.max(
    1,
    Math.round((length + MINIMUM_GAP) / (PREFERRED_CARD_SIZE + MINIMUM_GAP))
  );
}

export function calculateGridLayout(width: number, height: number): GridLayout {
  const columns = calculateTrackCount(width);
  const rows = calculateTrackCount(height);

  if (columns === 0 || rows === 0) {
    return { cardSize: 0, columns: 0, rows: 0, tileCount: 0 };
  }

  const horizontalCardSize = (width - MINIMUM_GAP * (columns - 1)) / columns;
  const verticalCardSize = (height - MINIMUM_GAP * (rows - 1)) / rows;
  const cardSize = Math.min(
    PREFERRED_CARD_SIZE,
    horizontalCardSize,
    verticalCardSize
  );

  return {
    cardSize,
    columns,
    rows,
    tileCount: columns * rows,
  };
}

export function createIncubatorTiles(
  projects: readonly IncubatorProject[],
  tileCount: number
): IncubatorTile[] {
  return Array.from({ length: tileCount }, (_, index) => {
    const project = projects[index];

    return project
      ? { kind: "project", project }
      : { id: index, kind: "placeholder" };
  });
}
