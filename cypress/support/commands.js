Cypress.Commands.add('getElementByTestId', (testid) => {
    return cy.get(`[data-test="${testid}"]`);
});

Cypress.Commands.add('findElementByTestId', { prevSubject: true }, (subject, testid) => {
    return subject.find(`[data-test="${testid}"]`);
});

Cypress.Commands.add('getElementByTestIdLike', (testid) => {
    return cy.get(`[data-test*="${testid}"]`);
});