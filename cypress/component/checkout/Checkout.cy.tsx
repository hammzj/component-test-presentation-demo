import React from "react";
import Checkout from "../../../src/components/checkout/Checkout";

describe('Checkout', function(){
    it('exists', function(){
        cy.mount(<Checkout/>)
    })
})
