import React from "react";
import SignUp from "../../../src/components/sign-up/SignUp";

describe('SignUp', function(){
    it('exists', function(){
        cy.mount(<SignUp/>)
    })
})
