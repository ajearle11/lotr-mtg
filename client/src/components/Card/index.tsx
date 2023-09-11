import { ApiResponseData } from "../../interfaces/";
import { useNavigate } from "react-router-dom";
import { addToString } from "../../helperFunctions/helperFunctions";
import "./index.css";

const Card: React.FC<{ card: ApiResponseData }> = ({ card }) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <h3>{card.name}</h3>
      <p>#{addToString(card.id.toString())}</p>
      <img
        onClick={() => navigate(`${card.id}`)}
        className="card-image"
        src={card.image}
      />
    </div>
  );
};

export default Card;
