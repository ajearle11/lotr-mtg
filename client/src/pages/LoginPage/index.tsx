import { useState } from "react";
import { InputForm } from "../../components/";
import TalesOfMidEarth from "../../../src/public/lotrtome.png";
import Magic from "../../../src/public/mtg-logo.png";
import {
  LoginFormData,
  LoginResponseData,
  ErrorResponseData,
} from "../../interfaces/";
import "./index.css";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const responseBody: LoginFormData = { username: "", password: "" };

  const onSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<LoginResponseData | ErrorResponseData> => {
    //could add void instead- depends what we do with the data
    event.preventDefault();
    responseBody.username = email;
    responseBody.password = password;

    const options: RequestInit = {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      credentials: "include",
      body: JSON.stringify(responseBody),
    };

    const response = await fetch("http://localhost:3000/users/login", options);
    const data = await response.json();
    if (response.status === 200) {
      window.location.reload();
    }
    return data;
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <div className="main-container">
      <div className="image-container">
        <img className="sub-image" src={Magic} />
        <img className="main-image" src={TalesOfMidEarth} />
      </div>
      <h2>Login</h2>
      <InputForm
        onSubmit={onSubmitHandler}
        handleEmail={handleEmail}
        handlePassword={handlePassword}
      />
      <p>
        Don't have an account? Register{" "}
        <a href="http://localhost:5173/register">here</a>
      </p>
    </div>
  );
};

export default LoginPage;
