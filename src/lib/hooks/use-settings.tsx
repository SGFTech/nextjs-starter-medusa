import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

/*export function useSettings() {
    const { locale } = useRouter();

    const formattedOptions = {
        language: locale
    };

    const { data, isLoading, error } = useQuery<Settings, Error>(
        () => {
            return medusaClient.client.request("GET", "/settings?store=", {
                email: payload.email
            })
        [API_ENDPOINTS.SETTINGS, formattedOptions],
        ({ queryKey, pageParam }) =>
            client.settings.all(Object.assign({}, queryKey[1], pageParam))
    );

    return {
        settings: data?.options ?? {},
        isLoading,
        error
    };
}*/