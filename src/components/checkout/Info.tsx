import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import {calculateTotalCost, formatAsCurrency} from "./utils";

interface InfoProps {
    products: Products.CheckoutInfo[];
    displayShppingCost: boolean
}

export default function Info({products, displayShppingCost}: InfoProps) {
    const totalPrice = formatAsCurrency(calculateTotalCost(products, displayShppingCost))
    return (
        <React.Fragment>
            <Typography variant="subtitle2" color="text.secondary">
                Total
            </Typography>
            <Typography variant="h4" gutterBottom>
                {totalPrice}
            </Typography>
            <List disablePadding>
                {products.map((product) => (
                    <ListItem key={product.name} sx={{py: 1, px: 0}}>
                        <ListItemText
                            sx={{mr: 2}}
                            primary={product.name}
                            secondary={product.desc}
                        />
                        <Typography variant="body1" fontWeight="medium">
                            {formatAsCurrency(product.price)}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );
}
