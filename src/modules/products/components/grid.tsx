import { PRODUCTS_PER_PAGE } from "@lib/constants";
import ErrorMessage from "@modules/library-components/error-message";
import ProductLoader from "@modules/library-components/loaders/product-loader";
import NotFound from "app/[locale]/(main)/not-found";
import cn from "classnames";
import { useTranslations } from "next-intl";

import ProductCard from "./cards/card";
import Button from "@modules/library-components/ui/form-components/button";
import rangeMap from "@modules/library-components/helpers/range-map";
import { useProducts } from "medusa-react";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
//import Button from "@/components/ui/button";
//import ProductLoader from "@/components/ui/loaders/product-loader";
//import NotFound from "@/components/ui/not-found";
//import rangeMap from "@/lib/range-map";
//import ProductCard from "@/components/products/cards/card";
//import ErrorMessage from "@/components/ui/error-message";
//import { useProducts } from "@/framework/product";
//import { PRODUCTS_PER_PAGE } from "@/framework/client/variables";
//import type { Product } from "@/types";

interface Props {
    limit?: number;
    sortedBy?: string;
    orderBy?: string;
    column?: "five" | "auto";
    shopId?: string;
    gridClassName?: string;
    products: Product[] | undefined;
    isLoading?: boolean;
    error?: any;
    loadMore?: any;
    isLoadingMore?: boolean;
    hasMore?: boolean;
    className?: string;
}

export function Grid({
    className,
    gridClassName,
    products,
    isLoading,
    error,
    loadMore,
    isLoadingMore,
    hasMore,
    limit = PRODUCTS_PER_PAGE,
    column = "auto"
}: Props) {
    const t = useTranslations("common");

    if (error) return <ErrorMessage message={error.message} />;

    if (!isLoading && !products?.length) {
        return (
            <div className="min-h-full w-full px-4 pt-6 pb-8 lg:p-8">
                <NotFound />
            </div>
        );
    }

    return (
        <div className={cn("w-full", className)}>
            <div
                className={cn(
                    {
                        "grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3":
                            column === "auto",
                        "grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 gap-y-10 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] xl:gap-8 xl:gap-y-11 2xl:grid-cols-5 3xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]":
                            column === "five"
                    },
                    gridClassName
                )}
            >
                {isLoading && !products?.length
                    ? rangeMap(limit, (i) => (
                        <ProductLoader key={i} uniqueKey={`product-${i}`} />
                    ))
                    : products
                        ?.filter((product) => product.images?.[0]?.url && product.images?.[0]?.url != "")
                        ?.sort((a, b) => {
                            return a.type > b.type ? 2 : 1;
                        })
                        .map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))}
            </div>
            {hasMore && (
                <div className="mt-8 flex justify-center lg:mt-12">
                    <Button
                        loading={isLoadingMore}
                        onClick={loadMore}
                        className="h-11 text-sm font-semibold md:text-base"
                    >
                        {t("text-load-more")}
                    </Button>
                </div>
            )}
        </div>
    );
}
interface ProductsGridProps {
    className?: string;
    gridClassName?: string;
    variables?: any;
    column?: "five" | "auto";
}
export default function ProductsGrid({
    className,
    gridClassName,
    variables,
    column = "auto"
}: ProductsGridProps) {
    const { products, refetch: loadMore, isFetching: isLoadingMore, isLoading, limit, offset, count, error } =
        useProducts(variables);
    const hasMore = (count ?? 0) > (limit ?? 1) + (offset ?? 0);
    const productsItem: any = products;
    return (
        <Grid
            products={productsItem}
            loadMore={loadMore}
            isLoading={isLoading}
            isLoadingMore={isLoadingMore}
            hasMore={hasMore}
            error={error}
            className={className}
            gridClassName={gridClassName}
            column={column}
        />
    );
}
