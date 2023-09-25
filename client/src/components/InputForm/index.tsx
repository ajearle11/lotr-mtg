import { Button } from "../../components/";
import { FormProps } from "../../interfaces/";
import "./index.css";

const InputForm = ({ onSubmit, handleEmail, handlePassword }: FormProps) => {
  const checkUsernameNodes = () => {
    let usernameField = document.querySelectorAll(".input-container label")[0] as HTMLElement;
    let usernameFieldFocus = document.querySelectorAll(".input-container input")[0] as HTMLElement;
    usernameField.style.top = '-12px'
    usernameField.style.fontSize = '12px'
    console.log(document.hasFocus())
    usernameFieldFocus.focus()
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="input-container">
        <input type="mail" onChange={handleEmail} required />
        <label onClick={checkUsernameNodes}>Username</label>
      </div>
      <div className="input-container">
        <input type="password" onChange={handlePassword} required />
        <label>Password</label>
      </div>
      <Button text="Submit" />
    </form>
  );
};

export default InputForm;
