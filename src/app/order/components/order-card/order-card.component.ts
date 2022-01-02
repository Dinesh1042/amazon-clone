import { Component, Input } from '@angular/core';
import { Order } from 'shared/models/order/order';

@Component({
  selector: 'order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent {
  @Input('order') order!: Order;
}
