export class LoginPage {
    selector = {
        loginLogo: () => cy.get('.login_logo'),
        username: () => cy.getElementByTestId('username'),
        password: () => cy.getElementByTestId('password'),
        loginBtn: () => cy.getElementByTestId('login-button'),
        errorMsg: () => cy.getElementByTestId('error'),
        errorBtn: () => cy.getElementByTestId('error-button'),
    }
    
    command = {
        login: (username, password) => {
            if (username) this.selector.username().type(username);
            if (password) this.selector.password().type(password);
            this.selector.loginBtn().click();
        },
        validateErrorMsg: (msg) => {
            this.selector.errorMsg().should('be.visible').and('have.text', msg);
            this.selector.errorBtn().should('be.visible').click();
            this.selector.errorBtn().should('not.exist');
        }
    };
};