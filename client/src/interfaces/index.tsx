interface ApiResponseData {
  name: string;
  id: number;
  image: string;
}

//Either or
type ApiResponseDataArray = ApiResponseData[];
// interface ApiResponseDataArray extends Array<ApiResponseData> {}

interface ButtonProps {
  text: string;
  onClick?: React.MouseEventHandler;
  isClicked?: boolean;
}

interface FormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  handleEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginResponseData {
  auth: boolean;
  id: string;
  name: string;
  cards: [];
}

export {
  type ApiResponseData,
  type ApiResponseDataArray,
  type ButtonProps,
  type FormProps,
  type LoginFormData,
  type LoginResponseData,
};
