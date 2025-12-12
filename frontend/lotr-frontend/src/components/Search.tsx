import { useCardStore } from "../store/useAppStore";

const Search = () => {
  const cards = useCardStore((state) => state.cards);
  const setFilteredCards = useCardStore((state) => state.setFilteredCards);

  return (
    <label className="input mb-5">
      <svg
        className="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input
        onChange={(e) =>
          setFilteredCards(
            cards.filter((card) =>
              card.name?.toLowerCase().includes(e.target.value.toLowerCase().trim())
            )
          )
        }
        type="search"
        className="grow"
        placeholder="Search"
      />
    </label>
  );
};

export default Search;
