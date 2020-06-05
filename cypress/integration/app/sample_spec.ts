describe("Home", function () {
  it("motivates you", function () {
    cy.visit("http://localhost:3000/");
    cy.viewport("macbook-15");
    cy.findByText("Let's get some work done!").should("exist");
  });
});
