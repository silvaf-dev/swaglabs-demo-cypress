Cypress.Commands.add('getElementByTestId', (testid) => {
    return cy.get(`[data-test="${testid}"]`);
});