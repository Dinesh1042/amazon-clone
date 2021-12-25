import { Component, Input } from '@angular/core';
import { Order } from 'shared/models/orders/order';

@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent {
  @Input('order') order!: Order;
}
