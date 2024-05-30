import React from "react";
import Checkout from "../../../src_backup/components/checkout/Checkout";

describe('Checkout', function(){
    it('exists', function(){
        cy.mount(<Checkout/>)
    })
})
