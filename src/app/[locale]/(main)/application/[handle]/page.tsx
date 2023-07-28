import { medusaClient } from "@lib/config"
import ApplicationTemplate from "@modules/applications/templates"
import { Metadata } from "next"

type Props = {
  params: { handle: string,
  application:string }
}

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8000"

async function getApplication(handle: string) {

  let tags = await medusaClient.productTags.list({
    value:handle
  })
  if(tags.count == 0) {
  tags = await medusaClient.productTags.list({
    value:`application-${handle.toLowerCase().trim()}`
  })
}

  

  
  if (tags.response.status!=200) {
    throw new Error(`Failed to fetch Application: ${handle}`)
  }

  return tags
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product_tags } = await getApplication(params.handle)

  return {
    title: `${product_tags?.[0].value.replace("-",(" "))} | Acme Store`,
    description: `${product_tags?.[0].value} Application`,
  }
}

export default async function ApplicationPage({ params }: Props) {
  const { product_tags } = await getApplication(params.handle)

  return <ApplicationTemplate product_tags={product_tags} />
}
