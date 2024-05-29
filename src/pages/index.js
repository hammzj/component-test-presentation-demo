import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '../components/Link';
import Copyright from '../components/Copyright';
import LandingPage from "../components/landing-page/LandingPage";

export default function Index() {
    return (
        <>
            <LandingPage/>
            <Copyright/>
        </>
    );
}
