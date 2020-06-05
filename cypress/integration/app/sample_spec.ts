describe("Home", function () {
  it("greats you and signs up", function () {
    cy.visit("http://localhost:3000/");
    cy.viewport("macbook-15");
    cy.findByText("Scaffold").should("exist");
  });
});
