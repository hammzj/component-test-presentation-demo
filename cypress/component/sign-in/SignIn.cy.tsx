import React from "react";
import SignIn from "../../../src/components/sign-in/SignIn";

describe("SignIn", function () {
    beforeEach(function () {
        //Mount the component as-is
        cy.mount(<SignIn />);
    });

    context("element existence", function () {
        it("exists", function () {
            cy.get('[data-testid="sign-in"]').should("exist").and("contain.text", "Sign in");
        });

        it("has the company logo", function () {
            cy.get('[data-testid="sign-in"]').find("svg#company-icon").should("exist");
        });

        it("has a back button", function () {
            cy.contains(".MuiButton-root", "Back")
                .should("exist")
                .invoke("attr", "href")
                .should("eq", "/");
        });

        context("sign-in form", function () {
            const validations = [
                { inputSelector: `input#email`, label: "Email", defaultValue: "your@email.com" },
                { inputSelector: `input#password`, label: "Password", defaultValue: "••••••" },
            ];
            validations.forEach((v) => {
                it(`has a field for "${v.label}"`, function () {
                    cy.get('[data-testid="sign-in"]')
                        .find("form.MuiBox-root")
                        .find(".MuiFormControl-root")
                        .find(v.inputSelector)
                        .should("exist");

                    //Test label
                    cy.get('[data-testid="sign-in"]')
                        .find(v.inputSelector)
                        .parents(".MuiFormControl-root")
                        .find("label")
                        .should("have.text", v.label);
                });

                specify(`the "${v.label}" field has the correct default value`, function () {
                    cy.get('[data-testid="sign-in"]')
                        .find("form.MuiBox-root")
                        .find(".MuiFormControl-root")
                        .find(v.inputSelector)
                        .invoke("attr", "placeholder")
                        .should("eq", v.defaultValue);
                });
            });

            it(`has a Remember Me checkbox`, function () {
                cy.get('[data-testid="sign-in"]')
                    .find("form.MuiBox-root")
                    .find(".MuiCheckbox-root")
                    .parent()
                    .should("exist")
                    .and("have.text", "Remember me");
            });

            it("has a Forgot password link", function () {
                cy.get('[data-testid="sign-in"]')
                    .find("form.MuiBox-root")
                    .contains("button", "Forgot your password?");
            });

            it("has a submit button", function () {
                cy.get('[data-testid="sign-in"]')
                    .contains("button[type=submit]", "Sign in")
                    .should("exist");
            });
        });

        context("additional sign-in options", function () {
            it("has a link for the sign-up page", function () {
                cy.contains("a", `Don't have an account? Sign up`)
                    .invoke("attr", "href")
                    .should("include", "/sign-up");
            });

            it("has a sign in button with a Google account", function () {
                cy.get('[data-testid="sign-in"]')
                    .find("form.MuiBox-root")
                    .next()
                    .should("contain.text", "or")
                    .next()
                    .contains("button", "Sign in with Google")
                    .should("exist");

                cy.contains("button", "Sign in with Google")
                    .find("svg#google-icon")
                    .should("exist");
            });

            it("has a sign in button with a Facebook account", function () {
                cy.get('[data-testid="sign-in"]')
                    .find("form.MuiBox-root")
                    .next()
                    .should("contain.text", "or")
                    .next()
                    .contains("button", "Sign in with Facebook")
                    .should("exist");

                cy.contains("button", "Sign in with Facebook")
                    .find("svg#facebook-icon")
                    .should("exist");
            });
        });
    });

    context("functionality and events", function () {
        context("Forgot your password interactions", function () {
            it("launches a modal when clicked", function () {
                cy.contains("button", "Forgot your password").click();

                //Element existence testing because of an interaction
                cy.get(`[id="forgot-password-dialog"]`)
                    .find(".MuiDialogTitle-root")
                    .should("have.text", "Reset password");

                cy.get(`[id="forgot-password-dialog"]`).should(
                    "contain.text",
                    `Enter your account's email address, and we'll send you a link to reset your password.`
                );

                cy.get(`[id="forgot-password-dialog"]`)
                    .find('input[name="email"]')
                    .should("exist")
                    .invoke("attr", "placeholder", "Email address");

                cy.get(`[id="forgot-password-dialog"]`)
                    .contains("button[type=submit]", "Continue")
                    .should("exist");
                cy.get(`[id="forgot-password-dialog"]`)
                    .contains("button", "Cancel")
                    .should("exist");
            });

            it("closes the modal on submission", function () {
                cy.contains("button", "Forgot your password").click();
                cy.get(`[id="forgot-password-dialog"]`)
                    .find("input#email")
                    .type("onehandman@lannister.org");

                cy.get(`[id="forgot-password-dialog"]`)
                    .contains("button[type=submit]", "Continue")
                    .click();

                cy.get(`[id="forgot-password-dialog"]`).should("not.exist");
            });

            it("cancelling closes the modal", function () {
                cy.contains("button", "Forgot your password").click();
                cy.get(`[id="forgot-password-dialog"]`).contains("button", "Cancel").click();
                cy.get(`[id="forgot-password-dialog"]`).should("not.exist");
            });
        });
    });

    context("data validation", function () {
        context("submission form", function () {
            context("Email field", function () {
                it("does not allow empty input", function () {
                    cy.get("input#email").clear();

                    cy.contains("button", "Sign in").click();

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

                        cy.contains("button", "Sign in").click();

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

                    cy.contains("button", "Sign in").click();

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

                        cy.contains("button", "Sign in").click();

                        if (hasError) {
                            cy.get("input#password")
                                .parents(".MuiFormControl-root")
                                .find(".MuiFormHelperText-root")
                                .should(
                                    "have.text",
                                    "Password must be at least 6 characters long."
                                );
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
                cy.get("input#email").clear();
                cy.get("input#password").clear();

                cy.contains("button", "Sign in").click();
                cy.get(".Mui-error").should("have.length.of", 2);
            });
        });

        context("Reset password form", function () {
            beforeEach(function () {
                cy.contains("button", "Forgot your password").click();
                cy.get(`[id="forgot-password-dialog"]`).should("be.visible");
            });

            context("Email field", function () {
                it("does not allow empty input", function () {
                    cy.get(`[id="forgot-password-dialog"]`).find("input#email").clear();

                    cy.contains("button", "Continue").click();

                    cy.get(`[id="forgot-password-dialog"]`)
                        .find("input#email")
                        .invoke("prop", "validationMessage")
                        .should("eq", "Please fill out this field.");
                });

                it("requires a valid email address", function () {
                    const validations: [string, boolean][] = [
                        ["test", true],
                        ["test@", true],
                        ["test@fakemail.com", false],
                        ["test+addr@fakemail.com", false],
                    ];
                    validations.forEach(([chars, hasError]) => {
                        //Arrange
                        //Re-mount to make it easier to test
                        cy.mount(<SignIn />);
                        cy.contains("button", "Forgot your password").click();
                        cy.get(`[id="forgot-password-dialog"]`).should("be.visible");

                        //Act
                        cy.get(`[id="forgot-password-dialog"]`).find("input#email").clear();
                        cy.get(`[id="forgot-password-dialog"]`).find("input#email").type(chars);
                        cy.contains("button", "Continue").click();

                        //Assert
                        if (hasError) {
                            cy.get(`[id="forgot-password-dialog"]`)
                                .find("input#email")
                                .invoke("prop", "validationMessage")
                                .should("not.be.empty");
                        } else {
                            cy.get(`[id="forgot-password-dialog"]`).should("not.exist");
                        }
                    });
                });
            });
        });
    });

    context("state management", function () {
        context("submission form", function () {
            it("captures data when submitting the form", function () {
                //Arrange
                /*
                Clicking the button just sends a console.log statement
                so we need to capture that it sends it properly.
                Usually it's not this complex as we can test the form data
                */
                cy.spyConsoleLog();

                const valueSets = [
                    {
                        email: "onehandman@lannister.org",
                        password: "2muchG0LD!",
                        remember: "on",
                    },
                    {
                        email: "nedstark@starkhouse.com",
                        password: "th3NorthRemember$",
                        remember: null,
                    },
                ];
                valueSets.forEach((values) => {
                    //We need to re-render the mount now
                    cy.mount(<SignIn />);

                    //Act
                    cy.get("input#email").type(values.email);
                    cy.get("input#password").type(values.password);
                    if (values.remember === "on") cy.get("input[name=remember]").parent().click();
                    cy.contains("button", "Sign in").click();

                    //Assert
                    cy.get("@log")
                        .invoke("getCalls")
                        .then((calls) => {
                            //@ts-ignore
                            expect(calls.some((c) => Cypress._.isEqual(c.args[0], values))).to.eq(
                                true
                            );
                        });
                });
            });

            it("navigates to Google when using a Google account", function () {
                //The example app does not navigate, but sends a screen alert.
                //We'll just test that it opens the alert and shows the correct text.
                cy.contains("button", "Sign in with Google").click();

                cy.on("window:alert", (str) => {
                    expect(str).to.equal(`Sign in with Google`);
                });
            });

            it("navigates to Facebook when using a Facebook account", function () {
                //The example app does not navigate, but sends a screen alert.
                //We'll just test that it opens the alert and shows the correct text.
                cy.contains("button", "Sign in with Facebook").click();

                cy.on("window:alert", (str) => {
                    expect(str).to.equal(`Sign in with Facebook`);
                });
            });

            context("Reset password form", function () {
                beforeEach(function () {
                    cy.contains("button", "Forgot your password").click();
                    cy.get(`[id="forgot-password-dialog"]`).should("be.visible");
                });

                it("submits the email address on continuing", function () {
                    /*
                   Clicking the button just sends a console.log statement
                   so we need to capture that it sends it properly.
                   Usually it's not this complex as we can test the form data
                    */
                    cy.spyConsoleLog();
                    const resetPasswordEmail = "onehandman@lannister.org";

                    //Act
                    cy.get(`[id="forgot-password-dialog"]`)
                        .find("input#email")
                        .type(resetPasswordEmail);
                    cy.get(`[id="forgot-password-dialog"]`).contains("button", "Continue").click();

                    //Assert
                    cy.get("@log")
                        .invoke("getCalls")
                        .then((calls) => {
                            //@ts-ignore
                            expect(
                                calls.some((c) =>
                                    Cypress._.isEqual(c.args[0], { resetPasswordEmail })
                                )
                            ).to.eq(true);
                        });
                });

                it("does not submit on cancelling", function () {
                    /*
                    Clicking the button just sends a console.log statement
                    so we need to capture that it sends it properly.
                    Usually it's not this complex as we can test the form data
                     */
                    cy.spyConsoleLog();
                    const resetPasswordEmail = "onehandman@lannister.org";

                    //Act
                    cy.get(`[id="forgot-password-dialog"]`)
                        .find("input#email")
                        .type(resetPasswordEmail);
                    cy.get(`[id="forgot-password-dialog"]`).contains("button", "Cancel").click();

                    //Assert
                    cy.get("@log")
                        .invoke("getCalls")
                        .then((calls) => {
                            //@ts-ignore
                            expect(
                                calls.some((c) =>
                                    Cypress._.isEqual(c.args[0], { resetPasswordEmail })
                                )
                            ).to.eq(false);
                        });
                });
            });
        });
    });

    context("style", function () {
        it("renders with the theme on light mode on load", function () {
            //MuiPaper-root is the actual card
            cy.get('[data-testid="sign-in"]')
                .find(".MuiPaper-root")
                .should("have.css", "background-color")
                .should("be.colored", "#fbfcfe");
            cy.contains("button[type=submit]", "Sign in")
                .should("have.css", "background-color")
                .and("be.colored", "#4da6ff");
        });

        it("can be toggled between light and dark modes", function () {
            cy.get('button[aria-label="Theme toggle button"]').click();
            cy.wait(500);
            cy.get('[data-testid="sign-in"]')
                .find(".MuiPaper-root")
                .invoke("css", "background-color")
                .should("be.oneOf", ["rgba(114, 117, 123, 0.718)", "rgba(19, 23, 32, 0.6)"]); //Odd color does not work as hex

            cy.contains("button[type=submit]", "Sign in")
                .should("have.css", "background-color")
                .and("be.colored", "#4da6ff");

            cy.get('button[aria-label="Theme toggle button"]').click();
            cy.wait(500);
            cy.get('[data-testid="sign-in"]')
                .find(".MuiPaper-root")
                .should("have.css", "background-color")
                .should("be.colored", "#fbfcfe");
            cy.contains("button[type=submit]", "Sign in")
                .should("have.css", "background-color")
                .and("be.colored", "#4da6ff");
        });
    });
});
