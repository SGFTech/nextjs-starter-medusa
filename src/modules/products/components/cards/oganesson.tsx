"use client"
import cn from 'classnames';
import { useTranslations } from 'next-intl';
import useProductPrice from "@lib/hooks/use-product-price";
import { useModalAction } from "@modules/library-components/ui/modal/modal.context";
import { productPlaceholder } from "@modules/library-components/placeholders";
import { ShoppingBagIcon } from "@modules/common/icons/shopping-bag-icon";
import Image from "next/image";
import { Product } from '@medusajs/medusa';
import { useProductActions } from '@lib/context/product-context';
import { getPrices } from '@modules/library-components/helpers/price';
import { AddToCart } from '../add-to-cart/add-to-cart';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';


type OganessonProps = {
  product: Product;
  className?: string;
};

const Oganesson: React.FC<OganessonProps> = ({ product, className }) => {
  const t = useTranslations('common');
  const { title: name } =
    product ?? {};
  const { quantity } = useProductActions()
  const priceInfo = useProductPrice(product)
  const {
    basePrice,
    calculatePrice, minPrice,
    maxPrice,
    discount,
    price,
  } = getPrices(priceInfo)

  return (
    <article
      className={cn('product-card cart-type-oganesson group h-full', className)}
    >
      <div className="relative flex h-48 w-auto items-center justify-center overflow-hidden rounded bg-light transition-shadow group-hover:shadow-sm sm:h-64">
        <span className="sr-only">{t('text-product-image')}</span>
        <Image
          src={product?.images?.[0]?.url ?? productPlaceholder}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw"
          className="product-image object-contain"
        />
        {discount && (
          <div className="absolute top-3 rounded bg-accent px-1.5 text-xs font-semibold leading-6 text-light ltr:right-3 rtl:left-3 md:top-[22px] md:px-2 ltr:md:right-4 rtl:md:left-4 lg:px-2.5">
            {discount}
          </div>
        )}
        <div className="absolute bottom-4 ltr:right-4 rtl:left-4">
          {Number(quantity) > 0 ? (
            <AddToCart productViewVariant="oganesson" data={product} />
          ) : (
            <div className="rounded bg-red-500 px-2 py-1 text-xs text-light">
              {t('text-out-stock')}
            </div>
          )}
        </div>
      </div>
      {/* End of product image */}

      <header className="py-3.5 px-0.5 md:py-5">
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
        {/* End of product price */}

        <h3 className="truncate text-xs text-body md:text-sm">{name}</h3>
        {/* End of product title */}
      </header>
    </article>
  );
};

export default Oganesson;
