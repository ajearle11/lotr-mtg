import { useEffect } from "react";
import { Button } from "../../components/";
import { FormProps } from "../../interfaces/";
import "./index.css";

const InputForm = ({ onSubmit, handleEmail, handlePassword }: FormProps) => {
  useEffect(() => {
    let usernameField = document.querySelectorAll(
      ".input-container label"
    )[0] as HTMLElement;
    let usernameFieldFocus = document.querySelectorAll(
      ".input-container input"
    )[0] as HTMLElement;
    let usernameFieldValue = document.querySelectorAll(
      ".input-container input"
    )[0] as HTMLInputElement;
    let passwordField = document.querySelectorAll(
      ".input-container label"
    )[1] as HTMLElement;
    let passwordFieldFocus = document.querySelectorAll(
      ".input-container input"
    )[1] as HTMLElement;
    let passwordFieldValue = document.querySelectorAll(
      ".input-container input"
    )[1] as HTMLInputElement;

    usernameFieldFocus.addEventListener("focus", () => {
      usernameField.style.top = "-12px";
      usernameField.style.fontSize = "12px";
    });

    usernameFieldFocus.addEventListener("blur", () => {
      if (usernameFieldValue.value === "") {
        usernameField.style.position = "absolute";
        usernameField.style.top = "0px";
        usernameField.style.fontSize = "16px";
      }
    });

    passwordFieldFocus.addEventListener("focus", () => {
      passwordField.style.top = "-12px";
      passwordField.style.fontSize = "12px";
    });

    passwordFieldFocus.addEventListener("blur", () => {
      if (passwordFieldValue.value === "") {
        passwordField.style.position = "absolute";
        passwordField.style.top = "0px";
        passwordField.style.fontSize = "16px";
      }
    });
  }, []);

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
