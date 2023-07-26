import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { NextPage } from "next"
import { AppProps } from "next/app"
import { ReactElement, ReactNode } from "react"

export type CollectionData = {
  id: string
  title: string
}

export type FeaturedProduct = {
  id: string
  title: string
  handle: string
  thumbnail?: string
}

export type StoreNavData = {
  collections: CollectionData[]
  hasMoreCollections: boolean
  featuredProducts: PricedProduct[]
}

// page props for store pages (products and collection pages)
export type StoreProps<T extends unknown> = {
  page: {
    data: T
  }
}

// page props for non-store pages (home, about, contact, etc)
export type SiteProps = {
  site: {
    navData: StoreNavData
  }
}

export type PrefetchedPageProps = {
  notFound: boolean
}

// For pages with nested layouts
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout<P = {}, IP = P> = AppProps<P> & {
  Component: NextPageWithLayout<P, IP>
}

export type ProductPreviewType = {
  id: string
  title: string
  handle: string | null
  thumbnail: string | null
  price?: {
    calculated_price: string
    original_price: string
    difference: string
    price_type: "default" | "sale"
  }
}

export type InfiniteProductPage = {
  response: {
    products: PricedProduct[]
    count: number
  }
}

export interface Attachment {
  id: string;
  original: string;
  thumbnail: string;
  __typename?: string;
  slug?: string;
}

export interface Banner {
  id: string;
  title: string;
  description: string;
  image: Attachment;
}


export interface CreateContactUsInput {
  name: string;
  email: string;
  subject: string;
  description: string;
}