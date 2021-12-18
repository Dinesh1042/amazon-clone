import { Shipping } from './shipping';
import { ShoppingCartModel } from './shopping-cart';

export interface MyOrders {
  [orderId: string]: MyOrder;
}

export interface MyOrder {
  orderPlaced: number;
  products: ShoppingCartModel;
  shipping: Shipping;
}
