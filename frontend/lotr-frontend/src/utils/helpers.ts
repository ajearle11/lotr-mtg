import type { TCard } from "../types";

const rarities = ["Common", "Uncommon", "Mythic", "Rare"];
const colours = ["A", "B", "G", "U", "L", "M", "R", "W"];
export const filterChecker = (selectedFilters: string[], card: TCard) => {
  if (selectedFilters.length === 0) return true;

  const cardRarity = card.rarity ?? [];
  const cardColor = card.color ?? [];

  const rarities = ["Common", "Uncommon", "Mythic", "Rare"];
  const colours = ["A", "B", "G", "U", "L", "M", "R", "W"];

  const hasRaritySelected = selectedFilters.some((f) => rarities.includes(f));
  const hasColourSelected = selectedFilters.some((f) => colours.includes(f));

  const rarityCheck = selectedFilters.some((c) => cardRarity.includes(c));
  const colorCheck = selectedFilters.some((c) => cardColor.includes(c));

  if (hasRaritySelected && hasColourSelected) {
    if (rarityCheck && cardColor.length > 1 && selectedFilters.includes("M"))
      return true;
    if (rarityCheck && colorCheck && !card.color) return true;
    if (
      rarityCheck &&
      selectedFilters.includes("L") &&
      card.id >= 254 &&
      card.id <= 281
    )
      return true;

    return rarityCheck && colorCheck;
  }

  if (hasRaritySelected) {
    if (rarityCheck && cardColor.length > 1 && selectedFilters.includes("M"))
      return true;
    if (rarityCheck && !card.color) return true;
    if (
      rarityCheck &&
      selectedFilters.includes("L") &&
      card.id >= 254 &&
      card.id <= 281
    )
      return true;

    return rarityCheck;
  }

  if (cardColor.length > 1 && selectedFilters.includes("M")) return true;
  if (colorCheck && !card.color) return true;
  if (selectedFilters.includes("L") && card.id >= 254 && card.id <= 281)
    return true;

  return colorCheck;
};

export const stageFilterer = (
  filters: {
    name: string;
    isSet: boolean;
  }[],
  array: string[]
) => {
  const selectedFilters = filters
    .filter((f) => f.isSet && array.includes(f.name))
    .map((f) => f.name);

  if (selectedFilters.length === 0) {
    return false;
  }

  return selectedFilters;
};

export const filterRaritySwitcher = (
  selectedFilter: string,
  cards: TCard[]
) => {
  switch (selectedFilter) {
    case "Common":
      return cards.filter((c) => c.rarity === "Common");
    case "Mythic":
      return cards.filter((c) => c.rarity === "Mythic");
    case "Rare":
      return cards.filter((c) => c.rarity === "Rare");
    case "Uncommon":
      return cards.filter((c) => c.rarity === "Uncommon");
    default:
      return cards;
  }
};

export const filterFilteredSwitcher = (
  selectedFilter: string,
  filteredCards: TCard[]
) => {
  switch (selectedFilter) {
    case "A":
      return filteredCards.filter((c) => c.type.includes("Artifact"));
    case "B":
      return filteredCards.filter((c) => (c.color ?? []).includes("B"));
    case "G":
      return filteredCards.filter((c) => (c.color ?? []).includes("G"));
    case "U":
      return filteredCards.filter((c) => (c.color ?? []).includes("U"));
    case "L":
      return filteredCards.filter((c) => c.type.includes("Land"));
    case "M":
      return filteredCards.filter((c) => (c.color ?? []).length > 1);
    case "R":
      return filteredCards.filter((c) => (c.color ?? []).includes("R"));
    case "W":
      return filteredCards.filter((c) => (c.color ?? []).includes("W"));
    default:
      return filteredCards;
  }
};

export const filtererForAllCards = (
  cards: TCard[],
  filters: {
    name: string;
    isSet: boolean;
  }[]
) => {
  let deduped = cards;

  const firstStage = stageFilterer(filters, rarities);

  if (firstStage) {
    const rarityLists = firstStage.map((f) => filterRaritySwitcher(f, cards));

    const flat = rarityLists.flat();

    deduped = Array.from(new Map(flat.map((card) => [card.id, card])).values());
  }

  const secondStage = stageFilterer(filters, colours);

  if (secondStage) {
    const extraFilterLists = secondStage.map((f) =>
      filterFilteredSwitcher(f, deduped)
    );

    const extraFlatten = extraFilterLists.flat();
    deduped = Array.from(
      new Map(extraFlatten.map((card) => [card.id, card])).values()
    );
  }

  const sorted = [...deduped].sort((a, b) => a.id - b.id);
  return sorted;
};
