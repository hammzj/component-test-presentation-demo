import * as React from 'react';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import SignUp from "../components/sign-up/SignUp";

export default function About() {
  return (
    <Container>
        <SignUp/>
        <Copyright />
    </Container>
  );
}
