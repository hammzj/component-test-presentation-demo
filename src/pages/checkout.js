import * as React from 'react';
import Container from '@mui/material/Container';
import Divider from "@mui/material/Divider";
import Checkout from "../components/checkout/Checkout";

export default function CheckoutPage({location}) {
    return (
        <Container>
            <Checkout location={location}/>
        </Container>
    );
}
