import { Button } from "../../components/";
import { FormProps } from "../../interfaces/";
import "./index.css";

const InputForm = ({ onSubmit, handleEmail, handlePassword }: FormProps) => {
  
  
  document.addEventListener('click', (e) => {
    let usernameField = document.querySelectorAll(".input-container label")[0] as HTMLElement;
    let usernameFieldFocus = document.querySelectorAll(".input-container input")[0] as HTMLElement;
    if (e.target === usernameField || e.target === usernameFieldFocus) {
      usernameField.style.top = '-12px'
      usernameField.style.fontSize = '12px'
      usernameFieldFocus.focus()
    } else {
      if (document.activeElement === usernameFieldFocus || document.activeElement === usernameField)
      usernameField.style.position = 'absolute'
      usernameField.style.top = '0px'
      usernameField.style.fontSize = '16px'
      usernameFieldFocus.blur()
    }
  })

  document.addEventListener('click', (e) => {
    let passwordField = document.querySelectorAll(".input-container label")[1] as HTMLElement;
    let passwordFieldFocus = document.querySelectorAll(".input-container input")[1] as HTMLElement;
    if (e.target === passwordField || e.target === passwordFieldFocus) {
      passwordField.style.top = '-12px'
      passwordField.style.fontSize = '12px'
      passwordFieldFocus.focus()
    } else {
      if (document.activeElement === passwordFieldFocus || document.activeElement === passwordField)
      passwordField.style.position = 'absolute'
      passwordField.style.top = '0px'
      passwordField.style.fontSize = '16px'
      passwordFieldFocus.blur()
    }
  })

  return (
    <form onSubmit={onSubmit}>
      <div className="input-container">
        <input type="mail" onChange={handleEmail} required />
        <label>Username</label>
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
