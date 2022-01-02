import { Shipping } from '../shipping';
import { OrderProduct, OrderProductInterface } from './order-product';

export class Order {
  datePlaced: number;
  shipping: Shipping;
  isDelivered: boolean;
  products: OrderProduct[] = [];
  uid?: string;
  orderID?: string;
  orderTotal: number = 0;

  constructor(order: OrderInterface) {
    const { datePlaced, products, shipping, isDelivered, orderTotal } = order;

    this.isDelivered = isDelivered;
    this.shipping = shipping;
    this.datePlaced = datePlaced;
    this.orderTotal = orderTotal;
    this.products = products.map((product) => new OrderProduct(product));

    this.uid = order.uid;
    this.orderID = order.orderID;
  }

  get orderQuantity() {
    return this.products.reduce((acc, val) => (acc += val.quantity), 0);
  }
}

export interface OrderInterface {
  datePlaced: number;
  products: OrderProductInterface[];
  shipping: Shipping;
  isDelivered: boolean;
  orderTotal: number;
  uid?: string;
  orderID?: string;
}
