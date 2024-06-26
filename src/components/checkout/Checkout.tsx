import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useLocation } from "react-router-dom";

import AddressForm from "./AddressForm";
import Info from "./Info";
import InfoMobile from "./InfoMobile";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import ToggleColorMode from "../ToggleColorMode";
import SitemarkIcon from "../SitemarkIcon";
import { calculateTotalCost, formatAsCurrency } from "./utils";
import { getProducts } from "../../services/products";
import Footer from "../Footer";
import getTheme from "../getTheme";
import { useEffect } from "react";

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step: number, products: Products.CheckoutInfo[]) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review products={products} />;
        default:
            throw new Error("Unknown step");
    }
}

export default function Checkout() {
    const [mode, setMode] = React.useState<PaletteMode>("light");
    const [activeStep, setActiveStep] = React.useState(0);
    const [products, setProducts] = React.useState([]);
    const location = useLocation();
    const theme = createTheme(getTheme(mode));

    const toggleColorMode = () => {
        setMode((prev) => (prev === "dark" ? "light" : "dark"));
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    useEffect(() => {
        const retrieveProducts = async () => {
            const p = await getProducts(location?.state?.type);
            setProducts(p);
        };
        retrieveProducts();
    }, []);

    //const products = getProducts(location?.state)

    const displayShippingCost = activeStep >= 2;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid container sx={{ height: { xs: "100%", sm: "100dvh" } }} data-testid='checkout'>
                <Grid
                    item
                    data-testid='sidebar'
                    xs={12}
                    sm={5}
                    lg={4}
                    sx={{
                        display: { xs: "none", md: "flex" },
                        flexDirection: "column",
                        backgroundColor: "background.paper",
                        borderRight: { sm: "none", md: "1px solid" },
                        borderColor: { sm: "none", md: "divider" },
                        alignItems: "start",
                        pt: 4,
                        px: 10,
                        gap: 4,
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "end",
                            height: 150,
                        }}>
                        <Button
                            startIcon={<ArrowBackRoundedIcon />}
                            component='a'
                            href='/'
                            sx={{ ml: "-8px" }}>
                            Back to
                            <SitemarkIcon />
                        </Button>
                    </Box>
                    <Box
                        data-testid='checkout-info-section'
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            flexGrow: 1,
                            width: "100%",
                            maxWidth: 500,
                        }}>
                        <Info products={products} displayShippingCost={displayShippingCost} />
                    </Box>
                </Grid>
                <Grid
                    item
                    sm={12}
                    md={7}
                    lg={8}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: "100%",
                        width: "100%",
                        backgroundColor: { xs: "transparent", sm: "background.default" },
                        alignItems: "start",
                        pt: { xs: 2, sm: 4 },
                        px: { xs: 2, sm: 10 },
                        gap: { xs: 4, md: 8 },
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: { sm: "space-between", md: "flex-end" },
                            alignItems: "center",
                            width: "100%",
                            maxWidth: { sm: "100%", md: 600 },
                        }}>
                        <Box
                            sx={{
                                display: { xs: "flex", md: "none" },
                                flexDirection: "row",
                                width: "100%",
                                justifyContent: "space-between",
                            }}>
                            <Button
                                startIcon={<ArrowBackRoundedIcon />}
                                component='a'
                                href='/'
                                sx={{ alignSelf: "start" }}>
                                Back to
                                <SitemarkIcon />
                            </Button>
                            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                        </Box>
                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "flex-end",
                                flexGrow: 1,
                                height: 150,
                            }}>
                            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                            <Stepper
                                id='desktop-stepper'
                                activeStep={activeStep}
                                sx={{
                                    width: "100%",
                                    height: 40,
                                }}>
                                {steps.map((label) => (
                                    <Step
                                        sx={{
                                            ":first-child": { pl: 0 },
                                            ":last-child": { pr: 0 },
                                        }}
                                        key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                    </Box>
                    <Card
                        sx={{
                            display: { xs: "flex", md: "none" },
                            width: "100%",
                        }}>
                        <CardContent
                            sx={{
                                display: "flex",
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "space-between",
                                ":last-child": { pb: 2 },
                            }}>
                            <div>
                                <Typography variant='subtitle2' gutterBottom>
                                    Selected products
                                </Typography>
                                <Typography variant='body1'>
                                    {formatAsCurrency(
                                        calculateTotalCost(products, displayShippingCost)
                                    )}
                                </Typography>
                            </div>
                            <InfoMobile products={products} />
                        </CardContent>
                    </Card>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            flexGrow: 1,
                            width: "100%",
                            maxWidth: { sm: "100%", md: 600 },
                            maxHeight: "720px",
                            gap: { xs: 5, md: "none" },
                        }}>
                        <Stepper
                            id='mobile-stepper'
                            activeStep={activeStep}
                            alternativeLabel
                            sx={{ display: { sm: "flex", md: "none" } }}>
                            {steps.map((label) => (
                                <Step
                                    sx={{
                                        ":first-child": { pl: 0 },
                                        ":last-child": { pr: 0 },
                                        "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
                                    }}
                                    key={label}>
                                    <StepLabel
                                        sx={{
                                            ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
                                        }}>
                                        {label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <Stack spacing={2} useFlexGap>
                                <Typography variant='h1'>📦</Typography>
                                <Typography variant='h5'>Thank you for your order!</Typography>
                                <Typography variant='body1' color='text.secondary'>
                                    Your order number is
                                    <strong>&nbsp;#140396</strong>. We have emailed your order
                                    confirmation and will update you once its shipped.
                                </Typography>
                                <Button
                                    variant='contained'
                                    sx={{
                                        alignSelf: "start",
                                        width: { xs: "100%", sm: "auto" },
                                    }}>
                                    Go to my orders
                                </Button>
                            </Stack>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep, products)}
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: { xs: "column-reverse", sm: "row" },
                                        justifyContent:
                                            activeStep !== 0 ? "space-between" : "flex-end",
                                        alignItems: "end",
                                        flexGrow: 1,
                                        gap: 1,
                                        pb: { xs: 12, sm: 0 },
                                        mt: { xs: 2, sm: 0 },
                                        mb: "60px",
                                    }}>
                                    {activeStep !== 0 && (
                                        <Button
                                            startIcon={<ChevronLeftRoundedIcon />}
                                            onClick={handleBack}
                                            variant='text'
                                            sx={{
                                                display: { xs: "none", sm: "flex" },
                                            }}>
                                            Previous
                                        </Button>
                                    )}
                                    {activeStep !== 0 && (
                                        <Button
                                            startIcon={<ChevronLeftRoundedIcon />}
                                            onClick={handleBack}
                                            variant='outlined'
                                            fullWidth
                                            sx={{
                                                display: { xs: "flex", sm: "none" },
                                            }}>
                                            Previous
                                        </Button>
                                    )}
                                    <Button
                                        variant='contained'
                                        endIcon={<ChevronRightRoundedIcon />}
                                        onClick={handleNext}
                                        sx={{
                                            width: { xs: "100%", sm: "fit-content" },
                                        }}>
                                        {activeStep === steps.length - 1 ? "Place order" : "Next"}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </Box>
                </Grid>
                <Footer />
            </Grid>
        </ThemeProvider>
    );
}
