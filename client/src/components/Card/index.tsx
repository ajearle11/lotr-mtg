import { ApiResponseData } from "../../interfaces/";
import { useNavigate } from "react-router-dom";
import { addToString } from "../../helperFunctions/helperFunctions";
import "./index.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppContext } from "../../contexts/";

const Card: React.FC<{
  card: ApiResponseData;
  hasGot: boolean;
}> = ({ card, hasGot }) => {
  const navigate = useNavigate();
  const { multiClickArray, setMultiClickArray } = useAppContext();

  //some logic for multiclicking
  const handleMultiClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains("card")) {
      if (!multiClickArray.includes(card)) {
        setMultiClickArray((multiClickArray) => [...multiClickArray, card]);
      } else {
        setMultiClickArray([...multiClickArray.filter((el) => el !== card)]);
      }
    }
  };

  return (
    <div
      onClick={handleMultiClick}
      className={!multiClickArray.includes(card) ? "card" : " card selected"}
    >
      <h3>{card.name}</h3>
      <div className="name-container">
        <p>#{addToString(card.id.toString())}</p>
        {hasGot ? (
          <CheckCircleOutlineIcon style={{ color: "#49b265" }} />
        ) : (
          <CancelIcon style={{ color: "#781f19" }} />
        )}
      </div>
      <img
        onClick={() => navigate(`${card.id}`)}
        className={hasGot ? "card-image" : "card-image-greyscale"}
        src={card.image}
      />
    </div>
  );
};

export default Card;
