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
    const selectedColors = filters
      .filter((f) => f.isSet).map(f => f.name)
      console.log(selectedColors)

    setFilteredCards(
      cards.filter((card) => {
        if (selectedColors.length === 0) return true;

        const cardColors = card.color ?? [];
        // if (selectedColors.includes("L") )
        if (cardColors.length > 1 && selectedColors.includes("M")) return card
        if (!card.color) return card
        return selectedColors.some((c) => cardColors.includes(c));
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
