import { useEffect, useState } from "react";
import { ApiResponseDataArray } from "../../interfaces/";
import { useParams } from "react-router-dom";
import { addToString } from "../../helperFunctions/helperFunctions";
import "./index.css";

const IndividualCardPage = () => {
  let { id } = useParams();
  const [cardData, setCardData] = useState<ApiResponseDataArray>([]);

  const grabData = async (id: string | undefined): Promise<void> => {
    const response = await fetch(
      `https://magicapi-r777.onrender.com/cards/id/${id}`
    );
    const data: ApiResponseDataArray = await response.json();
    setCardData(data);
  };

  useEffect(() => {
    grabData(id);
    console.log(cardData);
  }, []);

  return (
    <div className="individual-card">
      {cardData.length !== 0 ? (
        <>
          <h3>{cardData[0].name}</h3>
          <div className="individual-card-image-container">
            <img className="individual-card-image" src={cardData[0].image} />
            <div className="individual-card-image-stats-container">
              <p>#{addToString(cardData[0].id.toString())}</p>
              <p>Info</p>
              <p>More Info</p>
            </div>
          </div>
        </>
      ) : (
        <p>Hey</p>
      )}
    </div>
  );
};

export default IndividualCardPage;
