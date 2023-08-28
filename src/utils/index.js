export function round(value) {
    return +`${Math.round(`${value}e+2`)}e-2`;
}

export function calculatePrice(pricing, selectedRegion, selectedProduct, nodes) {
    const priceTable = pricing[selectedRegion]
        ? pricing[selectedRegion]
        : pricing.default;

    const productPrice = priceTable[selectedProduct]
        ? priceTable[selectedProduct]
        : pricing.default[selectedProduct];

    const total = productPrice * nodes;
    return round(total);
}
