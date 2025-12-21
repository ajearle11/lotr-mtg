import { CardGrid, ButtonFilter, Search } from "../components";
import { use, useEffect } from "react";
import { rarityButtonFilters, typeButtonFilters } from "../utils/buttonFilters";
import { useCardStore, useFilterStore } from "../store/useAppStore";
import { filterChecker } from "../utils/helpers";

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

    setFilteredCards(
      cards.filter((card) => {
        return filterChecker(selectedFilters, card)
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
