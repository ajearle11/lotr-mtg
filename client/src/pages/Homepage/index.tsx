import { useEffect, useState } from "react";
import { CardGrid, Button, UpdateModal } from "../../components/";
import { ApiResponseDataArray, getUserData } from "../../interfaces/";
import { useAppContext } from "../../contexts/";
import {
  loadingAnimation,
  toggleActiveSymbol,
  toggleActiveColor,
  checkActiveColorFilters,
  checkActiveSymbolFilters,
  convertColor,
  buttonColorSelector,
  buttonSymbolSelector,
  convertSymbol,
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

const Homepage = (): JSX.Element => {
  const { cards, setCards, user, setUser, multiClickArray } = useAppContext();
  const [filteredCards, setFilteredCards] =
    useState<ApiResponseDataArray>(cards);
  const [filterHave, setFilterHave] = useState<boolean>(false);
  const [filterHaveNot, setFilterHaveNot] = useState<boolean>(false);
  const [isActiveColor, setIsActiveColor] = useState<boolean>(false);
  const [isActiveSymbol, setIsActiveSymbol] = useState<boolean>(false);
  const symbols = [Mythic, Rare, Uncommon, Common];
  const colors = [White, Blue, Black, Green, Red, Multi, Artifact, Land];
  const color = useSelector((state: RootState) => state.colors.color);
  const symbol = useSelector((state: RootState) => state.symbols.symbol);
  const dispatch = useDispatch();

  const grabData = async (): Promise<void> => {
    const response = await fetch("https://magicapi-r777.onrender.com/cards");
    const data: ApiResponseDataArray = await response.json();
    if (response.status === 403) {
      window.location.href = "http://localhost:5173/";
    } else {
      setCards(data);
      setFilteredCards(data);
    }
  };

  const grabUserData = async (username: string): Promise<void> => {
    const response = await fetch(`http://localhost:3000/users/${username}`, {
      credentials: "include",
    });
    if (response.status === 403) {
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
      window.location.href = "http://localhost:5173/";
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

  const checkColor = (e: Event | undefined) => {
    let colorAlreadyFiltered = checkActiveColorFilters().filter(
      (type) => typeof type === "string"
    );

    if (typeof colorAlreadyFiltered[0] === "string") {
      let item: string = colorAlreadyFiltered[0].substr(12)[0];
      let colorToBeSet = convertColor(Array(item)).toLowerCase();

      const target = e?.target as HTMLButtonElement;
      if (target.classList.contains("active-filter")) {
        dispatch(setColor(""));
      } else {
        dispatch(setColor(colorToBeSet));
      }
    }
  };

  const checkSymbol = (e: Event | undefined) => {
    let symbolAlreadyFiltered = checkActiveSymbolFilters().filter(
      (type) => typeof type === "string"
    );

    if (typeof symbolAlreadyFiltered[0] === "string") {
      let item: string = symbolAlreadyFiltered[0].substr(16)[0];
      let symbolToBeSet = convertSymbol(item).toLowerCase();
      const target = e?.target as HTMLButtonElement;
      if (target.classList?.contains("active-filter")) {
        dispatch(setSymbol(""));
      } else {
        dispatch(setSymbol(symbolToBeSet));
      }
    }
  };

  useEffect(() => {
    grabData();
    setFilterHave(false);
    setFilterHaveNot(false);
    isUserAuth();
    setTimeout(() => {
      buttonColorSelector(color);
      buttonSymbolSelector(symbol);
      dispatch(setColor(color));
      dispatch(setSymbol(symbol));
    }, 500);
  }, []);

  const mapSymbols = (
    symbolImages: Array<string>
  ): (JSX.Element | undefined)[] => {
    return symbolImages.map((image: string) => {
      return (
        <button
          key={image}
          onClick={() => {
            toggleActiveSymbol(
              event,
              isActiveColor,
              isActiveSymbol,
              filteredCards,
              cards,
              setFilteredCards,
              setIsActiveSymbol
            );
            checkSymbol(event);
          }}
          className="symbol-circle"
        >
          <img src={image} />
        </button>
      );
    });
  };

  const mapColors = (
    symbolImages: Array<string>
  ): (JSX.Element | undefined)[] => {
    return symbolImages.map((image: string) => {
      return (
        <button
          key={image}
          onClick={() => {
            toggleActiveColor(
              event,
              isActiveColor,
              isActiveSymbol,
              filteredCards,
              cards,
              setFilteredCards,
              setIsActiveColor
            );
            checkColor(event);
          }}
          className="symbol-circle-colors"
        >
          <img src={image} />
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
          <h3>{user.username}'s collection</h3>
          {multiClickArray.length === 0 ? null : <UpdateModal />}
          <h3>
            Cards owned: {user.cards.length}/{cards.length}
          </h3>
          <h3>Cards left to collect: {cards.length - user.cards.length}</h3>
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
          <div className="rarity-container">{mapSymbols(symbols)}</div>
          <div className="color-container">{mapColors(colors)}</div>
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
