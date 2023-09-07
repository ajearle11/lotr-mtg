import { useEffect, useState } from "react";

interface ApiResponseData {
  name: string;
  id: number;
  image: string;
}

const Homepage = (): JSX.Element => {
  const [cards, setCards] = useState<Array<ApiResponseData>>([]);

  const grabData = async (): Promise<void> => {
    const response = await fetch("http://localhost:3001/cards");
    const data: ApiResponseData[] = await response.json();

    setCards(data);
  };

  const mapCards = (cards: Array<ApiResponseData>): JSX.Element[] => {
    return cards.map((card: ApiResponseData): JSX.Element => {
      return (
        <>
          <p>{card.name}</p>
          <p>{card.id}</p>
          <img src={card.image} />
          <hr />
        </>
      );
    });
  };

  useEffect(() => {
    grabData();
  }, []);

  return <h1>{cards.length !== 0 ? mapCards(cards) : null}</h1>;
};

export default Homepage;
