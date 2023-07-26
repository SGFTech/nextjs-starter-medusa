
import { siteSettings } from "@lib/site"
import BannerWithSearch from "@modules/home/components/banners/banner-with-search"
import FeaturedProducts from "@modules/home/components/featured-products"

import Hero from "@modules/home/components/hero"


import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home",
  description:
    "Source Good Food . Worldwide Shipping. Secure Payment.",
}



  


const Home = () => {

  return (
    <>
      <BannerWithSearch banners={siteSettings.Banner}/>
      <FeaturedProducts />
    </>
  )
}

export default Home
