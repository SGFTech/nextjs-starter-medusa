import { medusaClient } from "@lib/config";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

export const useContact = () => {
    const  t  = useTranslations("common");

    return useMutation((payload: any) => {
        return medusaClient.client.request("POST","/contact-us",
            payload
        )
      }, {
        onSuccess: (data) => {
            if (data.success) {
                toast.success(`${t(data.message)}`);
            } else {
                toast.error(`${t(data.message)}`);
            }
        },
        onError: (err) => {
            console.log(err);
        }
    });
};