import * as React from 'react';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import Checkout from "../components/checkout/Checkout";

export default function CheckoutPage() {
  return (
    <Container>
        <Checkout />
        <Copyright />
    </Container>
  );
}
