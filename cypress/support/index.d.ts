/// <reference types="cypress" />
import {mount} from "cypress/react18";

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            spyConsoleLog(): Chainable<any>
            mount: typeof mount
        }
    }
}
