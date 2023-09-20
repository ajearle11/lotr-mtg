import { useEffect, useState } from "react";
import {
  ApiResponseDataArray,
  ApiResponseData,
  getUserData,
} from "../../interfaces/";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/";
import {
  addToString,
  convertColor,
} from "../../helperFunctions/helperFunctions";
import "./index.css";
import { useAppContext } from "../../contexts/";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import OneRingLoad from "../../public/one-ring-load.gif";

const IndividualCardPage = () => {
  const navigate = useNavigate();
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

  const isUserAuth = async (): Promise<void> => {
    const response = await fetch("http://localhost:3000/users/isUserAuth", {
      credentials: "include",
    });
    console.log(response);
    const data = await response.json();
    setUser({ ...user, username: data.user.username });
    await grabUserData(data.user.username);
  };

  const grabUserData = async (username: string): Promise<void> => {
    const response = await fetch(`http://localhost:3000/users/${username}`, {
      credentials: "include",
    });
    const data: getUserData = await response.json();
    setUser(data);
  };

  const mapWholeScreen = (
    cards: ApiResponseDataArray
  ): (JSX.Element | undefined)[] => {
    return cards.map(
      (card: ApiResponseData, x: number): JSX.Element | undefined => {
        if (cardData[0].id === card.id) {
          return (
            <div key={card.id}>
              <h2 className="header-container">
                {cardData[0].name} - #{addToString(cardData[0].id.toString())}
                {user.cards.includes(x) ? (
                  <CheckCircleOutlineIcon
                    id="check"
                    style={{ color: "#49b265" }}
                  />
                ) : (
                  <CancelIcon id="cross" style={{ color: "#781f19" }} />
                )}
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
                <img
                  className={
                    user.cards.includes(x)
                      ? "individual-card-image"
                      : "individual-card-image-greyscale"
                  }
                  src={cardData[0].image}
                />
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
              <Button
                text={user.cards.includes(x) ? "Remove" : "Add"}
                onClick={addCardToUser}
              />
              <Button text="Home" onClick={() => navigate("/")} />
            </div>
          );
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
      credentials: "include",
      body: JSON.stringify({ newCard: numberToSend }),
    };

    const response = await fetch("http://localhost:3000/users/Alex", options);
    const data: Array<number> = await response.json();
    setUser({ ...user, cards: data });
  };

  useEffect(() => {
    grabData(id);
    grabAllCardData();
    isUserAuth();
  }, []);

  return (
    <>
      <div className="individual-card">
        {cardData.length < 0 ? (
          mapWholeScreen(cards)
        ) : (
          //import this elsewhere
          <div
            style={{
              height: "calc(100vh - 150px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "1000px",
              }}
              src={OneRingLoad}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default IndividualCardPage;
