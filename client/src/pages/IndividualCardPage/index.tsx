import { useEffect, useState } from "react";
import { ApiResponseDataArray } from "../../interfaces/";
import { useParams } from "react-router-dom";
import {
  addToString,
  convertColor,
} from "../../helperFunctions/helperFunctions";
import "./index.css";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import CancelIcon from "@mui/icons-material/Cancel";

const IndividualCardPage = () => {
  let { id } = useParams();
  const [cardData, setCardData] = useState<ApiResponseDataArray>([]);
  //will be in the data you get from the api for individual users. Need redux or context
  // const [collectedCardsArray, setCollectedCardsArray] = useState<number[]>([
  //   0, 1, 3,
  // ]);

  const grabData = async (id: string | undefined): Promise<void> => {
    const response = await fetch(
      `https://magicapi-r777.onrender.com/cards/id/${id}`
    );
    const data: ApiResponseDataArray = await response.json();
    setCardData(data);
  };

  useEffect(() => {
    grabData(id);
  }, []);

  return (
    <div className="individual-card">
      {cardData.length !== 0 ? (
        <>
          <h2 className="header-container">
            {cardData[0].name} - #{addToString(cardData[0].id.toString())}
            {/* {collectedCardsArray.includes(0) ? (
              <CheckCircleOutlineIcon style={{ color: "#49b265" }} />
            ) : (
              <CancelIcon style={{ color: "#781f19" }} />
            )} */}
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
            <img className="individual-card-image" src={cardData[0].image} />
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
        </>
      ) : (
        //improve this
        <p>Loading</p>
      )}
    </div>
  );
};

export default IndividualCardPage;
