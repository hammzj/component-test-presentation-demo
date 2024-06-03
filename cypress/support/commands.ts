// @ts-ignore
import {slowCypressDown} from 'cypress-slow-down'
import {formatAsCurrency} from "../../src/components/checkout/utils";

Cypress.Commands.add("spyConsoleLog", function () {
    //See here: https://glebbahmutov.com/cypress-examples/recipes/check-console-logs.html#check-at-the-end-of-the-test
    cy.window().then((win) => {
        cy.spy(win.console, "log").as("log");
    });
});

Cypress.Commands.add(
    "assertCheckoutSidebarProduct",
    function (product: Omit<Products.CheckoutInfo, "requiresShipping">) {
        cy.get(`[data-testid='checkout-info-section']`).within(() => {
            cy.contains(`[data-testid="product-info"]`, product.name).as("product");
            cy.get("@product").find(".MuiListItemText-primary").should("have.text", product.name);

            if (product.desc !== "") {
                cy.get("@product")
                    .find(".MuiListItemText-secondary")
                    .should("have.text", product.desc);
            } else {
                cy.get("@product").find(".MuiListItemText-secondary").should("not.exist");
            }

            cy.get("@product")
                .find('[data-testid="price"]')
                .should("have.text", formatAsCurrency(product.price));
        });
    }
);

Cypress.Commands.add("assertCountOfCheckoutSidebarProducts", function (count: number) {
    cy.get(`[data-testid='checkout-info-section']`).within(() => {
        cy.get(`[data-testid="product-info"]`).should("have.length", count);
    });
});


if (Cypress.env('COMMAND_DELAY')) {
    slowCypressDown(Cypress.env('COMMAND_DELAY') || 0, false)
}
