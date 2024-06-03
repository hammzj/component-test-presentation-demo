/// <reference types="cypress" />
import {mount} from "cypress/react18";

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            spyConsoleLog(): Chainable<any>
            assertCheckoutSidebarProduct(product: Omit<Products.CheckoutInfo, 'requiresShipping'>): Chainable<any>
            assertCountOfCheckoutSidebarProducts(count: number): Chainable<any>
            mount: typeof mount
        }
    }
}
