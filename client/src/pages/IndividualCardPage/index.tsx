import { useEffect, useState } from "react";
import {
  ApiResponseDataArray,
  ApiResponseData,
  getUserData,
} from "../../interfaces/";
import { useParams } from "react-router-dom";
import { Button } from "../../components/";
import {
  addToString,
  convertColor,
  loadingAnimation,
} from "../../helperFunctions/helperFunctions";
import "./index.css";
import { useAppContext } from "../../contexts/";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { setAuth } from "../../store/authReducer";
import { useDispatch } from "react-redux";

const IndividualCardPage = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { cards, setCards, user, setUser, setAnimation } = useAppContext();
  let { id } = useParams();
  const [cardData, setCardData] = useState<ApiResponseDataArray>([]);
  //will be in the data you get from the api for individual users. Need redux or context

  const grabData = async (id: string | undefined): Promise<void> => {
    const response = await fetch(
      `https://magicapi-r777.onrender.com/cards/id/${id}`
    );
    const data: ApiResponseDataArray = await response.json();
    if (response.status === 403) {
      dispatch(setAuth(false));
      window.location.href = "http://localhost:5173/";
    } else {
      setCardData(data);
    }
  };

  const grabAllCardData = async (): Promise<void> => {
    const response = await fetch("https://magicapi-r777.onrender.com/cards");
    const data: ApiResponseDataArray = await response.json();
    if (response.status === 403) {
      dispatch(setAuth(false));
      window.location.href = "http://localhost:5173/";
    } else {
      setCards(data);
    }
  };

  const isUserAuth = async (): Promise<void> => {
    const response = await fetch("http://localhost:3000/users/isUserAuth", {
      credentials: "include",
    });
    if (response.status === 403) {
      dispatch(setAuth(false));
      window.location.href = "http://localhost:5173/";
    } else {
      const data = await response.json();
      setUser({ ...user, username: data.user.username });
      await grabUserData(data.user.username);
    }
  };

  const grabUserData = async (username: string): Promise<void> => {
    const response = await fetch(`http://localhost:3000/users/${username}`, {
      credentials: "include",
    });
    const data: getUserData = await response.json();
    if (response.status === 403) {
      dispatch(setAuth(false));
      window.location.href = "http://localhost:5173/";
    } else {
      setUser(data);
    }
  };

  const mapWholeScreen = (
    cards: ApiResponseDataArray
  ): (JSX.Element | undefined)[] => {
    return cards.map((card: ApiResponseData): JSX.Element | undefined => {
      if (cardData[0].id === card.id) {
        return (
          <>
            <div key={card.id}>
              <h2 className="header-container">
                {cardData[0].name} - #{addToString(cardData[0].id.toString())}
                {user.cards.filter((el) => el.id === card.id).length === 1 ? (
                  <CheckCircleOutlineIcon
                    id="check"
                    style={{ color: "#49b265" }}
                  />
                ) : (
                  <CancelIcon id="cross" style={{ color: "#781f19" }} />
                )}
              </h2>
              <h3>
                {cardData[0].rarity} - {cardData[0].type}
              </h3>
              {cardData[0].color ? (
                <h3>{convertColor(cardData[0].color)}</h3>
              ) : (
                <h3>Colourless</h3>
              )}
              <div className="individual-card-image-container">
                <img
                  className={
                    user.cards.filter((el) => el.id === card.id).length === 1
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
                text={
                  user.cards.filter((el) => el.id === card.id).length === 1
                    ? "Remove -"
                    : "Add +"
                }
                onClick={addCardToUser}
              />
            </div>
          </>
        );
      }
    });
  };

  const addCardToUser = async (): Promise<void> => {
    // let numberToSend;
    // console.log(cardData);

    // cards.forEach(
    //   (card: ApiResponseData, x: number): void | number | undefined => {
    //     if (cardData[0].id === card.id) {
    //       numberToSend = x;
    //     }
    //   }
    // );

    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      credentials: "include",
      body: JSON.stringify({ newCard: cardData }),
    };

    const response = await fetch("http://localhost:3000/users/Alex", options);
    const data: ApiResponseDataArray = await response.json();
    setUser({ ...user, cards: data });
  };

  useEffect(() => {
    grabData(id);
    grabAllCardData();
    isUserAuth();
    setAnimation("hidden");
  }, []);

  return (
    <>
      <div className="individual-card">
        {cardData.length !== 0 ? mapWholeScreen(cards) : loadingAnimation()}
      </div>
    </>
  );
};

export default IndividualCardPage;
