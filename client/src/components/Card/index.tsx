import { ApiResponseData } from "../../interfaces/";
import { useNavigate } from "react-router-dom";
import { addToString } from "../../helperFunctions/helperFunctions";
import "./index.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";

const Card: React.FC<{ card: ApiResponseData; hasGot: boolean }> = ({
  card,
  hasGot,
}) => {
  const navigate = useNavigate();

  return (
    <div className="card">
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
        className="card-image"
        src={card.image}
      />
    </div>
  );
};

export default Card;
