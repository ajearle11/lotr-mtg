import { useEffect, useState } from "react";
import { ApiResponseDataArray, ApiResponseData } from "../../interfaces/";
import { useParams } from "react-router-dom";
import { Button } from "../../components/";
import {
  addToString,
  convertColor,
} from "../../helperFunctions/helperFunctions";
import "./index.css";
import { useAppContext } from "../../contexts/";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";

const IndividualCardPage = () => {
  const { cards, setCards, user, setUser } = useAppContext();
  let { id } = useParams();
  const [cardData, setCardData] = useState<ApiResponseDataArray>([]);
  //will be in the data you get from the api for individual users. Need redux or context

  const grabData = async (id: string | undefined): Promise<void> => {
    const response = await fetch(
      `https://magicapi-r777.onrender.com/cards/id/${id}`
    );
    const data: ApiResponseDataArray = await response.json();
    setCardData(data);
  };

  const grabAllCardData = async (): Promise<void> => {
    const response = await fetch("https://magicapi-r777.onrender.com/cards");
    const data: ApiResponseDataArray = await response.json();
    setCards(data);
  };

  const mapCards = (
    cards: ApiResponseDataArray
  ): (JSX.Element | undefined)[] => {
    return cards.map(
      (card: ApiResponseData, x: number): JSX.Element | undefined => {
        if (cardData[0].id === card.id) {
          if (user.cards.includes(x)) {
            return (
              <CheckCircleOutlineIcon
                id="check"
                key={card.id}
                style={{ color: "#49b265" }}
              />
            );
          } else {
            return (
              <CancelIcon
                id="cross"
                key={card.id}
                style={{ color: "#781f19" }}
              />
            );
          }
        }
      }
    );
  };

  const mapImage = (
    cards: ApiResponseDataArray
  ): (JSX.Element | undefined)[] => {
    return cards.map(
      (card: ApiResponseData, x: number): JSX.Element | undefined => {
        if (cardData[0].id === card.id) {
          if (user.cards.includes(x)) {
            return (
              <img
                className="individual-card-image"
                key={card.id}
                src={cardData[0].image}
              />
            );
          } else {
            return (
              <img
                className="individual-card-image-greyscale"
                key={card.id}
                src={cardData[0].image}
              />
            );
          }
        }
      }
    );
  };

  const mapButton = (
    cards: ApiResponseDataArray
  ): (JSX.Element | undefined)[] => {
    return cards.map(
      (card: ApiResponseData, x: number): JSX.Element | undefined => {
        if (cardData[0].id === card.id) {
          if (user.cards.includes(x)) {
            return (
              <Button text="Remove" key={card.id} onClick={addCardToUser} />
            );
          } else {
            return <Button text="Add" key={card.id} onClick={addCardToUser} />;
          }
        }
      }
    );
  };

  const addCardToUser = async (): Promise<void> => {
    let numberToSend;

    cards.forEach(
      (card: ApiResponseData, x: number): void | number | undefined => {
        if (cardData[0].id === card.id) {
          numberToSend = x;
        }
      }
    );

    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ newCard: numberToSend }),
    };

    const response = await fetch(
      "http://localhost:3000/users/stinkyAl",
      options
    );
    const data: Array<number> = await response.json();
    console.log(data);
    setUser({ ...user, cards: data });
  };

  useEffect(() => {
    grabData(id);
    grabAllCardData();
  }, []);

  return (
    <div className="individual-card">
      {cardData.length !== 0 ? (
        <>
          <h2 className="header-container">
            {cardData[0].name} - #{addToString(cardData[0].id.toString())}
            {mapCards(cards)}
          </h2>
          <p>
            {cardData[0].rarity} - {cardData[0].type}
          </p>
          {cardData[0].color ? (
            <p>{convertColor(cardData[0].color)}</p>
          ) : (
            <p>Colourless</p>
          )}
          <div className="individual-card-image-container">
            {mapImage(cards)}
            <div className="individual-card-image-stats-container">
              <p>{cardData[0].text}</p>
              <p>
                <em>{cardData[0].flavorText}</em>
              </p>
              <p>
                Artwork: <em>{cardData[0].artist}</em>
              </p>
            </div>
          </div>
          {mapButton(cards)}
        </>
      ) : (
        //improve this
        <p>Loading</p>
      )}
    </div>
  );
};

export default IndividualCardPage;
