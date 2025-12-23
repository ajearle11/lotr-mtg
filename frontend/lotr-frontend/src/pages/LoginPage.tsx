import { Form } from "../components";
import type { TField, TFormButton } from "../types";

interface ILoginPage {
  login?: boolean;
}

const LoginPage = ({ login = false }: ILoginPage) => {
  const loginButtons: TFormButton[] = [
    {
      title: login ? "Log in" : "Sign up",
      onClick: () => console.log("Wahey"),
    },
  ];

  const loginFields: TField[] = [
    {
      label: "Email",
      type: "email",
      placeholder: "Email",
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Password",
    },
  ];

  return (
    <>
      <img src="/lotrtome.png" />
      <img src="/mtg-logo.png" className="w-[200px]" />
      <Form
        title={login ? "Login" : "Sign up"}
        buttons={loginButtons}
        fields={loginFields}
      />
    </>
  );
};

export default LoginPage;
