interface ApiResponseData {
  name: string;
  id: number;
  image: string;
}

//Either or
type ApiResponseDataArray = ApiResponseData[];
// interface ApiResponseDataArray extends Array<ApiResponseData> {}

export { type ApiResponseData, type ApiResponseDataArray };
