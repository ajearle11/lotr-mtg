import { ButtonProps } from "../../interfaces/";
import "./index.css";

const Button = ({ text, onClick, isClicked = false }: ButtonProps) => {
  return (
    <>
      <button
        className={isClicked ? "button active" : "button"}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
