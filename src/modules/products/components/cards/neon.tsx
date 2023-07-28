"use client"
import cn from 'classnames';
import { useTranslations } from 'next-intl';
import useProductPrice from "@lib/hooks/use-product-price";
import { useModalAction } from "@modules/library-components/ui/modal/modal.context";
import { productPlaceholder } from "@modules/library-components/placeholders";
import { ShoppingBagIcon } from "@modules/common/icons/shopping-bag-icon";
import Image from "next/image";

import dynamic from 'next/dynamic';
import { PlusIcon } from '@modules/common/icons/plus-icon';
import { getPrices } from '@modules/library-components/helpers/price';
import { Product } from '@medusajs/medusa';
import { useProductActions } from '@lib/context/product-context';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

const AddToCart = dynamic(
  () =>
    import('../add-to-cart/add-to-cart').then(
      (module) => module.AddToCart
    ),
  { ssr: false }
);

type NeonProps = {
  product: Product;
  className?: string;
};

const Neon: React.FC<NeonProps> = ({ product, className }) => {
  const t = useTranslations('common');

  const { title: name } =
    product ?? {};
  //  const { quantity } = useProductActions()
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

  const { openModal } = useModalAction();

  function handleProductQuickView() {
    return openModal('PRODUCT_DETAILS', product.handle);
  }
  return (
    <article
      className={cn(
        'product-card cart-type-neon h-full transform overflow-hidden rounded border border-border-200 bg-light shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow',
        className
      )}
    >
      <div
        className="relative flex h-48 w-auto cursor-pointer items-center justify-center sm:h-64"
        onClick={handleProductQuickView}
      >
        <span className="sr-only">{t('text-product-image')}</span>
        <Image
          src={product?.images?.[0]?.url ?? productPlaceholder}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw"
          className="product-image object-contain"
        />
        {discount && (
          <div className="absolute top-3 rounded bg-accent px-1.5 text-xs font-semibold leading-6 text-light ltr:right-3 rtl:left-3 sm:px-2 md:top-4 md:px-2.5 ltr:md:right-4 rtl:md:left-4">
            {discount}
          </div>
        )}
      </div>
      {/* End of product image */}

      <header className="p-3 md:p-6">
        {product_type.toLowerCase() === 'variable' ? (
          <div className="mb-2">
            <span className="text-sm font-semibold text-heading md:text-base">
              {minPrice}
            </span>
            <span> - </span>
            <span className="text-sm font-semibold text-heading md:text-base">
              {maxPrice}
            </span>
          </div>
        ) : (
          <div className="mb-2 flex items-center">
            <span className="text-sm font-semibold text-heading md:text-base">
              {price}
            </span>
            {basePrice && (
              <del className="text-xs text-muted ltr:ml-2 rtl:mr-2 md:text-sm">
                {basePrice}
              </del>
            )}
          </div>
        )}
        {/* End of product price */}

        <h3
          className="mb-4 cursor-pointer truncate text-xs text-body md:text-sm"
          onClick={handleProductQuickView}
        >
          {name}
        </h3>
        {/* End of product title */}

        {product_type.toLowerCase() === 'variable' ? (
          <>
            {/*Number(quantity) > 0 &&*/ (
              <button
                onClick={handleProductQuickView}
                className="group flex h-7 w-full items-center justify-between rounded bg-gray-100 text-xs text-body-dark transition-colors hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-0 md:h-9 md:text-sm"
              >
                <span className="flex-1">{t('text-add')}</span>
                <span className="grid h-7 w-7 place-items-center bg-gray-200 transition-colors duration-200 group-hover:bg-accent-600 group-focus:bg-accent-600 ltr:rounded-tr ltr:rounded-br rtl:rounded-tl rtl:rounded-bl md:h-9 md:w-9">
                  <PlusIcon className="h-4 w-4 stroke-2" />
                </span>
              </button>
            )}
          </>
        ) : (
          <>
            {/*Number(quantity) > 0 &&*/ (
              <AddToCart productViewVariant="neon" data={product} />
            )}
          </>
        )}

        {/*Number(quantity) <= 0 && (
          <div className="rounded bg-red-500 px-2 py-1.5 text-center text-xs text-light sm:py-2.5">
            {t('text-out-stock')}
          </div>
        )*/}
        {/* End of add to cart */}
      </header>
    </article>
  );
};

export default Neon;
