import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import {Link} from 'react-router-dom'
import {brand} from "../../../theme";

const tiers = [
    {
        title: 'Free',
        price: '0',
        description: [
            '10 users included',
            '2 GB of storage',
            'Help center access',
            'Email support',
        ],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
        productsType: 'free-plan',
        products: [
            {
                name: 'Free plan',
                desc: 'Basic account without a subscription',
                price: 0,
                requiresShipping: false
            },
            {
                name: 'Email support',
                desc: 'Included in the Free plan',
                price: 0,
                requiresShipping: false
            },
        ]
    },
    {
        title: 'Professional',
        subheader: 'Recommended',
        price: '15',
        description: [
            '20 users included',
            '10 GB of storage',
            'Help center access',
            'Priority email support',
            'Dedicated team',
            'Best deals',
        ],
        buttonText: 'Start now',
        buttonVariant: 'contained',
        productsType: 'professional-plan',
        products: [
            {
                name: 'Professional plan',
                desc: 'Monthly subscription',
                price: 15.00,
                requiresShipping: false
            },
            {
                name: 'Dedicated support',
                desc: 'Included in the Professional plan',
                price: 0,
                requiresShipping: false
            },
            {
                name: 'Hardware',
                desc: 'Devices needed for development',
                price: 69.99,
                requiresShipping: true
            },
            {
                name: 'Landing page template',
                desc: 'License',
                price: 49.99,
                requiresShipping: false
            },
        ]
    },
    {
        title: 'Enterprise',
        price: '30',
        description: [
            '50 users included',
            '30 GB of storage',
            'Help center access',
            'Phone & email support',
        ],
        buttonText: 'Inquire now',
        buttonVariant: 'outlined',
        productsType: 'enterprise-plan',
        products: [
            {
                name: 'Professional plan',
                desc: 'Annual subscription',
                price: 360.00,
                requiresShipping: false
            },
            {
                name: 'Specialist support',
                desc: 'Assigns a team of consultants for personalized issue remediation',
                price: 100.00,
                requiresShipping: false
            },
            {
                name: 'Landing page template',
                desc: 'License',
                price: 49.99,
                requiresShipping: false
            },
        ]
    },
];

export default function Pricing() {
    return (
        <Container
            id="pricing"
            sx={{
                pt: {xs: 4, sm: 12},
                pb: {xs: 8, sm: 16},
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: {xs: 3, sm: 6},
            }}
        >
            <Box
                sx={{
                    width: {sm: '100%', md: '60%'},
                    textAlign: {sm: 'left', md: 'center'},
                }}
            >
                <Typography component="h2" variant="h4" color="text.primary">
                    Pricing
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Quickly build an effective pricing table for your potential customers with
                    this layout. <br/>
                    It&apos;s built with default Material UI components with little
                    customization.
                </Typography>
            </Box>
            <Grid container spacing={3} alignItems="center" justifyContent="center">
                {tiers.map((tier) => (
                    <Grid
                        data-testid={`'pricing-card-${tier.title.toLowerCase().replace(/\s+/g, '-')}`}
                        item
                        key={tier.title}
                        xs={12}
                        sm={tier.title === 'Enterprise' ? 12 : 6}
                        md={4}
                    >
                        <Card
                            sx={(theme) => ({
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 4,
                                ...(tier.title === 'Professional' && {
                                    border: 'none',
                                    boxShadow:
                                        theme.palette.mode === 'light'
                                            ? `0 8px 12px ${brand[500]}`
                                            : `0 8px 12px ${brand[700]}`,
                                    background:
                                        `radial-gradient(circle at 50% 0%, ${brand[500]}, ${brand[700]})`,
                                }),
                            })}
                        >
                            <CardContent>
                                <Box
                                    sx={{
                                        mb: 1,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: 2,
                                        color: tier.title === 'Professional' ? 'grey.100' : '',
                                    }}
                                >
                                    <Typography component="h3" variant="h6">
                                        {tier.title}
                                    </Typography>
                                    {tier.title === 'Professional' && (
                                        <Chip
                                            icon={<AutoAwesomeIcon/>}
                                            label={tier.subheader}
                                            size="small"
                                            sx={{
                                                borderColor: 'hsla(220, 60%, 99%, 0.3)',
                                                backgroundColor: 'hsla(220, 60%, 99%, 0.1)',
                                                '& .MuiChip-label': {
                                                    color: 'hsl(0, 0%, 100%)',
                                                },
                                                '& .MuiChip-icon': {
                                                    color: 'primary.light',
                                                },
                                            }}
                                        />
                                    )}
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        color: tier.title === 'Professional' ? 'grey.50' : undefined,
                                    }}
                                >
                                    <Typography component="h3" variant="h2">
                                        ${tier.price}
                                    </Typography>
                                    <Typography component="h3" variant="h6">
                                        &nbsp; per month
                                    </Typography>
                                </Box>
                                <Divider
                                    sx={{
                                        my: 2,
                                        opacity: 0.8,
                                        borderColor: 'divider',
                                    }}
                                />
                                {tier.description.map((line) => (
                                    <Box
                                        key={line}
                                        sx={{
                                            py: 1,
                                            display: 'flex',
                                            gap: 1.5,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <CheckCircleRoundedIcon
                                            sx={{
                                                width: 20,
                                                color:
                                                    tier.title === 'Professional'
                                                        ? 'primary.light'
                                                        : 'primary.main',
                                            }}
                                        />
                                        <Typography
                                            variant="subtitle2"
                                            component={'span'}
                                            sx={{
                                                color: tier.title === 'Professional' ? 'grey.50' : undefined,
                                            }}
                                        >
                                            {line}
                                        </Typography>
                                    </Box>
                                ))}
                            </CardContent>
                            <CardActions>
                                <Link
                                    to={"checkout"}
                                    state={{type: tier.productsType}}
                                >
                                    <Button

                                        fullWidth
                                        variant={tier.buttonVariant as 'outlined' | 'contained'}
                                    >
                                        {tier.buttonText}
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
