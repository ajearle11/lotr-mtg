import { ApiResponseData } from "../../interfaces/";
import "./index.css";

const Card: React.FC<{ card: ApiResponseData }> = ({ card }) => {
  const addToString = (string: string): string => {
    if (string.length === 3) {
      return string;
    } else if (string.length === 2) {
      return "0" + string;
    } else {
      return "00" + string;
    }
  };

  return (
    <div className="card">
      <h3>{card.name}</h3>
      <p>#{addToString(card.id.toString())}</p>
      <img className="card-image" src={card.image} />
    </div>
  );
};

export default Card;
