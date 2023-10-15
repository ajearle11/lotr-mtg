import { describe, it, vi, expect, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../../components/";

const fn = vi.fn();

describe("Button", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders Button component", () => {
    render(<Button text="hi" onClick={() => null} isClicked />);
    screen.debug();
  });

  it("renders Button component with backButton prop set to true", () => {
    render(<Button text="hi" onClick={() => null} isClicked backButton />);
    screen.debug();
  });

  it("renders Button component with isClicked prop set to false", () => {
    render(
      <Button text="hi" onClick={() => null} isClicked={false} backButton />
    );
    screen.debug();
  });

  it("clicks the button then runs the onClick", () => {
    render(
      <Button text="hi" onClick={() => fn("hi")} isClicked={false} backButton />
    );

    const clickableButton = screen.getByRole("button-to-click");
    fireEvent.click(clickableButton);

    expect(fn.mock.calls[0]).toEqual(["hi"]);
  });
});
