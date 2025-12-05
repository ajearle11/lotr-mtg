import { Card } from ".";
import type { TCard } from "../types";

interface ICardGrid {
  data: Array<TCard>;
}

const CardGrid = ({data}: ICardGrid) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 px-5 pt-5">
      {data?.map((item) => (
        <Card
          key={item.id}
          name={item.name}
          id={item.id}
          type={item.type}
          collected={true}
          imageSrc={item.image}
        />
      ))}
    </div>
  );
};

export default CardGrid;
