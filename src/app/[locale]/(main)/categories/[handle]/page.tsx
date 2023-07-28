import { medusaClient } from "@lib/config"
import { Product, StoreGetProductCategoriesRes } from "@medusajs/medusa"
import CategoryTemplate from "@modules/categories/templates"
import CollectionTemplate from "@modules/collections/templates"
import { Metadata } from "next"

type Props = {
  params: { handle: string }
}

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8000"

async function getCategory(handle: string):Promise<StoreGetProductCategoriesRes> {
  const categoryRes = await medusaClient.productCategories.list({
    handle
  })
  

  if (categoryRes.response.status!=200) {
    throw new Error(`Failed to fetch category: ${handle}`)
  }

  return categoryRes
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {product_categories} = await getCategory(params.handle)

  return {
    title: `${params.handle.replace("-"," ")} | Acme Store`,
    description: `${product_categories?.[0].name} product ${product_categories.length>1?'s'
  :''}`,
  }
}

export default async function CollectionPage({ params }: Props) {
  const { product_categories } = await getCategory(params.handle)

  return <CategoryTemplate category={product_categories[0]} />
}
