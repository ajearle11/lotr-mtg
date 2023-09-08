import { ApiResponseData, ApiResponseDataArray } from "../../interfaces/";
import { Card } from "../";
import "./index.css";

//When using complex types, you set the function type with the props you expect, rather than the destructured types themself
//for example,
//if you were to destrcuture:
// const CardGrid = ({ stringVarProp, numberVarProp, booleanVarProp }: SomeInterfaceType) => {

const CardGrid: React.FC<{ cards: ApiResponseDataArray }> = ({ cards }) => {
  const mapCards = (cards: ApiResponseDataArray): JSX.Element[] => {
    return cards.map((card: ApiResponseData): JSX.Element => {
      return <Card key={card.id} card={card} />;
    });
  };

  return (
    <div className="card-grid">
      {cards.length !== 0 ? mapCards(cards) : null}
    </div>
  );
};

export default CardGrid;
