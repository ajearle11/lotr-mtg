import { ButtonProps } from "../../interfaces/";
import "./index.css";

const Button = ({
  text,
  onClick,
  isClicked,
  backgroundColor = "silver",
  backButton = false,
}: ButtonProps) => {
  return (
    <>
      <button
        style={{
          backgroundColor: backgroundColor,
          border: backButton ? "white solid 1px" : undefined,
          borderRadius: backButton ? "1000px" : undefined,
          width: backButton ? "70px" : undefined,
          height: backButton ? "70px" : undefined,
          color: backButton ? "white" : undefined,
        }}
        className={isClicked ? "button active" : "button"}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
