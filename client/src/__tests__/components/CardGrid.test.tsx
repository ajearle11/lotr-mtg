import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardGrid } from "../../components/";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";


const mockStore = configureStore([]);
const fakeCardArray = [
  {
    name: "card",
    id: 0,
    image: "image-string",
    color: ["G", "B"],
    flavorText: "flavor-text",
    rarity: "Mythic",
    text: "text",
    type: "Sorcery",
    artist: "Alex Earle",
  },
  {
    name: "card",
    id: 1,
    image: "image-string",
    color: ["G", "B"],
    flavorText: "flavor-text",
    rarity: "Mythic",
    text: "text",
    type: "Sorcery",
    artist: "Alex Earle",
  },
];

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

const fakeCollectedCardsArray = [
  {
    name: "card",
    id: 0,
    image: "image-string",
    color: ["G", "B"],
    flavorText: "flavor-text",
    rarity: "Mythic",
    text: "text",
    type: "Sorcery",
    artist: "Alex Earle",
  },
];

describe("Card", () => {
  it("renders CardGrid component with no filters applied", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CardGrid
            cards={fakeCardArray}
            collectedCardsArray={fakeCollectedCardsArray}
            filterHave={false}
            filterHaveNot={false}
          />
        </Provider>
      </BrowserRouter>
    );
    screen.debug();
  });

  it("renders CardGrid component with filterHave applied", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CardGrid
            cards={fakeCardArray}
            collectedCardsArray={fakeCollectedCardsArray}
            filterHave
            filterHaveNot={false}
          />
        </Provider>
      </BrowserRouter>
    );
    screen.debug();
  });

  it("renders CardGrid component with filterHaveNot applied", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CardGrid
            cards={fakeCardArray}
            collectedCardsArray={fakeCollectedCardsArray}
            filterHave={false}
            filterHaveNot
          />
        </Provider>
      </BrowserRouter>
    );
    screen.debug();
  });

  it("renders no individual cards when the card array length is null", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CardGrid
            cards={[]}
            collectedCardsArray={fakeCollectedCardsArray}
            filterHave={false}
            filterHaveNot
          />
        </Provider>
      </BrowserRouter>
    );
    screen.debug();
  });
});
