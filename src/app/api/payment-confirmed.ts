import { medusaClient } from "@lib/config";
import medusaRequest from "@lib/medusa-fetch";
import { createPostCheckSumHeader } from "@lib/util/phonepe-create-post-checksum-header";
import { NextApiRequest, NextApiResponse } from "next";
import { PaymentResponse, PaymentStatusCodeValues } from "types/phonepe-types";


export async function POST(request: NextApiRequest, response:NextApiResponse) {

const receivedChecksum = request.headers["x-verify"];
const b64body = request.body.response as string;
const bodyResponse = atob(b64body) as unknown as PaymentResponse;
const {checksum} = createPostCheckSumHeader(bodyResponse)

if(checksum == receivedChecksum && bodyResponse.code == PaymentStatusCodeValues.PAYMENT_SUCCESS)
{
    const cartId = bodyResponse.data.merchantTransactionId
    const result = await medusaClient.carts.complete(cartId)    
    const order = await medusaClient.orders.retrieveByCartId(cartId)
    response.redirect(`/order/confirmed/${order.order.id}`)
}
if(checksum == receivedChecksum && bodyResponse.code != PaymentStatusCodeValues.PAYMENT_SUCCESS)
{
    response.redirect(`/checkout`)
}
else{
    response.status(401)
}

}
export default POST