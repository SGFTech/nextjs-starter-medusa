"use client"

import { medusaClient } from "@lib/config"
import { useCheckout } from "@lib/context/checkout-context"
import medusaRequest from "@lib/medusa-fetch"
import { Cart, Order, StoreCartsRes } from "@medusajs/medusa"
import CheckoutTemplate from "@modules/checkout/templates"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import { useAuthorizePaymentSession, useCart } from "medusa-react"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { useEffect } from "react"

type Props = {
  params: { merchantTransactionId: string }
}

async function getOrderFromCartId(id: string) {
  if(id.includes("cart_"))
    {
      try {
      const orderRes = await medusaClient.orders.retrieveByCartId(id)
      if (orderRes.response.status >=400) {
        throw new Error(`Failed to fetch cart: ${id}`)
      }
      else
      {
        const order  = orderRes.order
        const id = order.id
        if(!id)
        return id
      }
    }
    catch(e)
    {
      throw new Error("invalid cart")
    }
  } 
  

}

/*export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "You purchase was successful",
}*/

export default async function ConfirmationInProgress({ params }: Props) {
  //const { cart } = useCart()
  
  //const result = useAuthorizePaymentSession(cart!.payment_session!.id) 

  let orderRes:any;
  try {
   orderRes = await getOrderFromCartId(params.merchantTransactionId)
   
  }
  catch(e){
    orderRes=undefined
  }/*
 useEffect(()=>{
  if(orderRes && orderRes.order)
  {
    window.location.replace(`/order/confirmed/${orderRes.order.id}`)
  }
 }, [orderRes])*/

 if(orderRes)
  return <OrderCompletedTemplate order={orderRes.order} />
  else{
    return <CheckoutTemplate />
  }
}
