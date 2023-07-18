"use client"

import { medusaClient } from "@lib/config";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export function useSubscription() {
    const [isSubscribed, setIsSubscribed] = useState(false);

    const subscription = useMutation((payload: { email: string }) => {
        return medusaClient.client.request("POST", "/mailchimp/subscribe", {
            email: payload.email
        })
    }
        , {
            onSuccess: () => {
                setIsSubscribed(true);
            },
            onError: () => {
                setIsSubscribed(false);
            }
        });

    return {
        ...subscription,
        isSubscribed
    };
}