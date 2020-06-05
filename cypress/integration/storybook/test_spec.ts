import { getStoryAddress } from "../../support/utils";

describe("Storybook", () => {
  it("has button", () => {
    cy.visit(getStoryAddress("button", "default"));
    cy.findByText("I'm a button!").should("exist");
  });
});
