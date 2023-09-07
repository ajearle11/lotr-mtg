import { useEffect, useState } from "react";

interface ApiResponseData {
  name: string;
  id: number;
  image: string;
}

const Homepage = () => {
  const [cards, setCards] = useState<Array<ApiResponseData>>([]);

  const grabData = async (): Promise<void> => {
    const response = await fetch("http://localhost:3001/cards");
    const data: ApiResponseData[] = await response.json();

    setCards(data);
  };

  useEffect(() => {
    grabData();
  }, []);

  return <pre>{JSON.stringify(cards, null, 4)}</pre>;
};

export default Homepage;
