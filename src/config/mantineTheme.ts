import type { MantineThemeOverride, Tuple } from "@mantine/core";

export type CustomColors =
  | "dark"
  | "gray"
  | "red"
  | "purple"
  | "blue"
  | "green"
  | "yellow"
  | (string & {});

export const COLORS = {
  gray: [
    "#F9FAFB",
    "#F3F4F6",
    "#E5E7EB",
    "#9CA3AF",
    "#6B7280",
    "#4B5563",
    "#D1D5DB",
    "#374151",
    "#1F2937",
    "#111827",
  ],

  green: [
    "#6EE7B7",
    "#E1F2D5",
    "#5FD149",
    "#1EB720",
    "#138A0F",
    "#0C6D18",
    "#065220",
    "#034422",
    "#022C16",
    "#011C0E",
  ],

  purple: [
    "#9333EA",
    "#A855F7",
    "#ED9CF2",
    "#E76CF2",
    "#C036D0",
    "#9D1FAE",
    "#771884",
    "#64146F",
    "#420D4A",
    "#2B0830",
  ],

  red: [
    "#FB7185",
    "#FFC6C6",
    "#FF9EA8",
    "#FF6D8A",
    "#E22859",
    "#B51D49",
    "#8A1538",
    "#74112F",
    "#4D0C1F",
    "#320814",
  ],
} as Record<CustomColors, Tuple<string, 10>>;

export const FONT_FAMILY = `Inter, Arial, "Helvetica Neue", Helvetica, sans-serif`;

export const theme: MantineThemeOverride = {
  colors: COLORS,
  fontFamily: FONT_FAMILY,
  headings: {
    fontFamily: FONT_FAMILY,
  },
};

export default theme;
