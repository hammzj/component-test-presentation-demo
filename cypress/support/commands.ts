// @ts-ignore
Cypress.Commands.add('spyConsoleLog', function () {
    //See here: https://glebbahmutov.com/cypress-examples/recipes/check-console-logs.html#check-at-the-end-of-the-test
    cy.window().then((win) => {
        cy.spy(win.console, "log").as('log')
    })
})
