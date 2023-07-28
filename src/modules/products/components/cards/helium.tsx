"use client"

import cn from "classnames";

//import { AddToCart } from "@/components/products/add-to-cart/add-to-cart";
//import { useTranslation } from "next-i18next";
//import { useModalAction } from "@/components/ui/modal/modal.context";
//import { productPlaceholder } from "@/lib/placeholders";
//import CartIcon from "@/components/icons/cart";
import useProductPrice from "@lib/hooks/use-product-price";
import { useTranslations } from "next-intl";
import { useModalAction } from "@modules/library-components/ui/modal/modal.context";
import { productPlaceholder } from "@modules/library-components/placeholders";
import { ShoppingBagIcon } from "@modules/common/icons/shopping-bag-icon";
import { AddToCart } from "../add-to-cart/add-to-cart";
import Image from "next/image";

import { useProductActions } from "@lib/context/product-context";
import { getPrices } from "@modules/library-components/helpers/price";
import { useProduct, useProducts } from "medusa-react";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { Product } from "@medusajs/medusa";


type HeliumProps = {
    product: Product;
    className?: string;
};

const Helium: React.FC<HeliumProps> = ({ product, className }) => {
    const t = useTranslations("common");


    //const quantity = Math.sum(product.variants.map((c)=>{ return c.inventory_quantity}));
    const product_type = "variable";
    const { title: name, } =
        product ?? {};
    const nameParts = name.split("-").map((t: string) => t.trim());

    const priceInfo = useProductPrice(product)
    const {
        basePrice,
        calculatePrice, minPrice,
        maxPrice,
        discount,
        price,
    } = getPrices(priceInfo)

    const { openModal } = useModalAction();

    function handleProductQuickView() {
        return openModal("PRODUCT_DETAILS", product.handle);
    }

    function handleVariableProduct() {
        return openModal("SELECT_PRODUCT_VARIATION", product.handle);
    }
    return (
        <article
            className={cn(
                "product-card cart-type-helium h-full overflow-hidden rounded border border-border-200 bg-light transition-shadow duration-200 hover:shadow-sm",
                className
            )}
        >
            <div
                onClick={handleProductQuickView}
                className="relative flex h-48 w-auto items-center justify-center sm:h-64"
                role="button"
            >
                <span className="sr-only">{t("text-product-image")}</span>

                <Image
                    src={product?.images?.[0].url ?? productPlaceholder}
                    alt={name}
                    fill={true}
                    sizes="(max-width: 1024px) 200vw"
                    className="product-image max-h-full max-w-full rounded-lg object-center"
                />

                {discount && (
                    <div className="absolute top-3 rounded-full bg-yellow-500 px-1.5 text-xs font-semibold leading-6 text-light ltr:right-3 rtl:left-3 sm:px-2 md:top-4 md:px-2.5 ltr:md:right-4 rtl:md:left-4">
                        {discount}
                    </div>
                )}
            </div>
            {/* End of product image */}

            <header className="relative p-3 md:p-5 md:py-6">
                <h2
                    onClick={handleProductQuickView}
                    role="button"
                    className="mb-2 truncate font-semibold text-heading"
                >
                    {nameParts[1].split("(")[0]}
                </h2>
                <h3 className="text-bold text-sm ">
                    {t("by") + " " + nameParts[0]}
                </h3>
                <p className="text-bold text-xs text-muted">
                    {t(product.type.value)}
                </p>

                {/* End of product info */}

                <div className="relative mt-7 flex min-h-6 items-center justify-between md:mt-8">
                    {product_type.toLowerCase() === "variable" ? (
                        <>
                            <div>
                                {minPrice != maxPrice && minPrice.toString() != "0.00" ? (
                                    <div>
                                        <span className="text-sm font-semibold text-accent md:text-[15px]">
                                            {minPrice}
                                        </span>{" "}
                                        <span> - </span>
                                    </div>
                                ) : (
                                    <span className="text-sm font-semibold text-accent md:text-[15px]">
                                        {maxPrice}
                                    </span>
                                )}
                            </div>

                            {/*Number(quantity) > 0 &&*/ (
                                <button
                                    onClick={handleProductQuickView}
                                    className="order-5 flex items-center justify-center rounded-full border-2 border-border-100 bg-light px-3 py-2 text-sm font-semibold text-accent transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-0 sm:order-4 sm:justify-start sm:px-4"
                                >
                                    <ShoppingBagIcon className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                                    <span>{t("text-cart")}</span>
                                </button>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="relative">
                                {basePrice && (
                                    <del className="absolute -top-4 text-xs italic text-muted text-opacity-75 md:-top-5">
                                        {basePrice}
                                    </del>
                                )}
                                <span className="text-sm font-semibold text-accent md:text-base">
                                    {price}
                                </span>
                            </div>

                            {/*Number(quantity) > 0 &&*/ (
                                <AddToCart data={product} />
                            )}
                        </>
                    )}

                    {/*Number(quantity) <= 0 && */(
                        <div className="rounded bg-red-500 px-2 py-1 text-xs text-light">
                            {t("text-out-stock")}
                        </div>
                    )}
                    {/* End of product price */}
                </div>
            </header>
        </article>
    );
};

export default Helium;
