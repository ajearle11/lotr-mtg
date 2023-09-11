import { useEffect, useState } from "react";
import { CardGrid, Button } from "../../components/";
import { ApiResponseDataArray } from "../../interfaces/";

const Homepage = (): JSX.Element => {
  const [cards, setCards] = useState<ApiResponseDataArray>([]);
  const [collectedCardsArray, setCollectedCardsArray] = useState<number[]>([]);
  const [filterHave, setFilterHave] = useState<boolean>(false);
  const [filterHaveNot, setFilterHaveNot] = useState<boolean>(false);

  const grabData = async (): Promise<void> => {
    const response = await fetch("http://localhost:3001/cards");
    const data: ApiResponseDataArray = await response.json();
    setCards(data);
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
    setCollectedCardsArray([0, 1, 3]);
    setFilterHave(false);
    setFilterHaveNot(false);
  }, []);

  return (
    <>
      <h3>
        Cards owned: {collectedCardsArray.length}/{cards.length}
      </h3>
      <h3>
        Cards left to collect: {cards.length - collectedCardsArray.length}
      </h3>
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
      <CardGrid
        cards={cards}
        collectedCardsArray={collectedCardsArray}
        filterHave={filterHave}
        filterHaveNot={filterHaveNot}
      />
    </>
  );
};

export default Homepage;
