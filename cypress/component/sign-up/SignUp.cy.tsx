import React from "react";
import SignUp from "../../../src/components/sign-up/SignUp";

describe('SignUp', function () {
    beforeEach(function () {
        cy.mount(<SignUp/>)
    })

    it('exists', function () {
        cy.get('[data-testid="sign-up"]').should('exist')
    })

    context('element existence', function () {
        it('has the correct form elements', function () {
            cy.get('[data-testid="sign-up"]').find('form.MuiBox-root').find('.MuiFormControl-root').find('input#name').should('exist')
            cy.get('[data-testid="sign-up"]').find('form.MuiBox-root').find('.MuiFormControl-root').find('input#email').should('exist')
            cy.get('[data-testid="sign-up"]').find('form.MuiBox-root').find('.MuiFormControl-root').find('input#password').should('exist')
            cy.get('[data-testid="sign-up"]').find('form.MuiBox-root').find('.MuiCheckbox-root').parent().should('have.text', 'I want to receive updates via email.')


            cy.get('[data-testid="sign-up"]').contains('button', 'Sign up').should('exist')
        })

        it('has a link for the sign-in page', function () {
            cy.contains('a', 'Already have an account? Sign in')
                .invoke('attr', 'href')
                .should('include', '/sign-in')
        })

        it('has a sign up button with a Google account', function () {
            cy.get('[data-testid="sign-up"]')
                .find('form.MuiBox-root')
                .next()
                .should('contain.text', 'or')
                .next()
                .contains('button', 'Sign up with Google')
                .should('exist')
        })

        it('has a sign in button with a Facebook account', function () {
            cy.get('[data-testid="sign-up"]')
                .find('form.MuiBox-root')
                .next()
                .should('contain.text', 'or')
                .next()
                .contains('button', 'Sign up with Facebook')
                .should('exist')

        })
    })

    context('state management', function () {

    })

    context('data validation', function () {
        context('Full Name field', function () {
            it('does not allow empty input', function () {
                cy.get('input#name').clear()

                cy.contains('button', 'Sign up').click()

                cy.get('input#name')
                    .parents('.MuiFormControl-root')
                    .find('.MuiFormHelperText-root')
                    .should('have.text', 'Name is required.')
            })
        })

        context('Email field', function () {
            it('does not allow empty input', function () {
                cy.get('input#email').clear()

                cy.contains('button', 'Sign up').click()

                cy.get('input#email')
                    .parents('.MuiFormControl-root')
                    .find('.MuiFormHelperText-root')
                    .should('have.text', 'Please enter a valid email address.')
            })

            it('requires a valid email address', function () {
                const validations: [string, boolean][] = [
                    ['test', true],
                    ['test@', true],
                    ['test@fakemail', true],
                    ['test@fakemail.com', false],
                    ['test+addr@fakemail.com', false],
                ]
                validations.forEach(([chars, hasError]) => {
                    cy.get('input#email').clear()
                    cy.get('input#email').type(chars)

                    cy.contains('button', 'Sign up').click()

                    if (hasError) {
                        cy.get('input#email')
                            .parents('.MuiFormControl-root')
                            .find('.MuiFormHelperText-root')
                            .should('have.text', 'Please enter a valid email address.')
                    } else {
                        cy.get('input#email')
                            .parents('.MuiFormControl-root')
                            .find('.MuiFormHelperText-root')
                            .should('not.exist')
                    }
                })
            })
        })

        context('Password field', function () {
            it('does not allow empty input', function () {
                cy.get('input#password').clear()

                cy.contains('button', 'Sign up').click()

                cy.get('input#password')
                    .parents('.MuiFormControl-root')
                    .find('.MuiFormHelperText-root')
                    .should('have.text', 'Password must be at least 6 characters long.')
            })

            it('requires at least 6 characters', function () {
                const validations: [string, boolean][] = [
                    ['12345', true],
                    ['123456', false],
                    ['testpassword', false],
                ]
                validations.forEach(([chars, hasError]) => {
                    cy.get('input#password').clear()
                    cy.get('input#password').type(chars)

                    cy.contains('button', 'Sign up').click()

                    if (hasError) {
                        cy.get('input#password')
                            .parents('.MuiFormControl-root')
                            .find('.MuiFormHelperText-root')
                            .should('have.text', 'Password must be at least 6 characters long.')
                    } else {
                        cy.get('input#password')
                            .parents('.MuiFormControl-root')
                            .find('.MuiFormHelperText-root')
                            .should('not.exist')
                    }
                })
            })
        })

        it('requires all fields to be filled', function () {
            cy.get('input#name').clear()
            cy.get('input#email').clear()
            cy.get('input#password').clear()

            cy.contains('button', 'Sign up').click()
        })
    })

})
