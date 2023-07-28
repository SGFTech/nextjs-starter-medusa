"use client"
import useProductPrice from "@lib/hooks/use-product-price";
import cn from 'classnames'
import { useTranslations } from "next-intl";
import { productPlaceholder } from "@modules/library-components/placeholders";
import Image from "next/image";
import { getPrices } from "@modules/library-components/helpers/price";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { useProductActions } from "@lib/context/product-context";
import Link from "@modules/library-components/link";
import { Routes } from "@lib/routes";
import { Product } from "@medusajs/medusa";

type RadonProps = {
  product: Product;
  className?: string;
};

const Radon: React.FC<RadonProps> = ({ product, className }) => {
  const t = useTranslations('common');
  const { title: name } =
    product ?? {};
  const { quantity } = useProductActions()
  /*const { price, basePrice, discount } = usePrice({
  amount: product.sale_price ? product.sale_price : product.price!,
  baseAmount: product.price,
});
const { price: minPrice } = usePrice({
  amount: min_price,
});
const { price: maxPrice } = usePrice({
  amount: max_price,
});*/
  const product_type = "variable"
  const priceInfo = useProductPrice(product)
  const {
    basePrice,
    calculatePrice, minPrice,
    maxPrice,
    discount,
    price,
  } = getPrices(priceInfo)

  /*const { price, basePrice, discount } = usePrice({
    amount: product.sale_price ? product.sale_price : product.price!,
    baseAmount: product.price,
  });
  const { price: minPrice } = usePrice({
    amount: min_price!,
  });
  const { price: maxPrice } = usePrice({
    amount: max_price!,
  });*/



  return (
    <article
      className={cn(
        'product-card cart-type-radon flex h-full flex-col overflow-hidden duration-200',
        className
      )}
    >
      <Link href={Routes.product(product?.handle ?? "")} className="cursor-pointer">
        <Image
          src={product?.images?.[0]?.url ?? productPlaceholder}
          alt={name}
          width={600}
          height={888}
          className="product-image rounded-lg"
        />
      </Link>
      {/* End of product image */}

      <header className="flex shrink-0 flex-col space-y-2 pt-4">
        {name && (
          <Link
            href={Routes.product(product?.handle ?? "")}
            className="text-sm font-semibold text-heading transition-colors hover:text-orange-500 md:text-base"
            title={name}
          >
            {name}
          </Link>
        )}

        {/*author && (
          <span className="text-xs text-gray-400 md:text-sm">
            {t('text-by')}
            <Link
              href={Routes.author(author?.product?.handle??""!)}
              className="text-body transition-colors hover:text-orange-500 ltr:ml-1 rtl:mr-1"
            >
              {author?.name}
            </Link>
          </span>
        )*/}

        <div className="flex shrink-0 items-center">
          {product_type.toLowerCase() === 'variable' ? (
            <p className="text-sm font-semibold text-orange-500 md:text-base">
              {minPrice}

              <span className="text-heading"> - </span>

              {maxPrice}
            </p>
          ) : (
            <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
              <span className="text-base font-semibold text-orange-500">
                {price}
              </span>
              {basePrice && (
                <del className="text-xs font-semibold text-gray-400 ltr:mr-2 rtl:ml-2">
                  {basePrice}
                </del>
              )}
              {discount && (
                <div className="text-xs text-accent">
                  ({t('text-save')} {discount})
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      {/* End of product info */}
    </article>
  );
};

export default Radon;
