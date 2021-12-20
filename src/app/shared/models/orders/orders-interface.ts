import { Shipping } from '../shipping';
import { ShoppingCartModel } from '../shopping-cart';

export interface OrdersInterface {
  [orderId: string]: OrderInterface;
}

export interface OrderInterface {
  orderPlaced: number;
  products: ShoppingCartModel;
  shipping: Shipping;
}
