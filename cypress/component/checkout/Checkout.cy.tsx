import React from "react";
import Checkout from "../../../src/components/checkout/Checkout";
import {formatAsCurrency} from "../../../src/components/checkout/utils";

const validateSidebarProduct = (product: Omit<Products.CheckoutInfo, 'requiresShipping'>) => {
    cy.get(`[data-testid='checkout-info-section']`)
        .within(() => {
            cy.contains(`[data-testid="product-info"]`, product.name).as('product')
            cy.get('@product')
                .find('.MuiListItemText-primary')
                .should('have.text', product.name)

            if (product.desc !== '') {
                cy.get('@product')
                    .find('.MuiListItemText-secondary')
                    .should('have.text', product.desc)
            } else {
                cy.get('@product')
                    .find('.MuiListItemText-secondary').should('not.exist')
            }

            cy.get('@product')
                .find('[data-testid="price"]')
                .should('have.text', formatAsCurrency(product.price))
        })
}

describe('Checkout', function () {
    it('exists', function () {
        cy.mount(<Checkout/>)
        cy.get('[data-testid=checkout]').should('exist')
    })

    describe('sidebar', function () {
        context('HTML rendering', function () {
            it('has a Back button to the index page', function () {
                cy.mount(<Checkout/>)

                cy.get('[data-testid=sidebar]')
                    .contains('a', 'Back to')
                    .should('exist')
                    .invoke('attr', 'href').should('eq', '/')
                cy.contains('a', 'Back to').find("svg#company-icon").should('exist')
            })

            it('has a section for the checkout information', function () {
                cy.get('[data-testid=sidebar]')
                    .find(`[data-testid='checkout-info-section']`)
                    .should('exist')
            })

            it('will default the sidebar as empty when no products are provided', function () {
                cy.mount(<Checkout/>)
                cy.get(`[data-testid='checkout-info-section']`)
                    .find(`[data-testid='cart-is-empty-message']`)
                    .should('have.text', "Cart is empty!")

                cy.get(`[data-testid='checkout-info-section']`)
                    .find(`[data-testid='total-price']`)
                    .should('not.exist')
            })
        })

        context('State management and hooks', function () {
            it('loads product details in the sidebar', function () {
                //Arrange
                //This test uses a custom intercept to load products from a Cypress fixture
                const fixtureFileName = '/products/checkout_info/custom-plan-products.json'
                cy.intercept('**/products/*', {fixture: fixtureFileName})
                cy.mount(<Checkout/>)

                //Assert: total price is displayed and each product is rendered
                cy.get(`[data-testid='checkout-info-section']`)
                    .find(`[data-testid='total-price']`)
                    .should('exist')
                cy.fixture('/products/checkout_info/custom-plan-products.json').then(fixture => {

                    fixture.map((product: Products.CheckoutInfo) => validateSidebarProduct(product))
                })
            })

            it('shows the total price of the products in the sidebar', function () {
                //This test uses a custom intercept to load products from a Cypress fixture
                cy.intercept('**/products/*', {fixture: 'products/checkout_info/custom-plan-products.json'})
                cy.mount(<Checkout/>)
                cy.get(`[data-testid='total-price']`).should('have.text', '$143.99')
            })
        })

        context('Functionality and events', function () {
            it('adds the shipping cost to the total cost on the last step', function () {
                //Arrange
                cy.intercept('**/products/*', {fixture: 'products/checkout_info/custom-plan-products.json'})
                cy.mount(<Checkout/>)

                //Act
                cy.contains('button', 'Next').click();
                cy.contains('button', 'Next').click();
                cy.contains('button', 'Place order').should('be.visible');

                //Shipping is $9.99
                cy.get(`[data-testid='total-price']`).should('have.text', '$153.98')
            })

            it('removes the shipping cost when navigating back from the last step', function () {
                //Arrange
                cy.intercept('**/products/*', req => {
                    req.reply({
                        body: [{
                            name: "Product 1",
                            desc: 'TEST',
                            price: 10.00,
                            requiresShipping: true
                        }]
                    })
                })
                cy.mount(<Checkout/>)

                //Act
                cy.contains('button', 'Next').click();
                cy.contains('button', 'Next').click();
                cy.contains('button', 'Place order').should('be.visible');
                cy.get(`[data-testid='total-price']`).should('have.text', '$19.99');

                cy.contains('button', 'Previous').click();
                cy.get(`[data-testid='total-price']`).should('have.text', '$10.00');

                cy.contains('button', 'Previous').click();
                cy.get(`[data-testid='total-price']`).should('have.text', '$10.00');
            })
        })

        context('Data validation', function () {
            //Technically, this could be considered an HTML rendering test, but this
            //is to show that a component will not error on rendering
            it('does not require a description for a product', function () {
                //Arrange: use a single product without a description
                cy.intercept('**/products/*', req => {
                    req.reply({
                        body: [{
                            name: "Product 1",
                            price: 10.00,
                            requiresShipping: false
                        }]
                    })
                })

                //Act: mount the component
                cy.mount(<Checkout/>)

                //Assert: check that the description is not needed
                validateSidebarProduct({name: 'Product 1', desc: '', price: 10.00})
            })
        })

        context.only('Styling and theming', function () {
            beforeEach(function () {
                cy.mount(<Checkout/>)
            })

            it('renders with the theme on light mode on load', function () {
                //MuiPaper-root is the actual card
                cy.get(`[data-testid='checkout-info-section']`)
                    .parents('.MuiGrid-root')
                    .find('.MuiPaper-root')
                    .should("have.css", "background-color", 'rgb(251, 252, 254)')
            })

            it('can be toggled between light and dark modes', function () {
                //This test is unreliable -- testing theming like this is unstable
                cy.get('button[aria-label="Theme toggle button"]').filter(':visible').as('themeToggleButton')
                cy.get(`[data-testid='checkout-info-section']`)
                    .parents('.MuiGrid-root')
                    .as('sidebarBackground')

                cy.get('@themeToggleButton').click();

                cy.wait(500)
                cy.get('@sidebarBackground').should("have.css", "background-color", 'rgb(31, 36, 46)')

                cy.get('@themeToggleButton').click();
                cy.wait(1000)
                cy.get('@sidebarBackground').should("have.css", "background-color", 'rgb(234, 238, 245)')
            })
        })
    })
})
