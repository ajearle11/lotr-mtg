import { useEffect, useState } from "react";
import { CardGrid, Button, UpdateModal } from "../../components/";
import { ApiResponseDataArray, getUserData } from "../../interfaces/";
import { useAppContext } from "../../contexts/";

const Homepage = (): JSX.Element => {
  const { cards, setCards, user, setUser, multiClickArray } = useAppContext();
  const [filterHave, setFilterHave] = useState<boolean>(false);
  const [filterHaveNot, setFilterHaveNot] = useState<boolean>(false);

  const grabData = async (): Promise<void> => {
    const response = await fetch("https://magicapi-r777.onrender.com/cards");
    const data: ApiResponseDataArray = await response.json();
    setCards(data);
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

  return (
    <>
      {multiClickArray.length === 0 ? null : <UpdateModal />}
      <h3>{user.username}'s collection</h3>
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
