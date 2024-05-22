describe("Overriding the Rekor Endpoint", () => {
	beforeEach(function () {
		// spy on requests to the API to verify correct endpoint
		cy.intercept("GET", "/api/v1/log/entries/*").as("getSearchByEmail");
	});

	it("should use the fallback endpoint if one is not provided", () => {
		cy.visit("/");
		cy.get('[data-testid="settings-button"]').click();
		cy.get('[data-testid="settings-modal"]').should("be.visible");
		cy.get('[data-testid="rekor-endpoint-override"]').should("be.visible");
		cy.get('[data-testid="settings-confirm-button"]').should("be.visible");
		cy.get('[data-testid="settings-close-button"]').should("be.visible");

		// verify that it shows the correct endpoint in the Settings UI
		cy.get('[data-testid="rekor-endpoint-override"]').should(
			"have.value",
			"https://rekor.sigstore.dev",
		);

		// do a search to trigger network request
		cy.get('[data-testid="settings-close-button"]').click();
		cy.get("#rekor-search-email").type("bob.callaway@gmail.com");
		cy.get("#search-form-button").click();

		// verify that it makes the proper request
		cy.wait("@getSearchByEmail")
			.its("request.url")
			.should("include", "https://rekor.sigstore.dev");
	});
});
