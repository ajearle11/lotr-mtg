import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { UpdateModal } from "../../components/";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import { store } from "../../store";

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

const fakeStore = mockStore({
  multiClick: {
    multiClick: fakeCardArray,
  },
});

const secondStore = mockStore({
  multiClick: {
    multiClick: [fakeCardArray[0]],
  },
});

describe("Card", () => {
  it("renders updateModal with fade-out class", () => {
    render(
      <BrowserRouter>
        <Provider store={fakeStore}>
          <UpdateModal className="fade-out" />
        </Provider>
      </BrowserRouter>
    );
    screen.debug();
  });

  it("renders updateModal with update-modal-container class", () => {
    render(
      <BrowserRouter>
        <Provider store={fakeStore}>
          <UpdateModal className="update-modal-container" />
        </Provider>
      </BrowserRouter>
    );
    screen.debug();
    const cardAmount = screen.getByRole("card-amount");
    expect(cardAmount).toHaveTextContent("You have selected 2 cards");
  });

  it("renders updateModal with update-modal-container class with one card", () => {
    render(
      <BrowserRouter>
        <Provider store={secondStore}>
          <UpdateModal className="update-modal-container" />
        </Provider>
      </BrowserRouter>
    );
    screen.debug();
    const cardAmount = screen.getByRole("card-amount");
    expect(cardAmount).toHaveTextContent("You have selected 1 card");
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

  it("it should call addCardsToUser", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <UpdateModal className="hidden" />
        </Provider>
      </BrowserRouter>
    );

    const clickableItem = screen.getAllByRole("button-to-click");
    const cardAmount = screen.getByRole("card-amount");
  
    const user = userEvent.setup();
    await user.click(clickableItem[0]);

    expect(cardAmount).toHaveTextContent("You have selected 0 cards");
  });
});
