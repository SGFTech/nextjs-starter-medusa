
export function getPrices(priceInfo) 
{
const basePrice = parseInt(priceInfo.variantPrice?.original_price??"0")
const calculated_price = parseInt(priceInfo.variantPrice?.calculated_price??"0")
let discount =  calculated_price -basePrice 
discount =  discount > 0?discount:0
const minPrice =  parseInt(priceInfo.cheapestPrice?.calculated_price??"0")
let price = basePrice
let maxPrice = parseInt(priceInfo.maxPrice?.calculated_price??""+(minPrice??"0"))

return {
    basePrice,
    calculatePrice:calculated_price,
    minPrice,
    maxPrice,
    price,
    discount
}

}
