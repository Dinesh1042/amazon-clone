import { Shipping } from '../shipping';
import { OrderProduct, OrderProductsInterface } from './order-product';

export class Order implements OrderInterface {
  orderPlaced: number;
  products: OrderProductsInterface;
  shipping: Shipping;
  isDelivered: boolean;
  productsArr: OrderProduct[] = [];

  constructor(order: OrderInterface, public orderId: string) {
    const { orderPlaced, products, shipping, isDelivered } = order;

    this.isDelivered = isDelivered;
    this.products = products;
    this.shipping = shipping;
    this.orderPlaced = orderPlaced;

    this.initialize();
  }

  private initialize() {
    this.productsArr = Object.entries(this.products).map(
      ([pid, { product, quantity }]) => new OrderProduct(product, quantity, pid)
    );
  }

  get orderTotal() {
    return this.productsArr.reduce((acc, val) => acc + val.itemTotalPrice, 0);
  }

  get orderQuantity() {
    return this.productsArr.reduce((acc, val) => acc + val.quantity, 0);
  }
}

export interface OrderInterface {
  orderPlaced: number;
  products: OrderProductsInterface;
  shipping: Shipping;
  isDelivered: boolean;
}
