export type PaletteColor = {
  color: string;
  symbol: string;
  name: string;
};

export type Pattern = {
  title: string;
  width: number;
  height: number;
  palette: PaletteColor[];
  grid: number[][]; // an array of arrays of numbers
};