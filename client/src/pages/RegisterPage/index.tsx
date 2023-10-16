import { useState } from "react";
import { InputForm } from "../../components/";
import { LoginFormData } from "../../interfaces/";
import TalesOfMidEarth from "../../../src/public/lotrtome.png";
import Magic from "../../../src/public/mtg-logo.png";
import "../LoginPage/index.css";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authReducer";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const responseBody: LoginFormData = { username: "", password: "" };

  const onSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
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

    const response = await fetch(
      "http://localhost:3000/users/register",
      options
    );
    await response.json();

    if (response.status === 201) {
      const options: RequestInit = {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        credentials: "include",
        body: JSON.stringify(responseBody),
      };
      const response = await fetch(
        "http://localhost:3000/users/login",
        options
      );
      await response.json();
      if (response.status === 200) {
        dispatch(setAuth(true));
        window.location.href = "http://localhost:5173/";
      } else {
        dispatch(setAuth(false));
        window.location.href = "http://localhost:5173/";
      }
    }
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
      <h2>Register</h2>
      <InputForm
        onSubmit={onSubmitHandler}
        handleEmail={handleEmail}
        handlePassword={handlePassword}
      />
      <p>
        Already have an account? Login <a href="http://localhost:5173/">here</a>
      </p>
    </div>
  );
};

export default RegisterPage;
