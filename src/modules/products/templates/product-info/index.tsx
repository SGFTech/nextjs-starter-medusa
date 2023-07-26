import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import ProductActions from "@modules/products/components/product-actions"
import { useParams } from "next/navigation"
import React from "react"
import { Product } from "types/medusa"

type ProductInfoProps = {
  product: PricedProduct
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const params = useParams()
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-12 lg:max-w-[500px] mx-auto">
        <div>
          <ProductActions product={product} locale={params.locale}/>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
