/// <reference types="cypress" />

import { LoginPage } from "./pom/login.po.js";

const loginPage = new LoginPage();
const baseUrl = Cypress.config('baseUrl');

describe('login tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('login page completeness', () => {
    cy.fixture('completeness.json', (attr) => {
      loginPage.selector.loginLogo().should('have.text', attr.loginLogo);
      loginPage.selector.username().should('have.attr', 'placeholder', attr.username);
      loginPage.selector.password().should('have.attr', 'placeholder', attr.password);
      loginPage.selector.loginBtn().should('have.attr', 'value', attr.loginBtn);
    })
  });

  it('login attempt without any credentials', () => {
    loginPage.command.login();
    loginPage.command.validateErrorMsg('Epic sadface: Username is required');
  });

  it('login attempt with username but without password', () => {
    loginPage.command.login('standard_user', '');
    loginPage.command.validateErrorMsg('Epic sadface: Password is required');
  });

  it('login attempt with password but without username', () => {
    loginPage.command.login('', 'secret_sauce');
    loginPage.command.validateErrorMsg('Epic sadface: Username is required');
  });

  it('standard user login', () => {
    loginPage.command.login('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');
  });

  it('locked out user login', () => {
    loginPage.command.login('locked_out_user', 'secret_sauce');
    cy.url().should('eq', baseUrl);
    loginPage.command.validateErrorMsg('Epic sadface: Sorry, this user has been locked out.');
  });
})
