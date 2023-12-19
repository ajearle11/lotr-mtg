import { useEffect, useState } from "react";
import { CardGrid, Button, UpdateModal, Search } from "../../components/";
import { ApiResponseDataArray, getUserData } from "../../interfaces/";
import { useAppContext } from "../../contexts/";
import {
  loadingAnimation,
  toggleActive,
  checkActiveFilters,
  convertColor,
  buttonColorSelector,
  buttonSymbolSelector,
  convertSymbol,
  filterColors,
  filterSymbols,
} from "../../helperFunctions/helperFunctions";
import Mythic from "../../public/ltr-m.png";
import Rare from "../../public/ltr-r.png";
import Uncommon from "../../public/ltr-u.png";
import Common from "../../public/ltr-c.png";
import White from "../../public/W.png";
import Blue from "../../public/U.png";
import Black from "../../public/B.png";
import Green from "../../public/G.png";
import Red from "../../public/R.png";
import Multi from "../../public/Multicolored.png";
import Artifact from "../../public/Artifact.png";
import Land from "../../public/Land.png";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setSymbol } from "../../store/symbolsReducer";
import { setColor } from "../../store/colorsReducer";
import { setAuth } from "../../store/authReducer";

const Homepage = (): JSX.Element => {
  const { cards, setCards, user, setUser, animation } = useAppContext();
  const [filteredCards, setFilteredCards] =
    useState<ApiResponseDataArray>(cards);
  const [filterHave, setFilterHave] = useState<boolean>(false);
  const [filterHaveNot, setFilterHaveNot] = useState<boolean>(false);
  const [isActiveColor, setIsActiveColor] = useState<boolean>(false);
  const [isActiveSymbol, setIsActiveSymbol] = useState<boolean>(false);

  const symbols = [
    { name: "mythic", image: Mythic },
    { name: "rare", image: Rare },
    { name: "uncommon", image: Uncommon },
    { name: "common", image: Common },
  ];
  const colors = [
    { name: "white", image: White },
    { name: "blue", image: Blue },
    { name: "black", image: Black },
    { name: "green", image: Green },
    { name: "red", image: Red },
    { name: "multi", image: Multi },
    { name: "artifact", image: Artifact },
    { name: "land", image: Land },
  ];
  const color = useSelector((state: RootState) => state.colors.color);
  const symbol = useSelector((state: RootState) => state.symbols.symbol);
  const searchValue = useSelector(
    (state: RootState) => state.searchValue.searchValue
  );
  const multiClick = useSelector(
    (state: RootState) => state.multiClick.multiClick
  );
  const dispatch = useDispatch();

  const grabData = async (): Promise<void> => {
    const response = await fetch("https://magicapi-r777.onrender.com/cards");
    const data: ApiResponseDataArray = await response.json();
    if (response.status === 403) {
      dispatch(setAuth(false));
      window.location.href = "http://localhost:5173/";
    } else {
      setCards(data);
      if (searchValue === "") {
        setFilteredCards(data);
      }
    }
  };

  const grabUserData = async (username: string): Promise<void> => {
    const response = await fetch(`http://localhost:3000/users/${username}`, {
      credentials: "include",
    });
    if (response.status === 403) {
      dispatch(setAuth(false));
      window.location.href = "http://localhost:5173/";
    } else {
      const data: getUserData = await response.json();
      setUser(data);
    }
  };

  const isUserAuth = async (): Promise<void> => {
    const response = await fetch("http://localhost:3000/users/isUserAuth", {
      credentials: "include",
    });
    if (response.status === 403) {
      dispatch(setAuth(false));
      // window.location.href = "http://localhost:5173/";
    } else {
      const data = await response.json();
      setUser({ ...user, username: data.user.username });
      await grabUserData(data.user.username);
    }
  };

  const handleOwnedCardsFilter = (filterHave: boolean): void => {
    if (filterHave) {
      setFilterHave(false);
    } else {
      setFilterHave(true);
      setFilterHaveNot(false);
    }
  };

  const handleNotOwnedCardsFilter = (filterHaveNot: boolean): void => {
    if (filterHaveNot) {
      setFilterHaveNot(false);
    } else {
      setFilterHave(false);
      setFilterHaveNot(true);
    }
  };

  const checkAttribute = (e: Event | undefined, type: "color" | "symbol") => {
    let alreadyFiltered = checkActiveFilters(`.symbol-circle`).filter(
      (type) => typeof type === "string"
    );

    const target = e?.target as HTMLButtonElement;
    const parentNode = target.parentNode as HTMLButtonElement;

    if (typeof alreadyFiltered[0] === "string") {
      let attributeToBeSet =
        type === "color"
          ? convertColor(filterColors(alreadyFiltered))
          : convertSymbol(filterSymbols(alreadyFiltered)[0]);
      attributeToBeSet = attributeToBeSet.toLowerCase();

      if (target.classList?.contains(`symbol-circle`)) {
        type === "color"
          ? dispatch(setColor(attributeToBeSet))
          : dispatch(setSymbol(attributeToBeSet));
        type === "color"
          ? dispatch(setColor(attributeToBeSet))
          : dispatch(setSymbol(attributeToBeSet));
      } else {
        type === "color"
          ? dispatch(setColor(attributeToBeSet))
          : dispatch(setSymbol(attributeToBeSet));
      }
    } else {
      if (target.classList?.contains(`symbol-circle`)) {
        if (!target.classList?.contains("active-filter")) {
          type === "color" ? dispatch(setColor("")) : dispatch(setSymbol(""));
        }
      } else {
        if (!parentNode.classList?.contains("active-filter")) {
          type === "color" ? dispatch(setColor("")) : dispatch(setSymbol(""));
        }
      }
    }
  };

  useEffect(() => {
    grabData();
    setFilterHave(false);
    setFilterHaveNot(false);
    isUserAuth();

    addEventListener("DOMContentLoaded", () => {
      buttonColorSelector(color);
      buttonSymbolSelector(symbol);
    });
  }, []);

  const mapButtons = (
    symbolImages: Array<{ name: string; image: string }>
  ): (JSX.Element | undefined)[] => {
    return symbolImages.map((image: { name: string; image: string }) => {
      return (
        <button
          key={image.name}
          onClick={
            image.name == "mythic" ||
            image.name == "rare" ||
            image.name == "uncommon" ||
            image.name == "common"
              ? () => {
                  toggleActive(
                    event,
                    isActiveSymbol,
                    filteredCards,
                    cards,
                    setFilteredCards,
                    setIsActiveSymbol,
                    "symbol"
                  );
                  checkAttribute(event, "symbol");
                }
              : () => {
                  toggleActive(
                    event,
                    isActiveColor,
                    filteredCards,
                    cards,
                    setFilteredCards,
                    setIsActiveColor,
                    "color"
                  );
                  checkAttribute(event, "color");
                }
          }
          className={`symbol-circle ${image.name}`}
        >
          <img className={image.name} src={image.image} />
        </button>
      );
    });
  };

  return (
    <>
      {cards.length === 0 ? (
        loadingAnimation()
      ) : (
        <>
          <div className="header-container-home">
            <h3>{user.username}'s collection</h3>
            {/* {multiClick.length === 0 ? null : <UpdateModal  />} */}
            <UpdateModal
              className={
                multiClick.length === 0 ? animation : "update-modal-container"
              }
            />

            <h3>
              Cards owned: {user.cards.length}/{cards.length}
            </h3>
            <h3>Cards left to collect: {cards.length - user.cards.length}</h3>
          </div>
          <Search cards={cards} setFilteredCards={setFilteredCards} />
          <div className="button-container">
            <Button
              text="Owned Cards"
              onClick={() => handleOwnedCardsFilter(filterHave)}
              isClicked={filterHave}
            />
            <Button
              text="Unowned Cards"
              onClick={() => handleNotOwnedCardsFilter(filterHaveNot)}
              isClicked={filterHaveNot}
            />
          </div>
          <div className="rarity-container">{mapButtons(symbols)}</div>
          <div className="color-container">{mapButtons(colors)}</div>
          <CardGrid
            cards={filteredCards}
            collectedCardsArray={user.cards}
            filterHave={filterHave}
            filterHaveNot={filterHaveNot}
          />
        </>
      )}
    </>
  );
};

export default Homepage;
