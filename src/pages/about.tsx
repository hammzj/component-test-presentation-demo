import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Copyright from "../components/Copyright";
import { Link } from "react-router-dom";

export default function AboutPage() {
    return (
        <Container maxWidth='sm'>
            <Box sx={{ my: 4 }}>
                <Typography variant='h4' component='h1' sx={{ mb: 2 }}>
                    Material UI Create React App example
                </Typography>
                <Link to='/'>Go to main page</Link>
                <Copyright />
            </Box>
        </Container>
    );
}
