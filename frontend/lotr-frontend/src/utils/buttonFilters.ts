import type { TButtonFilter } from "../types";

export const rarityButtonFilters: TButtonFilter[] = [
  {
    src: "/ltr-c.png",
    filterBy: "rarity",
    value: "Common",
  },
  {
    src: "/ltr-u.png",
    filterBy: "rarity",
    value: "Uncommon",
  },
  {
    src: "/ltr-r.png",
    filterBy: "rarity",
    value: "Rare",
  },
  {
    src: "/ltr-m.png",
    filterBy: "rarity",
    value: "Mythic",
  },
];

export const typeButtonFilters: TButtonFilter[] = [
  {
    src: "/Artifact.png",
    filterBy: "color",
    value: "A",
  },
  {
    src: "/Land.png",
    filterBy: "color",
    value: "L",
  },
  {
    src: "/W.png",
    filterBy: "color",
    value: "W",
  },
  {
    src: "/U.png",
    filterBy: "color",
    value: "U",
  },
  {
    src: "/B.png",
    filterBy: "color",
    value: "B",
  },
  {
    src: "/R.png",
    filterBy: "color",
    value: "R",
  },
  {
    filterBy: "color",
    src: "/G.png",
    value: "G",
  },
  {
    src: "/Multicolored.png",
    filterBy: "color",
    value: "M",
  },
];
