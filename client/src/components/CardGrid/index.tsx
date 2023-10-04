import { ApiResponseData, ApiResponseDataArray } from "../../interfaces/";
import { Card } from "../";
import "./index.css";

//When using complex types, you set the function type with the props you expect, rather than the destructured types themself
//for example,
//if you were to destrcuture:
// const CardGrid = ({ stringVarProp, numberVarProp, booleanVarProp }: SomeInterfaceType) => {

const CardGrid: React.FC<{
  cards: ApiResponseDataArray;
  collectedCardsArray: ApiResponseDataArray;
  filterHave: boolean;
  filterHaveNot: boolean;
}> = ({ cards, collectedCardsArray, filterHave, filterHaveNot }) => {
  const mapCards = (
    cards: ApiResponseDataArray,
    filterHave: boolean,
    filterHaveNot: boolean
  ): (JSX.Element | undefined)[] => {
    //   const x = 10;
    //   const y = 19;
    //if we wanted to treat it like a binder etc.
    // return cards.slice(x, y).map((card: ApiResponseData): JSX.Element => {
    return cards.map((card: ApiResponseData): JSX.Element | undefined => {
      if (!filterHave && !filterHaveNot) {
        if (
          collectedCardsArray.filter((el) => el.id === card.id).length === 1
        ) {
          return <Card key={card.id} card={card} hasGot={true} />;
        } else {
          return <Card key={card.id} card={card} hasGot={false} />;
        }
      } else if (filterHave) {
        if (
          collectedCardsArray.filter((el) => el.id === card.id).length === 1
        ) {
          return <Card key={card.id} card={card} hasGot={true} />;
        }
      } else {
        if (
          !(collectedCardsArray.filter((el) => el.id === card.id).length === 1)
        ) {
          return <Card key={card.id} card={card} hasGot={false} />;
        }
      }
    });
  };

  return (
    <div className="card-grid">
      {cards.length !== 0 ? mapCards(cards, filterHave, filterHaveNot) : null}
    </div>
  );
};

export default CardGrid;
