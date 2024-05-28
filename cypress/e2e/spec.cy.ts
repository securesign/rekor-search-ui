describe("Rekor Search UI", () => {
	it("should properly render home page", () => {
		cy.visit("/");
		cy.get("body").should("contain", "Attribute");
		cy.get("body").should("contain", "Email");
	});
});
