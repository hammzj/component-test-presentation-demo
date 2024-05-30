export const SHIPPING_COST_USD: number = 9.99

export const getProducts = (location: any): Products.CheckoutInfo[] => {
    if (location?.state?.products) {
        return location.state.products || []
    } else {
        return []
    }
}

export const calculateProductCost = (products: ReturnType<typeof getProducts>) => {
    return products.map(p => p.price).reduce((acc, cur) => acc + cur, 0)
}

export const doesCartRequireShipping = (products: ReturnType<typeof getProducts>) => {
    return products.some(p => p.requiresShipping)
}

export const calculateTotalCost = (products: ReturnType<typeof getProducts>, includeShipping = false, shippingCost = SHIPPING_COST_USD) => {
    const addShipping = (products: ReturnType<typeof getProducts>) => {
        return doesCartRequireShipping(products) ? SHIPPING_COST_USD : 0
    }
    return includeShipping ?
        calculateProductCost(products) + addShipping(products) :
        calculateProductCost(products)
}

export const formatAsCurrency = (cost: number) => {
    return cost > 0 ?
        Number(cost).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) :
        'Free'
}

