import { useEffect, useState } from "react";
import { CardGrid, Button } from "../../components/";
import { ApiResponseDataArray, getUserData } from "../../interfaces/";
import { useAppContext } from "../../contexts/";

const Homepage = (): JSX.Element => {
  const { cards, setCards, user, setUser } = useAppContext();
  const [filterHave, setFilterHave] = useState<boolean>(false);
  const [filterHaveNot, setFilterHaveNot] = useState<boolean>(false);

  const grabData = async (): Promise<void> => {
    const response = await fetch("https://magicapi-r777.onrender.com/cards");
    const data: ApiResponseDataArray = await response.json();
    setCards(data);
  };

  const grabUserData = async (): Promise<void> => {
    const response = await fetch("http://localhost:3000/users/stinkyAl");
    const data: getUserData = await response.json();
    setUser(data);
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
    grabUserData();
    setFilterHave(false);
    setFilterHaveNot(false);
  }, []);

  return (
    <>
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
      <CardGrid
        cards={cards}
        collectedCardsArray={user.cards}
        filterHave={filterHave}
        filterHaveNot={filterHaveNot}
      />
    </>
  );
};

export default Homepage;
