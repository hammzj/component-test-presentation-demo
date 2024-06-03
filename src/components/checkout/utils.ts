export const SHIPPING_COST_USD: number = 9.99;

export const calculateProductCost = (products: Products.CheckoutInfo[]) => {
    return products.map((p) => p.price).reduce((acc, cur) => acc + cur, 0);
};

export const doesCartRequireShipping = (products: Products.CheckoutInfo[]) => {
    return products.some((p) => p.requiresShipping);
};

export const calculateTotalCost = (
    products: Products.CheckoutInfo[],
    includeShipping = false,
    shippingCost = SHIPPING_COST_USD
) => {
    const addShipping = (products: Products.CheckoutInfo[]) => {
        return doesCartRequireShipping(products) ? shippingCost : 0;
    };
    return includeShipping
        ? calculateProductCost(products) + addShipping(products)
        : calculateProductCost(products);
};

export const formatAsCurrency = (cost: number, currency = "USD") => {
    return Number(cost).toLocaleString("en-US", { style: "currency", currency });
};
