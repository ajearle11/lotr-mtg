import { Dispatch } from "redux";

export const setColor = (string: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: "setColor",
      payload: string,
    });
  };
};

export const setSymbol = (string: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: "setSymbol",
      payload: string,
    });
  };
};
