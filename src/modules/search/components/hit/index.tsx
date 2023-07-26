import useProductPrice from "@lib/hooks/use-product-price"
import { ProductVariant,Image } from "@medusajs/medusa"
import Thumbnail from "@modules/products/components/thumbnail"
import { useProduct, useProducts } from "medusa-react"
import Link from "next/link"

export type ProductHit = {
  id: string
  title: string
  handle: string
  description: string | null
  thumbnail: string | null
  variants: ProductVariant[]
  images: Image[]
  collection_handle: string | null
  collection_id: string | null
}

export type HitProps = {
  hit: ProductHit
}

const Hit = ({ hit }: HitProps) => {

  const {products} =  useProducts({
    handle:hit.handle,
  expand:"images"}
    )
    

  const product = products?.[0]??hit
  const {
    maxPrice,
    cheapestPrice,
    variantPrice,
    isLoading,
    isError,} = useProductPrice({id:product.id!})
  return (
    <div key={hit.id} className="grid grid-cols-[86px_1fr] gap-4 w-full">
      <Thumbnail thumbnail={product.thumbnail} images={product.images} size="full" />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          {hit.collection_id && (
            <Link
              href={`/collections/${hit.collection_handle}`}
              className="text-small-regular text-gray-500"
            >
              {hit.collection_handle}
            </Link>
          )}
          <span className="text-base-regular">{hit.title}</span>
          <span className="text-small-regular text-gray-700">
            {cheapestPrice?.original_price} {maxPrice && cheapestPrice &&`-${
              maxPrice?.original_price
                >
                cheapestPrice?.original_price?maxPrice?.original_price:cheapestPrice?.original_price}`} 
          </span>
        </div>
      </div>
    </div>
  )
}

export default Hit
