export type TCard = {
  name: string;
  id: number;
  image: string;
  rarity: string;
  color: Array<string>;
  type: string;
  text: string;
  artist: string;
  flavorText: string;
};

export type TButtonFilter = {
  src: string;
  filterBy: "color" | "rarity";
  value: string;
};
