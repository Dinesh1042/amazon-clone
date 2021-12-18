import { Shipping } from './shipping';
import { ShoppingCartModel } from './shopping-cart';

export interface OrderSuccess {
  [orderId: string]: {
    orderPlaced: number;
    products: ShoppingCartModel;
    shipping: Shipping;
  };
}
