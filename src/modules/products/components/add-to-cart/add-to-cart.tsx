
import { useProductActions } from '@lib/context/product-context';
import { cartAnimation } from '@modules/library-components/helpers/cart-animation';
import Counter from '@modules/library-components/ui/form-components/counter';
import { useCart, useCreateLineItem, useDeleteLineItem } from 'medusa-react';
import AddToCartBtn from './add-to-cart-btn';

interface Props {
  data: any;
  productViewVariant?:
    | 'helium'
    | 'neon'
    | 'argon'
    | 'oganesson'
    | 'single'
    | 'big'
    | 'text';
  counterVariant?:
    | 'helium'
    | 'neon'
    | 'argon'
    | 'oganesson'
    | 'single'
    | 'details';
  counterClass?: string;
  variation?: any;
  disabled?: boolean;
}

export const AddToCart = ({
  data,
  productViewVariant = 'helium',
  counterVariant,
  counterClass,
  variation,
  disabled,
}: Props) => {
  const { updateOptions, addToCart, options, inStock:isInStock,variant,removeFromCart  } =
  useProductActions();
  const cartActions = useCart();
  
  const isInCart=(id:string|undefined) =>cartActions.cart?.items.find(item=>id && item.variant_id == id)

  
   
  //const item = generateCartItem(data, variation);
  const item = variant
  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    // Check language and update
    addToCart();
    
    if (item && !isInCart(item.id)) {
      cartAnimation(e);
    }
  };
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeFromCart()
  };
  
  const outOfStock = isInCart(item?.id) && !isInStock;
  return !isInCart(item?.id) ? (
    <div>
      <AddToCartBtn
        disabled={disabled || outOfStock}
        variant={productViewVariant}
        onClick={handleAddClick}
      />
    </div>
  ) : (
    <>
      <Counter
        value={item?isInCart(item?.id)?.quantity??0:0}
        onDecrement={handleRemoveClick}
        onIncrement={handleAddClick}
        variant={productViewVariant}
        className={counterClass}
        disabled={outOfStock}
      />
    </>
  );
};
