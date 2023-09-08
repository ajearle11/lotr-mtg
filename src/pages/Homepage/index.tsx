import { useEffect, useState } from "react";
import { CardGrid } from "../../components/";
import { ApiResponseDataArray } from "../../interfaces/";

const Homepage = (): JSX.Element => {
  const [cards, setCards] = useState<ApiResponseDataArray>([]);

  const grabData = async (): Promise<void> => {
    const response = await fetch("http://localhost:3001/cards");
    const data: ApiResponseDataArray = await response.json();

    setCards(data);
  };

  useEffect(() => {
    grabData();
  }, []);

  return <CardGrid cards={cards} />;
};

export default Homepage;
