describe('App', function () {
    context('app navigation bar', function () {
        beforeEach(function () {
            cy.visit('/')
            cy.get('.MuiToolbar-root').as('appNavBar')
        })

        it('can navigate to the Features on the page', function () {
            cy.get('@appNavBar').contains('button', 'Features').click();
            cy.contains(`.MuiTypography-root`, 'Product features').should('be.inViewport')
        })

        it('can navigate to the Testimonials on the page', function () {
            cy.contains(`.MuiTypography-root`, 'Testimonials').should('not.be.inViewport')
            cy.get('@appNavBar').contains('button', 'Testimonials').click();
            cy.contains(`.MuiTypography-root`, 'Testimonials').should('be.inViewport')
        })

        it('can navigate to the Pricing on the page', function () {
            cy.contains(`.MuiTypography-root`, 'Pricing').should('not.be.inViewport')
            cy.get('@appNavBar').contains('button', 'Pricing').click();
            cy.contains(`.MuiTypography-root`, 'Pricing').should('be.inViewport')
        })

        it('can navigate to the Frequently asked questions on the page', function () {
            cy.contains(`.MuiTypography-root`, 'Frequently asked questions').should('not.be.inViewport')
            cy.get('@appNavBar').contains('button', 'FAQ').click();
            cy.contains(`.MuiTypography-root`, 'Frequently asked questions').should('be.inViewport')
        })

        it('can access Sign In', function () {
            cy.get('@appNavBar').contains('.MuiButton-root', 'Sign in').click();
            cy.url().should('include', '/sign-in')
        })

        it('can access Sign Up', function () {
            cy.get('@appNavBar').contains('.MuiButton-root', 'Sign up').click();
            cy.url().should('include', '/sign-up')
        })
        it('can access Sign In', function () {
            cy.get('@appNavBar').contains('.MuiButton-root', 'Sign in').click();
            cy.url().should('include', '/sign-in')
        })
    })

    context('accessing checkout from pricing', function () {
        context("Free plan", function () {
            it('loads the correct products for the plan', function () {
                //Arrange
                const products = [
                    {
                        name: 'Free plan',
                        desc: 'Basic account without a subscription',
                        price: 0
                    },
                    {
                        name: 'Email support',
                        desc: 'Included in the Free plan',
                        price: 0
                    }
                ]

                cy.visit('/')

                //Act
                cy.get(`[data-testid="'pricing-card-free"]`).as('card')
                cy.get('@card').contains(`a`, 'Sign up for free').click();

                //Assert
                cy.assertCountOfCheckoutSidebarProducts(products.length)
                products.map(product => cy.assertCheckoutSidebarProduct(product))

            })

            it('does not require shipping', function () {
                cy.visit('/')
                cy.get(`[data-testid="'pricing-card-free"]`).as('card')
                cy.get('@card').contains(`a`, 'Sign up for free').click();

                //Make sure the price is accurate before the last step
                cy.get(`[data-testid="total-price"]`).invoke('text').as('totalPriceText')

                //There's no actual input validation so no need to fill in data
                cy.contains('button', 'Next').click();
                cy.contains('button', 'Next').click();

                //Assert the price is still the same and that shipping does not exist
                cy.get('@totalPriceText').then(expectedText => {
                    cy.get(`[data-testid="total-price"]`).should('have.text', expectedText)
                })
                cy.contains(`.MuiListItem-root`, 'Shipping').should('not.exist')
            })
        })

        context('Professional plan', function () {
            it('loads the correct products for the plan', function () {
                //Arrange
                const products = [
                    {
                        name: 'Professional plan',
                        desc: 'Monthly subscription',
                        price: 15.00
                    },
                    {
                        name: 'Dedicated support',
                        desc: 'Included in the Professional plan',
                        price: 0
                    },
                    {
                        name: 'Hardware',
                        desc: 'Devices needed for development',
                        price: 69.99
                    }, {
                        name: 'Landing page template',
                        desc: 'License',
                        price: 49.99
                    },
                ]

                cy.visit('/')

                //Act
                cy.get(`[data-testid="'pricing-card-professional"]`).as('card')
                cy.get('@card').contains(`a`, 'Start now').click();

                //Assert
                cy.assertCountOfCheckoutSidebarProducts(products.length)
                products.map(product => cy.assertCheckoutSidebarProduct(product))
            })

            it('requires shipping', function () {
                cy.visit('/')
                cy.get(`[data-testid="'pricing-card-professional"]`).as('card')
                cy.get('@card').find('a').click()


                //There's no actual input validation so no need to fill in data
                cy.contains('button', 'Next').click();
                cy.contains('button', 'Next').click();

                //Assert the shipping cost is displayed
                cy.contains(`.MuiListItem-root`, 'Shipping').should('exist')
                cy.get(`[data-testid="shipping-cost"]`).should('have.text', '$9.99')
            })
        })

        context("Enterprise plan", function () {
            it('loads the correct products for the Free plan', function () {
                //Arrange
                const products = [
                    {
                        "name": "Enterprise plan",
                        "desc": "Annual subscription",
                        "price": 360.00,
                    },
                    {
                        "name": "Specialist support",
                        "desc": "Assigns a team of consultants for personalized issue remediation",
                        "price": 100.00,
                    },
                    {
                        "name": "Landing page template",
                        "desc": "License",
                        "price": 49.99,
                    }
                ]

                cy.visit('/')

                //Act
                cy.get(`[data-testid="'pricing-card-enterprise"]`).as('card')
                cy.get('@card').contains(`a`, 'Inquire now').click();

                //Assert
                cy.assertCountOfCheckoutSidebarProducts(products.length)
                products.map(product => cy.assertCheckoutSidebarProduct(product))

            })

            it('does not require shipping', function () {
                cy.visit('/')
                cy.get(`[data-testid="'pricing-card-enterprise"]`).as('card')
                cy.get('@card').contains(`a`, 'Inquire now').click();

                //Make sure the price is accurate before the last step
                cy.get(`[data-testid="total-price"]`).invoke('text').as('totalPriceText')

                //There's no actual input validation so no need to fill in data
                cy.contains('button', 'Next').click();
                cy.contains('button', 'Next').click();

                //Assert the price is still the same and that shipping does not exist
                cy.get('@totalPriceText').then(expectedText => {
                    cy.get(`[data-testid="total-price"]`).should('have.text', expectedText)
                })
                cy.contains(`.MuiListItem-root`, 'Shipping').should('not.exist')
            })
        })
    })

})
