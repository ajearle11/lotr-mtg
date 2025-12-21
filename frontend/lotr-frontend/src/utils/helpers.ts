import type { TCard } from "../types";

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

  if (cardColor.length > 1 && selectedFilters.includes("M"))
    return true;
  if (colorCheck && !card.color) return true;
  if (selectedFilters.includes("L") && card.id >= 254 && card.id <= 281)
    return true;

  return colorCheck;
};
