import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "../../components/";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore([]);

const store = mockStore({
  multiClick: {
    multiClick: [],
  },
  symbols: {
    symbol: "",
  },
  colors: {
    color: "",
  },
  searchValue: {
    searchValue: "",
  },
});
// const data = useSelector(state => state.yourReducer.data);

const fakeCard = {
  name: "card",
  id: 0,
  image: "image-string",
  color: ["G", "B"],
  flavorText: "flavor-text",
  rarity: "Mythic",
  text: "text",
  type: "Sorcery",
  artist: "Alex Earle",
};

describe("Card", () => {
  it("renders Card component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Card card={fakeCard} hasGot />
        </Provider>
      </BrowserRouter>
    );
    screen.debug();
  });

  it("renders Card component with prop hasGot set to false", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Card card={fakeCard} hasGot={false} />
        </Provider>
      </BrowserRouter>
    );
    screen.debug();
  });
});
