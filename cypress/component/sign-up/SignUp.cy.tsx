import React from "react";
import SignUp from "../../../src/components/sign-up/SignUp";

describe("SignUp", function () {
    beforeEach(function () {
        //Mount the component as-is
        cy.mount(<SignUp />);
    });

    context("element existence", function () {
        it("exists", function () {
            cy.get('[data-testid="sign-up"]').should("exist").and("contain.text", "Sign up");
        });

        it("has the company logo", function () {
            cy.get('[data-testid="sign-up"]').find("svg#company-icon").should("exist");
        });

        it("has a back button", function () {
            cy.contains(".MuiButton-root", "Back")
                .should("exist")
                .invoke("attr", "href")
                .should("eq", "/");
        });

        context("sign-up form", function () {
            const validations = [
                { inputSelector: `input#name`, label: "Full name", defaultValue: "Jon Snow" },
                { inputSelector: `input#email`, label: "Email", defaultValue: "your@email.com" },
                { inputSelector: `input#password`, label: "Password", defaultValue: "••••••" },
            ];
            validations.forEach((v) => {
                it(`has a field for "${v.label}"`, function () {
                    cy.get('[data-testid="sign-up"]')
                        .find("form.MuiBox-root")
                        .find(".MuiFormControl-root")
                        .find(v.inputSelector)
                        .should("exist");

                    //Test label
                    cy.get('[data-testid="sign-up"]')
                        .find(v.inputSelector)
                        .parents(".MuiFormControl-root")
                        .find("label")
                        .should("have.text", v.label);
                });

                specify(`the "${v.label}" field has the correct default value`, function () {
                    cy.get('[data-testid="sign-up"]')
                        .find("form.MuiBox-root")
                        .find(".MuiFormControl-root")
                        .find(v.inputSelector)
                        .invoke("attr", "placeholder")
                        .should("eq", v.defaultValue);
                });
            });

            it("has a checkbox for receiving updates by email", function () {
                cy.get('[data-testid="sign-up"]')
                    .find("form.MuiBox-root")
                    .find(".MuiCheckbox-root")
                    .parent()
                    .should("exist")
                    .and("have.text", "I want to receive updates via email.");
            });

            it("has a submit button", function () {
                cy.get('[data-testid="sign-up"]')
                    .contains("button[type=submit]", "Sign up")
                    .should("exist");
            });
        });

        context("additional sign-up options", function () {
            it("has a link for the sign-in page", function () {
                cy.contains("a", "Already have an account? Sign in")
                    .invoke("attr", "href")
                    .should("include", "/sign-in");
            });

            it("has a sign up button with a Google account", function () {
                cy.get('[data-testid="sign-up"]')
                    .find("form.MuiBox-root")
                    .next()
                    .should("contain.text", "or")
                    .next()
                    .contains("button", "Sign up with Google")
                    .should("exist");

                cy.contains("button", "Sign up with Google")
                    .find("svg#google-icon")
                    .should("exist");
            });

            it("has a sign up button with a Facebook account", function () {
                cy.get('[data-testid="sign-up"]')
                    .find("form.MuiBox-root")
                    .next()
                    .should("contain.text", "or")
                    .next()
                    .contains("button", "Sign up with Facebook")
                    .should("exist");

                cy.contains("button", "Sign up with Facebook")
                    .find("svg#facebook-icon")
                    .should("exist");
            });
        });
    });

    context("functionality and events", function () {
        //Everything else is captured in other tests
    });

    context("data validation", function () {
        context("Full Name field", function () {
            it("does not allow empty input", function () {
                cy.get("input#name").clear();

                cy.contains("button", "Sign up").click();

                cy.get("input#name")
                    .parents(".MuiFormControl-root")
                    .find(".MuiFormHelperText-root")
                    .should("have.text", "Name is required.");
            });
        });

        context("Email field", function () {
            it("does not allow empty input", function () {
                cy.get("input#email").clear();

                cy.contains("button", "Sign up").click();

                cy.get("input#email")
                    .parents(".MuiFormControl-root")
                    .find(".MuiFormHelperText-root")
                    .should("have.text", "Please enter a valid email address.");
            });

            it("requires a valid email address", function () {
                const validations: [string, boolean][] = [
                    ["test", true],
                    ["test@", true],
                    ["test@fakemail", true],
                    ["test@fakemail.com", false],
                    ["test+addr@fakemail.com", false],
                ];
                validations.forEach(([chars, hasError]) => {
                    cy.get("input#email").clear();
                    cy.get("input#email").type(chars);

                    cy.contains("button", "Sign up").click();

                    if (hasError) {
                        cy.get("input#email")
                            .parents(".MuiFormControl-root")
                            .find(".MuiFormHelperText-root")
                            .should("have.text", "Please enter a valid email address.");
                    } else {
                        cy.get("input#email")
                            .parents(".MuiFormControl-root")
                            .find(".MuiFormHelperText-root")
                            .should("not.exist");
                    }
                });
            });
        });

        context("Password field", function () {
            it("hides the password content", function () {
                cy.get("input#password").invoke("attr", "type").should("eq", "password");
            });

            it("does not allow empty input", function () {
                cy.get("input#password").clear();

                cy.contains("button", "Sign up").click();

                cy.get("input#password")
                    .parents(".MuiFormControl-root")
                    .find(".MuiFormHelperText-root")
                    .should("have.text", "Password must be at least 6 characters long.");
            });

            it("requires at least 6 characters", function () {
                const validations: [string, boolean][] = [
                    ["12345", true],
                    ["123456", false],
                    ["testpassword", false],
                ];
                validations.forEach(([chars, hasError]) => {
                    cy.get("input#password").clear();
                    cy.get("input#password").type(chars);

                    cy.contains("button", "Sign up").click();

                    if (hasError) {
                        cy.get("input#password")
                            .parents(".MuiFormControl-root")
                            .find(".MuiFormHelperText-root")
                            .should("have.text", "Password must be at least 6 characters long.");
                    } else {
                        cy.get("input#password")
                            .parents(".MuiFormControl-root")
                            .find(".MuiFormHelperText-root")
                            .should("not.exist");
                    }
                });
            });
        });

        it("requires all fields to be filled", function () {
            cy.get("input#name").clear();
            cy.get("input#email").clear();
            cy.get("input#password").clear();

            cy.contains("button", "Sign up").click();
            cy.get(".Mui-error").should("have.length.of", 3);
        });
    });

    context("state management", function () {
        it.only("captures data when submitting the form", function () {
            //Arrange
            /*
            Clicking the button just sends a console.log statement
            so we need to capture that it sends it properly.
            Usually it's not this complex as we can test the form data
             */
            cy.spyConsoleLog();

            const valueSets = [
                {
                    name: "Jaime Lannister",
                    email: "onehandman@lannister.org",
                    password: "2muchG0LD!",
                    allowExtraEmails: "on",
                },
                {
                    name: "Eddard Stark",
                    email: "nedstark@starkhouse.com",
                    password: "th3NorthRemember$",
                    allowExtraEmails: null,
                },
            ];

            valueSets.forEach((values) => {
                //We need to re-render the mount each time
                cy.mount(<SignUp />);

                //Act
                cy.get("input#name").type(values.name);
                cy.get("input#email").type(values.email);
                cy.get("input#password").type(values.password);
                if (values.allowExtraEmails)
                    cy.get("input[name=allowExtraEmails]").parent().click();
                cy.contains("button", "Sign up").click();

                //Assert
                cy.get("@log")
                    .invoke("getCalls")
                    .then((calls) => {
                        //@ts-ignore
                        expect(calls.some((c) => Cypress._.isEqual(c.args[0], values))).to.eq(true);
                    });
            });
        });

        it("navigates to Google when using a Google account", function () {
            //The example app does not navigate, but sends a screen alert.
            //We'll just test that it opens the alert and shows the correct text.
            cy.contains("button", "Sign up with Google").click();

            cy.on("window:alert", (str) => {
                expect(str).to.equal(`Sign up with Google`);
            });
        });

        it("navigates to Facebook when using a Facebook account", function () {
            //The example app does not navigate, but sends a screen alert.
            //We'll just test that it opens the alert and shows the correct text.
            cy.contains("button", "Sign up with Facebook").click();

            cy.on("window:alert", (str) => {
                expect(str).to.equal(`Sign up with Facebook`);
            });
        });
    });

    context("style", function () {
        it("renders with the theme on light mode on load", function () {
            //MuiPaper-root is the actual card
            cy.get('[data-testid="sign-up"]')
                .find(".MuiPaper-root")
                .should("have.css", "background-color")
                .should("be.colored", "#fbfcfe");
            cy.contains("button[type=submit]", "Sign up")
                .should("have.css", "background-color")
                .and("be.colored", "#4da6ff");
        });

        it("can be toggled between light and dark modes", function () {
            cy.get('button[aria-label="Theme toggle button"]').click();
            cy.wait(500);
            cy.get('[data-testid="sign-up"]')
                .find(".MuiPaper-root")
                .invoke("css", "background-color")
                .should("be.oneOf", ["rgba(114, 117, 123, 0.718)", "rgba(19, 23, 32, 0.6)"]); //Odd color does not work as hex

            cy.contains("button[type=submit]", "Sign up")
                .should("have.css", "background-color")
                .and("be.colored", "#4da6ff");

            cy.get('button[aria-label="Theme toggle button"]').click();
            cy.wait(500);
            cy.get('[data-testid="sign-up"]')
                .find(".MuiPaper-root")
                .should("have.css", "background-color")
                .should("be.colored", "#fbfcfe");
            cy.contains("button[type=submit]", "Sign up")
                .should("have.css", "background-color")
                .and("be.colored", "#4da6ff");
        });
    });
});
