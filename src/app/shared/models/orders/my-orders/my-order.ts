import { Shipping } from 'shared/models/shipping';
import { ShoppingCartModel } from 'shared/models/shopping-cart';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';

import { OrderInterface } from '../orders-interface';

export class MyOrder implements OrderInterface {
  orderPlaced: number;
  shipping: Shipping;
  products: ShoppingCartModel;
  productsArr: ShoppingCartItem[] = [];

  constructor(
    { orderPlaced, shipping, products }: OrderInterface,
    public orderId: string
  ) {
    this.orderPlaced = orderPlaced;
    this.shipping = shipping;
    this.products = products;
    this.initialize();
  }

  private initialize() {
    this.productsArr = Object.entries(this.products).map(
      ([pid, product]) => new ShoppingCartItem(product, pid)
    );
  }
}
