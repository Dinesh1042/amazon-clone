import { Shipping } from './shipping';
import { ShoppingCartModel } from './shopping-cart';

export interface Order {
  products: ShoppingCartModel;
  shipping: Shipping;
}
