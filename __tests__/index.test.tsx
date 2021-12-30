import { render, screen } from "@testing-library/react";
import Home from "../src/pages/index.page";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const button = screen.getByRole("link", {
      name: "Documentation",
    });

    expect(button).toBeInTheDocument();
  });
});
