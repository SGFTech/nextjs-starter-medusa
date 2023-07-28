"use client"

import { medusaClient } from "@lib/config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useDetailedContent(type: string, id?: string) {

    

    const content = useQuery([type, id],
         () => medusaClient.client.request("GET", `/strapi/content/products/${id}`),
         {
            refetchOnMount:true
         }
    )

        console.log(JSON.stringify(content))
    return {
        ...content
    };
}