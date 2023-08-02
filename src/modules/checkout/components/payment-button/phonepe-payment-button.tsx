import { useCheckout } from "@lib/context/checkout-context"
import { PaymentSession } from "@medusajs/medusa"
import Button from "@modules/common/components/button"
import Spinner from "@modules/common/icons/spinner"
import { useCart, useUpdatePaymentSession } from "medusa-react"
import { useCallback, useEffect, useState } from "react"


export const PhonePePaymentButton = ({
    session,
    notReady,
  }: {
    session: PaymentSession
    notReady: boolean
  }) => {
    const [disabled, setDisabled] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
      undefined
    )
  
    const { cart } = useCart()
    const { onPaymentCompleted } = useCheckout()
    
    
    useEffect(() => {
      console.log(JSON.stringify(session))
      if (!session && cart?.payment.provider_id == "phonepe") {
        setDisabled(true)
      } else {
        setDisabled(false)
      }
    }, [session,cart])

    
    
        
    
        
  const handlePayment = useCallback(() => {
    console.log(session)
    setSubmitting(true)
    if ( !cart) {
      setSubmitting(false)
      return
      }
      console.log(((session.data.data as any).instrumentResponse as any).redirectInfo.url)
      if(((session.data.data as any).instrumentResponse as any).redirectInfo.url.includes("https"))
      window.location.replace(((session.data.data as any).instrumentResponse as any).redirectInfo.url)
      onPaymentCompleted()
    }
    
    ,[session, cart]);

    /*useEffect(() => {
        if (session) {
         handlePayment();
        }
      }, [session])*/
    return (
      <>
        <Button
          disabled={submitting || disabled || notReady}
          onClick={handlePayment}
        >
          {submitting ? <Spinner /> : "Checkout"}
        </Button>
        {errorMessage && (
          <div className="text-red-500 text-small-regular mt-2">
            {errorMessage}
          </div>
        )}
      </>
    )
  }
  