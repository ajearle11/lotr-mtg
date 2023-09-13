import { PropsWithChildren, useState, useContext, createContext } from "react";
import { ApiResponseDataArray } from "../interfaces/";

type AppContextType = {
  cards: ApiResponseDataArray;
  setCards: React.Dispatch<React.SetStateAction<ApiResponseDataArray>>;
};

const iAppContextState = {
  cards: [],
  setCards: () => {},
};

const AppContext = createContext<AppContextType>(iAppContextState);

export const AppContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [cards, setCards] = useState<ApiResponseDataArray>([]);

  return (
    <AppContext.Provider
      value={{
        cards,
        setCards,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
