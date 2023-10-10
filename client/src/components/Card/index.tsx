import { ApiResponseData } from "../../interfaces/";
import { useNavigate } from "react-router-dom";
import { addToString } from "../../helperFunctions/helperFunctions";
import "./index.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setMultiClick } from "../../store/multiClickReducer";

const Card: React.FC<{
  card: ApiResponseData;
  hasGot: boolean;
}> = ({ card, hasGot }) => {
  const navigate = useNavigate();
  const multiClick = useSelector(
    (state: RootState) => state.multiClick.multiClick
  );
  const dispatch = useDispatch();

  //some logic for multiclicking
  const handleMultiClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains("card")) {
      if (!multiClick.includes(card)) {
        console.log("waoig");
        dispatch(setMultiClick([...multiClick, card]));
      } else {
        dispatch(setMultiClick([...multiClick.filter((el) => el !== card)]));
      }
    }
  };

  return (
    <div
      onClick={handleMultiClick}
      className={!multiClick.includes(card) ? "card" : " card selected"}
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
