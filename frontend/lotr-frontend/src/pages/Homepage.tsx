import { CardGrid, ButtonFilter, Search, Toast } from "../components";
import { Activity, use, useEffect } from "react";
import { rarityButtonFilters, typeButtonFilters } from "../utils/buttonFilters";
import { useCardStore, useFilterStore } from "../store/useAppStore";
import { filtererForAllCards } from "../utils/helpers";

const grabAllData = fetch("https://magicapi-r777.onrender.com/cards").then(
  (r) => r.json()
);
const Homepage = () => {
  const cardGrab = use(grabAllData);
  const cards = useCardStore((state) => state.cards);
  const setCards = useCardStore((state) => state.setCards);
  const setFilteredCards = useCardStore((state) => state.setFilteredCards);
  const filteredCards = useCardStore((state) => state.filteredCards);
  const setFilteredByFilteredCards = useCardStore(
    (state) => state.setFilteredByFilteredCards
  );
  const filters = useFilterStore((state) => state.filters);
  const selectedCards = useCardStore((state) => state.selectedCards);

  useEffect(() => {
    setCards(cardGrab);
    setFilteredCards(cardGrab);
  }, [cardGrab]);

  useEffect(() => {
    const filtered = filtererForAllCards(cards, filters);
    setFilteredByFilteredCards(filtered);
    setFilteredCards(filtered);
  }, [filters]);

  return (
    <>
      <Search />
      <ButtonFilter filters={rarityButtonFilters} />
      <ButtonFilter filters={typeButtonFilters} />
      <CardGrid data={filteredCards} />
      <Activity mode={selectedCards.length === 0 ? "hidden" : "visible"}>
        <Toast selectedCards={selectedCards} type="alert-info" />
      </Activity>
    </>
  );
};

export default Homepage;
