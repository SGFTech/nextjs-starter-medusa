"use client"

import { useAccount } from "@lib/context/account-context"
import AddressBook from "../components/address-book"
import { useTranslations } from "next-intl"



const AddressesTemplate = () => {
  const { customer, retrievingCustomer } = useAccount()
  const t = useTranslations("common");

  if (retrievingCustomer || !customer) {
    return null
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{t("text-shipping-address")}</h1>
        <p className="text-base-regular">
          View and update your shipping addresses, you can add as many as you
          like. Saving your addresses will make them available during checkout.
        </p>
      </div>
      <AddressBook customer={customer} />
    </div>
  )
}

export default AddressesTemplate
