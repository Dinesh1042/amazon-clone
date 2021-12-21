import { OrderProductsInterface } from 'shared/models/orders/order-product';
import { ShoppingCartModel } from 'shared/models/shopping-cart';

export const orderProductFactory = (shoppingCart: ShoppingCartModel) => {
  return Object.entries(shoppingCart).reduce(
    (acc: OrderProductsInterface, [productId, { product, quantity }]) => {
      const { title, images, offerPrice, originalPrice } = product;

      acc[productId] = {
        product: { title, image: images[0], offerPrice, originalPrice },
        quantity,
      };

      return acc;
    },
    {}
  );
};
