import { getStoryAddress } from "../../support/utils";

describe("Storybook", () => {
  it("has button", () => {
    cy.visit(getStoryAddress("button", "default"));
    cy.findByText("I'm a button!").should("exist");
  });

  it("has calendar starting at 9:00, ending 18:00", () => {
    cy.visit(getStoryAddress("calendar", "default"));
    cy.findByText("9:00").should("exist");
    cy.findByText("18:00").should("exist");
  });
});
