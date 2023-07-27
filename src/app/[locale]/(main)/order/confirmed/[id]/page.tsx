"use client"

import medusaRequest from "@lib/medusa-fetch"
import { Cart, Order, StoreCartsRes } from "@medusajs/medusa"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { useEffect } from "react"

type Props = {
  params: { id: string }
}

async function getOrder(id: string) {
  if(id.includes("cart_"))
    {
      const orderRes = await medusaRequest("GET",`/orders`)
      if (!orderRes.ok) {
        throw new Error(`Failed to fetch cart: ${id}`)
      }
      else
      {
        const orders  = orderRes.body as Order[]
        const order = orders.find(order=>order.cart_id == id)
        id = order?.id!;
        if(!id)
        return
      }
    }
  const res = await medusaRequest("GET", `/orders/${id}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch order: ${id}`)
  }

  return res.body
}

/*export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "You purchase was successful",
}*/

export default async function CollectionPage({ params }: Props) {
  const orderRes = await getOrder(params.id)
  useEffect(()=>
  {
    if(!orderRes)
    {
      redirect("/not-found")
    }

  },[orderRes])
  


  return <OrderCompletedTemplate order={orderRes.order} />
}
