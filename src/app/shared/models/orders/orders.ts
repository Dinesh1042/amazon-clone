import { Order, OrderInterface } from './order';

export class Orders {
  orders: Order[] = [];

  constructor(public ordersMap: OrdersInterface = {}) {
    this.initialize();
  }

  get deliveredOrders() {
    return this.orders
      .filter((order) => order.isDelivered)
      .sort((a, b) => b.orderPlaced - a.orderPlaced);
  }

  get processingOrders() {
    return this.orders
      .filter((order) => !order.isDelivered)
      .sort((a, b) => b.orderPlaced - a.orderPlaced);
  }

  private initialize() {
    this.orders = Object.entries(this.ordersMap).map(
      ([orderId, order]) => new Order(order, orderId)
    );
  }
}

export interface OrdersInterface {
  [orderId: string]: OrderInterface;
}
