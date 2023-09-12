import { useState } from "react";
import { InputForm } from "../../components/";
import { LoginFormData, LoginResponseData } from "../../interfaces/";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const responseBody: LoginFormData = { username: "", password: "" };

  const onSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<LoginResponseData | void> => {
    event.preventDefault();
    responseBody.username = email;
    responseBody.password = password;

    const options: RequestInit = {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(responseBody),
    };

    //TO ADD WHEN I CAN BE BOTHERED
    //   type JSONResponse = {
    //     data?: {
    //       pokemon: Omit<PokemonData, 'fetchedAt'>
    //     }
    //     errors?: Array<{message: string}>
    //   }
    //   const {data, errors}: JSONResponse = await response.json()
    //   if (response.ok) {
    //     const pokemon = data?.pokemon
    //     if (pokemon) {
    //       // add fetchedAt helper (used in the UI to help differentiate requests)
    //       return Object.assign(pokemon, {fetchedAt: formatDate(new Date())})
    //     } else {
    //       return Promise.reject(new Error(`No pokemon with the name "${name}"`))
    //     }
    //   } else {
    //     // handle the graphql errors
    //     const error = new Error(errors?.map(e => e.message).join('\n') ?? 'unknown')
    //     return Promise.reject(error)
    //   }
    // }
    const response = await fetch("http://localhost:3000/users/login", options);
    const data = await response.json();
    console.log(data.auth);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <>
      <InputForm
        onSubmit={onSubmitHandler}
        handleEmail={handleEmail}
        handlePassword={handlePassword}
      />
    </>
  );
};

export default LoginPage;
