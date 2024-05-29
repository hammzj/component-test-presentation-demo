import * as React from 'react';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import SignIn from "../components/sign-in/SignIn";

export default function About() {
  return (
    <Container>
        <SignIn/>
        <Copyright />
    </Container>
  );
}
