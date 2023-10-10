import { PropsWithChildren, useState, useContext, createContext } from "react";
import { ApiResponseDataArray, getUserData } from "../interfaces/";

type AppContextType = {
  cards: ApiResponseDataArray;
  setCards: React.Dispatch<React.SetStateAction<ApiResponseDataArray>>;
  user: getUserData;
  setUser: React.Dispatch<React.SetStateAction<getUserData>>;
};

const iAppContextState = {
  cards: [],
  setCards: () => {},
  user: { _id: "", username: "", password: "", cards: [], __v: 0 },
  setUser: () => {},
};

const AppContext = createContext<AppContextType>(iAppContextState);

export const AppContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [cards, setCards] = useState<ApiResponseDataArray>([]);

  const [user, setUser] = useState<getUserData>({
    _id: "",
    username: "",
    password: "",
    cards: [],
    __v: 0,
  });

  return (
    <AppContext.Provider
      value={{
        cards,
        setCards,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
