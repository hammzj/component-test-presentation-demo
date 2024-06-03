import * as React from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
    formatAsCurrency,
    calculateTotalCost,
    calculateProductCost,
    doesCartRequireShipping,
    SHIPPING_COST_USD
} from "./utils";

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
    {name: 'Card type:', detail: 'Visa'},
    {name: 'Card holder:', detail: 'Mr. John Smith'},
    {name: 'Card number:', detail: 'xxxx-xxxx-xxxx-1234'},
    {name: 'Expiry date:', detail: '04/2024'},
];

export default function Review({products = []}: { products: Products.CheckoutInfo[] }) {
    const requiresShipping = doesCartRequireShipping(products)
    return (
        <Stack spacing={2}>
            <List disablePadding>
                <ListItem sx={{py: 1, px: 0}}>
                    <ListItemText primary="Products" secondary={`${products.length} selected`}/>
                    <Typography variant="body2"
                                data-testid='products-cost'>{formatAsCurrency(calculateProductCost(products))}</Typography>
                </ListItem>
                {requiresShipping && (<ListItem sx={{py: 1, px: 0}}>
                    <ListItemText primary="Shipping" secondary="Plus taxes"/>
                    <Typography variant="body2"
                                data-testid='shipping-cost'>{formatAsCurrency(SHIPPING_COST_USD)}</Typography>
                </ListItem>)
                }
                <ListItem sx={{py: 1, px: 0}}>
                    <ListItemText primary="Total"/>
                    <Typography variant="subtitle1" sx={{fontWeight: 700}} data-testid='total-cost'>
                        {formatAsCurrency(calculateTotalCost(products, requiresShipping))}
                    </Typography>
                </ListItem>
            </List>
            <Divider/>
            <Stack
                direction="column"
                divider={<Divider flexItem/>}
                spacing={2}
                sx={{my: 2}}
            >
                <div>
                    <Typography variant="subtitle2" gutterBottom>
                        Shipment details
                    </Typography>
                    <Typography gutterBottom>John Smith</Typography>
                    <Typography color="text.secondary" gutterBottom>
                        {addresses.join(', ')}
                    </Typography>
                </div>
                <div>
                    <Typography variant="subtitle2" gutterBottom>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    useFlexGap
                                    sx={{width: '100%', mb: 1}}
                                >
                                    <Typography variant="body1" color="text.secondary">
                                        {payment.name}
                                    </Typography>
                                    <Typography variant="body2">{payment.detail}</Typography>
                                </Stack>
                            </React.Fragment>
                        ))}
                    </Grid>
                </div>
            </Stack>
        </Stack>
    );
}
