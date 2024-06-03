import * as React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { calculateTotalCost, formatAsCurrency } from "./utils";

interface InfoProps {
    products: Products.CheckoutInfo[];
    displayShippingCost: boolean;
}

const TotalPrice = ({ products, displayShippingCost }: InfoProps) => {
    const totalPrice = formatAsCurrency(calculateTotalCost(products, displayShippingCost));
    if (products.length > 0) {
        return (
            <>
                <Typography variant='subtitle2' color='text.secondary'>
                    Total
                </Typography>
                <Typography variant='h4' gutterBottom data-testid='total-price'>
                    {totalPrice}
                </Typography>
            </>
        );
    } else {
        return (
            <Typography variant='h4' gutterBottom data-testid='cart-is-empty-message'>
                Cart is empty!
            </Typography>
        );
    }
};

export default function Info({ products, displayShippingCost }: InfoProps) {
    return (
        <React.Fragment>
            <TotalPrice products={products} displayShippingCost={displayShippingCost} />
            <List disablePadding>
                {products.map((product) => (
                    <ListItem key={product.name} sx={{ py: 1, px: 0 }} data-testid='product-info'>
                        <ListItemText
                            sx={{ mr: 2 }}
                            primary={product.name}
                            secondary={product.desc}
                        />
                        <Typography variant='body1' fontWeight='medium' data-testid='price'>
                            {formatAsCurrency(product.price)}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );
}
