import * as React from "react";
import { PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppAppBar from "./components/AppAppBar";
import Hero from "./components/Hero";
import LogoCollection from "./components/LogoCollection";
import Pricing from "./components/Pricing";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "../Footer";
import getTheme from "../getTheme";

export default function LandingPage() {
    const [mode, setMode] = React.useState<PaletteMode>("light");
    const theme = createTheme(getTheme(mode));

    const toggleColorMode = () => {
        setMode((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <Hero />
            <LogoCollection />
            <Box sx={{ bgcolor: "background.default" }}>
                <Features />
                <Divider />
                <Testimonials />
                <Divider />
                <Pricing />
                <Divider />
                <FAQ />
                <Divider />
                <Footer isLandingPage={true} />
            </Box>
        </ThemeProvider>
    );
}
