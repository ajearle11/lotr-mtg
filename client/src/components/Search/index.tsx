import { useEffect } from "react";
import { ApiResponseDataArray } from "../../interfaces/";
import "./index.css";
import {
  buttonColorSelector,
  buttonSymbolSelector,
} from "../../helperFunctions/helperFunctions";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setSearchValue } from "../../store/searchValueReducer";

const Search: React.FC<{
  cards: ApiResponseDataArray;
  setFilteredCards: React.Dispatch<React.SetStateAction<ApiResponseDataArray>>;
}> = ({ cards, setFilteredCards }) => {
  const dispatch = useDispatch();
  const searchValue = useSelector(
    (state: RootState) => state.searchValue.searchValue
  );
  const color = useSelector((state: RootState) => state.colors.color);
  const symbol = useSelector((state: RootState) => state.symbols.symbol);

  useEffect(() => {
    let searchField = document.querySelectorAll(
      ".input-container label"
    )[0] as HTMLElement;
    let searchFieldFocus = document.querySelectorAll(
      ".input-container input"
    )[0] as HTMLElement;
    let searchFieldValue = document.querySelectorAll(
      ".input-container input"
    )[0] as HTMLInputElement;

    searchFieldFocus.addEventListener("focus", () => {
      searchField.style.top = "-12px";
      searchField.style.fontSize = "12px";
    });

    searchField.addEventListener("click", () => {
      searchField.style.top = "-12px";
      searchField.style.fontSize = "12px";
      searchFieldFocus.focus();
    });

    searchFieldFocus.addEventListener("blur", () => {
      if (searchFieldValue.value === "") {
        searchField.style.position = "absolute";
        searchField.style.top = "0px";
        searchField.style.fontSize = "16px";
      }
    });

    containerCleanUp();
  }, []);

  useEffect(() => {
    containerCleanUp();
  }, [searchValue]);

  const containerCleanUp = () => {
    let searchField = document.querySelectorAll(
      ".input-container label"
    )[0] as HTMLElement;
    let buttonContainer = document.querySelector(
      ".button-container"
    ) as HTMLElement;
    let rarityContainer = document.querySelector(
      ".rarity-container"
    ) as HTMLElement;
    let colorContainer = document.querySelector(
      ".color-container"
    ) as HTMLElement;
    if (searchValue !== "") {
      buttonContainer.style.display = "none";
      rarityContainer.style.display = "none";
      colorContainer.style.display = "none";
      searchField.style.top = "-12px";
      searchField.style.fontSize = "12px";
    } else {
      buttonContainer.style.display = "flex";
      rarityContainer.style.display = "flex";
      colorContainer.style.display = "flex";
      buttonColorSelector(color);
      buttonSymbolSelector(symbol);
    }

    setFilteredCards(
      cards.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
  };

  return (
    <div className="search-container">
      <div className="input-container">
        <input value={searchValue} onChange={handleSearchValue} />
        <label>Search All Cards</label>
      </div>
    </div>
  );
};

export default Search;
