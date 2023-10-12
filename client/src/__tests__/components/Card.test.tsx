import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Card } from "../../components/";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

const mockStore = configureStore([]);

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

const store = mockStore({
  multiClick: {
    multiClick: [fakeCard],
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

  it("provides the correct classname on the card when multiclick is length > 0", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Card card={fakeCard} hasGot={false} />
        </Provider>
      </BrowserRouter>
    );
    const clickableDiv = screen.getByRole("card-element");
    fireEvent.click(clickableDiv);
    expect(clickableDiv).toHaveClass("selected");
  });

  it("provides the correct classname on the card when multiclick is length 0", async () => {
    const secondStore = mockStore({
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
    render(
      <BrowserRouter>
        <Provider store={secondStore}>
          <Card card={fakeCard} hasGot={false} />
        </Provider>
      </BrowserRouter>
    );
    const clickableDiv = screen.getByRole("card-element");
    const user = userEvent.setup();
    await user.click(clickableDiv);
    expect(clickableDiv).toHaveClass("card");
    expect(clickableDiv).not.toHaveClass("selected");
  });

  it("Clicks the card image", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Card card={fakeCard} hasGot />
        </Provider>
      </BrowserRouter>
    );
    const clickableImage = screen.getByRole("card-image");
    const user = userEvent.setup();
    await user.click(clickableImage);
    expect(clickableImage).toHaveClass("card-image");
  });
});
