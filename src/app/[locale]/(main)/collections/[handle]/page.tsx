import CollectionTemplate from "@modules/collections/templates"
import { Metadata } from "next"

type Props = {
  params: { handle: string;locale:string }
}

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8000"

async function getCollection(handle: string,locale:String) {
  
  const res = await fetch(`${BASEURL}/${locale}/collections?handle=${handle}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch collection: ${handle}`)
  }

  return res.json()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection } = await getCollection(params.handle,params.locale)

  return {
    title: `${collection.title} | Acme Store`,
    description: `${collection.title} collection`,
  }
}

export default async function CollectionPage({ params }: Props) {
  const { collection } = await getCollection(params.handle,params.locale)

  return <CollectionTemplate collection={collection} />
}
