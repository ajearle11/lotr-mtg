import { useEffect, useState } from "react";
import { CardGrid, Button, UpdateModal } from "../../components/";
import { ApiResponseDataArray, getUserData } from "../../interfaces/";
import { useAppContext } from "../../contexts/";
import {
  loadingAnimation,
  attributeFilter,
  checkActiveSymbolFilters,
  removeActiveSymbolFilters,
  colorFilter,
  checkActiveColorFilters,
  removeActiveColorFilters,
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

  const grabData = async (): Promise<void> => {
    const response = await fetch("https://magicapi-r777.onrender.com/cards");
    const data: ApiResponseDataArray = await response.json();
    setCards(data);
    setFilteredCards(data);
  };

  const grabUserData = async (username: string): Promise<void> => {
    const response = await fetch(`http://localhost:3000/users/${username}`, {
      credentials: "include",
    });
    const data: getUserData = await response.json();
    setUser(data);
  };

  const isUserAuth = async (): Promise<void> => {
    const response = await fetch("http://localhost:3000/users/isUserAuth", {
      credentials: "include",
    });
    const data = await response.json();
    setUser({ ...user, username: data.user.username });
    await grabUserData(data.user.username);
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

  useEffect(() => {
    grabData();
    setFilterHave(false);
    setFilterHaveNot(false);
    isUserAuth();
  }, []);

  useEffect(() => {
    console.log(isActiveSymbol);
    console.log(isActiveColor);
  }, [filteredCards]);

  const toggleActiveSymbol = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const parentNode = target.parentNode as HTMLButtonElement;
    const childNode = target.childNodes[0] as HTMLButtonElement;

    let attributeValue: string | null = "";

    if (target.getAttribute("src") === null) {
      attributeValue = childNode.getAttribute("src");

      if (target.classList.contains("active-filter")) {
        setIsActiveSymbol(false);
        if (!isActiveColor && !isActiveSymbol) {
          setFilteredCards(cards);
        }
      } else {
        if (checkActiveSymbolFilters().includes(true)) {
          removeActiveSymbolFilters();
        }
        setFilteredCards(attributeFilter(attributeValue, cards));
        setIsActiveSymbol(true);
      }
    } else {
      if (parentNode.classList.contains("active-filter")) {
        setIsActiveSymbol(false);
        if (!isActiveColor && !isActiveSymbol) {
          setFilteredCards(cards);
        }
      } else {
        attributeValue = target.getAttribute("src");
        if (checkActiveSymbolFilters().includes(true)) {
          removeActiveSymbolFilters();
        }
        setFilteredCards(attributeFilter(attributeValue, cards));
        setIsActiveSymbol(true);
      }
    }

    if (target.childNodes.length > 0) {
      target.classList.toggle("active-filter");
    } else {
      parentNode.classList.toggle("active-filter");
    }
  };

  const toggleActiveColor = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const parentNode = target.parentNode as HTMLButtonElement;
    const childNode = target.childNodes[0] as HTMLButtonElement;

    let attributeValue: string | null = "";

    if (target.getAttribute("src") === null) {
      attributeValue = childNode.getAttribute("src");

      if (target.classList.contains("active-filter")) {
        setIsActiveColor(false);
        if (!isActiveColor && !isActiveSymbol) {
          setFilteredCards(cards);
        }
      } else {
        if (checkActiveColorFilters().includes(true)) {
          removeActiveColorFilters();
        }
        setFilteredCards(colorFilter(attributeValue, cards));
        setIsActiveColor(true);
      }
    } else {
      if (parentNode.classList.contains("active-filter")) {
        setIsActiveColor(false);
        console.log(isActiveColor);
        if (!isActiveColor && !isActiveSymbol) {
          setFilteredCards(cards);
        }
      } else {
        attributeValue = target.getAttribute("src");
        if (checkActiveColorFilters().includes(true)) {
          removeActiveColorFilters();
        }
        setFilteredCards(colorFilter(attributeValue, cards));
        setIsActiveColor(true);
      }
    }

    if (target.childNodes.length > 0) {
      target.classList.toggle("active-filter");
    } else {
      parentNode.classList.toggle("active-filter");
    }
  };

  const mapSymbols = (
    symbolImages: Array<string>
  ): (JSX.Element | undefined)[] => {
    return symbolImages.map((image: string) => {
      return (
        <button
          key={image}
          onClick={toggleActiveSymbol}
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
          onClick={toggleActiveColor}
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
