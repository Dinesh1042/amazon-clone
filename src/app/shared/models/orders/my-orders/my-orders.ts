import { OrdersInterface } from '../orders-interface';
import { MyOrder } from './my-order';

export class MyOrders {
  myOrders: MyOrder[] = [];

  constructor(public myOrderMap: OrdersInterface = {}) {
    this.initialize();
  }

  private initialize() {
    this.myOrders = Object.entries(this.myOrderMap).map(
      ([orderId, order]) => new MyOrder(order, orderId)
    );
  }
}
