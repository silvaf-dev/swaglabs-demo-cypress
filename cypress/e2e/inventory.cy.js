/// <reference types="cypress" />

import { LoginPO } from "./pom/login.po.js";
import { InventoryPO } from "./pom/inventory.po.js";

const loginPage = new LoginPO();
const inventoryPage = new InventoryPO();

describe('inventory tests', () => {
  beforeEach('login', () => {
    cy.visit('/');
    loginPage.command.login('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');
  });

  it('inventory page completeness', () => {
    inventoryPage.selector.appLogo().should('have.text', 'Swag Labs');
    inventoryPage.selector.appTitle().should('have.text', 'Products');
    inventoryPage.selector.burgerBtn().should('be.visible');
    inventoryPage.selector.sidebar.ownReference().should('not.be.visible');
    inventoryPage.selector.cartIcon().should('be.visible');
    inventoryPage.selector.sortingPicklist().should('be.visible');
  });

  it('sidebar completeness', () => {
    inventoryPage.selector.burgerBtn().click();
    inventoryPage.selector.sidebar.ownReference().should('be.visible');
    inventoryPage.selector.sidebar.sidebarAllItems().should('be.visible').and('have.text', 'All Items');
    inventoryPage.selector.sidebar.sidebarAbout().should('be.visible').and('have.text', 'About');
    inventoryPage.selector.sidebar.sidebarLogout().should('be.visible').and('have.text', 'Logout');
    inventoryPage.selector.sidebar.sidebarResetState().should('be.visible').and('have.text', 'Reset App State');
    inventoryPage.selector.sidebar.closeBtn().should('be.visible').click();
    inventoryPage.selector.sidebar.ownReference().should('not.be.visible');
  })

  it('sorting picklist', () => {
    const options = {
      'Name (Z to A)': {
        asc: false,
        numeric: false,
      },
      'Name (A to Z)': {
        asc: true,
        numeric: false,
      },
      'Price (high to low)': {
        asc: false,
        numeric: true,
      },
      'Price (low to high)': {
        asc: true,
        numeric: true,
      }
    };
    Object.keys(options).forEach((opt) => {
      inventoryPage.selector.sortingPicklist().select(opt);
      inventoryPage.command.checkElementsSorting(inventoryPage.selector.item.name(), opt.asc, opt.numeric);
    });
  });
})
