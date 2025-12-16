import type { TButtonFilter } from "../types";

export const rarityButtonFilters: TButtonFilter[] = [
  {
    src: "/ltr-c.png",
    filterBy: "rarity",
    value: "Common",
  },
  {
    src: "/ltr-m.png",
    filterBy: "rarity",
    value: "Mythic",
  },
  {
    src: "/ltr-r.png",
    filterBy: "rarity",
    value: "Rare",
  },
  {
    src: "/ltr-u.png",
    filterBy: "rarity",
    value: "Uncommon",
  },
];

export const typeButtonFilters: TButtonFilter[] = [
  {
    src: "/Artifact.png",
    filterBy: "color",
    value: "A",
  },
  {
    src: "/B.png",
    filterBy: "color",
    value: "B",
  },
  {
    filterBy: "color",
    src: "/G.png",
    value: "G",
  },
  {
    src: "/Land.png",
    filterBy: "color",
    value: "L",
  },
  {
    src: "/Multicolored.png",
    filterBy: "color",
    value: "M",
  },
  {
    src: "/R.png",
    filterBy: "color",
    value: "R",
  },
  {
    src: "/U.png",
    filterBy: "color",
    value: "U",
  },
  {
    src: "/W.png",
    filterBy: "color",
    value: "W",
  },
];
