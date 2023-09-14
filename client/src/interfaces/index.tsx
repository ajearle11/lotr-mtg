interface ApiResponseData {
  name: string;
  id: number;
  image: string;
  color: Array<string>;
  flavorText: string;
  rarity: string;
  text: string;
  type: string;
  artist: string;
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

interface ErrorResponseData {
  error: string;
}

interface getUserData {
  _id: string;
  username: string;
  password: string;
  cards: Array<number>;
  __v: number;
}

export {
  type ApiResponseData,
  type ApiResponseDataArray,
  type ButtonProps,
  type FormProps,
  type LoginFormData,
  type getUserData,
  type LoginResponseData,
  type ErrorResponseData,
};
