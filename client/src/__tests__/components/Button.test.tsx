import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../../components/";

describe("Button", () => {
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
});
