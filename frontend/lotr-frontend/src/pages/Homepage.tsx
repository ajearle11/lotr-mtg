import { CardGrid, ButtonFilter, Search } from "../components";
import { use, useEffect } from "react";
import { rarityButtonFilters, typeButtonFilters } from "../utils/buttonFilters";
import { useCardStore, useFilterStore } from "../store/useAppStore";

const grabAllData = fetch("https://magicapi-r777.onrender.com/cards").then(
  (r) => r.json()
);
const Homepage = () => {
  const cardGrab = use(grabAllData);
  const cards = useCardStore((state) => state.cards);
  const setCards = useCardStore((state) => state.setCards);
  const setFilteredCards = useCardStore((state) => state.setFilteredCards);
  const filteredCards = useCardStore((state) => state.filteredCards);
  const filters = useFilterStore((state) => state.filters);

  useEffect(() => {
    setCards(cardGrab);
    setFilteredCards(cardGrab);
  }, [cardGrab]);

  useEffect(() => {
    const selectedFilters = filters.filter((f) => f.isSet).map((f) => f.name);
    console.log(selectedFilters);

    setFilteredCards(
      cards.filter((card) => {
        if (selectedFilters.length === 0) return true;

        const cardRarity = card.rarity ?? [];
        const cardColor = card.color ?? [];

        const rarities = ["Common", "Uncommon", "Mythic", "Rare"];

        const hasRaritySelected = selectedFilters.some((f) =>
          rarities.includes(f)
        );

        const rarityCheck = selectedFilters.some((c) => cardRarity.includes(c));
        const colorCheck = selectedFilters.some((c) => cardColor.includes(c));

        if (hasRaritySelected) {
          if (
            rarityCheck &&
            cardColor.length > 1 &&
            selectedFilters.includes("M")
          )
            return true;
          if (rarityCheck && !card.color) return true;
          if (rarityCheck && selectedFilters.includes("L") && card.id === 251)
            return true;
          //254 -281

          return rarityCheck;
        }

        if (colorCheck && cardColor.length > 1 && selectedFilters.includes("M"))
          return true;
        if (colorCheck && !card.color) return true;
        if (selectedFilters.includes("L") && card.id === 251)
          return true;

        return colorCheck;
      })
    );
  }, [filters]);

  return (
    <div className="w-full flex flex-col items-center">
      <Search />
      <ButtonFilter filters={rarityButtonFilters} />
      <ButtonFilter filters={typeButtonFilters} />
      <CardGrid data={filteredCards} />
    </div>
  );
};

export default Homepage;
