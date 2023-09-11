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
  onClick: React.MouseEventHandler;
  isClicked?: boolean;
}

export { type ApiResponseData, type ApiResponseDataArray, type ButtonProps };
