export class InventoryPO {
    selector = {
        appLogo: () => cy.get('.app_logo'),
        appTitle: () => cy.getElementByTestId('title'),
        burgerBtn: () => cy.get('#react-burger-menu-btn'),
        cartIcon: () => cy.getElementByTestId('shopping-cart-link'),
        sortingPicklist: () => cy.getElementByTestId('product-sort-container'),
        sidebar: {
            ownReference: () => cy.get('.bm-menu-wrap'),
            sidebarAllItems: () => cy.getElementByTestId('inventory-sidebar-link'),
            sidebarAbout: () => cy.getElementByTestId('about-sidebar-link'),
            sidebarLogout: () => cy.getElementByTestId('logout-sidebar-link'),
            sidebarResetState: () => cy.getElementByTestId('reset-sidebar-link'),
            closeBtn: () => cy.get('#react-burger-cross-btn'),
        },
        item: {
            ownReference: () => cy.getElementByTestId('inventory_item_description'),
            name: () => cy.getElementByTestId('inventory-item-name'),
            description: () => cy.getElementByTestId('inventory_item_desc'),
            price: () => cy.getElementByTestId('inventory-item-price'),
            addToCart: () => cy.getElementByTestIdLike('add-to-cart'),
        },
    };

    command = {
        checkElementsSorting: (elem, asc = true, isNumeric = false) => {
            const converToNum = (arr) => arr.map((elem) => elem.replace('$', ''));
            return elem.then(($elements) => {
                const elementsArr = Cypress.$.makeArray($elements);
                return elementsArr.map(elem => elem.innerText);
            }).then(($namesArr) => {
                const originalArr = isNumeric ? converToNum([...$namesArr]) : [...$namesArr];
                let sortedArr = [...originalArr].sort((a, b) => a - b);
                sortedArr = asc ? sortedArr : isNumeric ? sortedArr.reverse() : sortedArr;
                expect(sortedArr).to.deep.equal(originalArr);
            });
        },
    };
};