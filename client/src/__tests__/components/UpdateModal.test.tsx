import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { UpdateModal } from "../../components/";
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
    multiClick: fakeCardArray,
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

describe("Card", () => {
  it("renders updateModal with fade-out class", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <UpdateModal className="fade-out" />
        </Provider>
      </BrowserRouter>
    );
    screen.debug();
  });

  it("renders updateModal with update-modal-container class", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <UpdateModal className="update-modal-container" />
        </Provider>
      </BrowserRouter>
    );
    screen.debug();
  });

  it("renders updateModal with hidden class", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <UpdateModal className="hidden" />
        </Provider>
      </BrowserRouter>
    );
    screen.debug();
  });
});
