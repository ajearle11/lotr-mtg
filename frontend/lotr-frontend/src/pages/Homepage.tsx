import { CardGrid, ButtonFilter } from "../components";
import { use } from "react";
import { rarityButtonFilters, typeButtonFilters } from "../utils/buttonFilters";

const grabAllData = fetch("https://magicapi-r777.onrender.com/cards").then(
  (r) => r.json()
);
const Homepage = () => {
  const cards = use(grabAllData);

  return (
    <>
      <ButtonFilter filters={rarityButtonFilters} />
      <ButtonFilter filters={typeButtonFilters} />
      <CardGrid data={cards} />
    </>
  );
};

export default Homepage;
