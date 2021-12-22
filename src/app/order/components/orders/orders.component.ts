import { Component, Input } from '@angular/core';
import { Order } from 'shared/models/orders/order';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  @Input('orders') orders: Order[] | undefined = [];
  @Input('loading') loading: boolean = false;
  @Input('error') error: Error | null = null;
  @Input('isUpComingOrders') isUpComingOrders = true;
}
