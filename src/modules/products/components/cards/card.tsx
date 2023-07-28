
import { productCardType } from "@lib/constants";
import { ModalProvider } from "@lib/context/modal-context";
import useToggleState from "@lib/hooks/use-toggle-state";
import { Product } from "@medusajs/medusa";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const Helium = dynamic(() => import("./helium"));
const Neon = dynamic(() => import("./neon")); // grocery-two
const Argon = dynamic(() => import("./argon")); // bakery
const Krypton = dynamic(
    () => import("./krypton") // furniture extra price
);
const Xenon = dynamic(() => import("./xenon")); // furniture-two
const Radon = dynamic(() => import("./radon")); // Book

const MAP_PRODUCT_TO_CARD: Record<string, any> = {
    neon: Neon,
    helium: Helium,
    argon: Argon,
    krypton: Krypton,
    xenon: Xenon,
    radon: Radon
};
interface ProductCardProps {
    product: Product;
    className?: string;
    cardType?: any;
}
const ProductCard: React.FC<ProductCardProps> = ({
    product,
    className,
    ...props
}) => {
    const redirect = useRouter()
    const { state, close, open } = useToggleState()
    /*useEffect(() =>
        redirect.push(`/products/${product.handle}`)
        , [product])*/
    const Component = productCardType /*product?.type?.settings?.productCard
        ? MAP_PRODUCT_TO_CARD[product?.type?.settings?.productCard]
        : Helium;*/
    return <>
        <ModalProvider close={close} >
            <Component product={product} {...props} className={className} />;
        </ModalProvider>
    </>
};
export default ProductCard;
