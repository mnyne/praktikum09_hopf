export type PlacePixel = {
  id: number;
  userId: number | null;
  x: number;
  y: number;
  color: string;
  updatedAt: Date;
  visible: boolean;
};

export type PixelDTO = {
  id: number;
  x: number;
  y: number;
  color: string;
};

export const PLACE_COLORS = [
  "#000000", "#3c3c3c", "#787878", "#d2d2d2",
  "#ffffff", "#600018", "#a50e1e", "#ed1c24",
  "#fa8072", "#e45c1a", "#ff7f27", "#f6aa09",
  "#f9dd3b", "#fffabc", "#9c8431", "#c5ad31",
  "#e8d45f", "#4a6b3a", "#5a944a", "#84c573",
  "#0eb968", "#13e67b", "#87ff5e", "#0c816e",
  "#10aea6", "#13e1be", "#0f799f", "#60f7f2",
  "#bbfaf2", "#28509e", "#4093e4", "#7dc7ff",
] as const;

export type PlaceColor = (typeof PLACE_COLORS)[number];
