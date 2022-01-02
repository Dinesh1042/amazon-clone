import { OrderProductInterface } from 'shared/models/order/order-product';
import { ShoppingCartModel } from 'shared/models/shopping-cart';

export const orderProductFactory = (shoppingCart: ShoppingCartModel) => {
  return Object.entries(shoppingCart).reduce(
    (acc: OrderProductInterface[], [productID, { product, quantity }]) => {
      const {
        title,
        images: [image],
        offerPrice,
        originalPrice,
      } = product;

      acc.push({
        productID,
        product: { title, image, offerPrice, originalPrice },
        quantity,
      });

      return acc;
    },
    []
  );
};
