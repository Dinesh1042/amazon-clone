import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'shared/models/order/order';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'orders-completed',
  templateUrl: './orders-completed.component.html',
})
export class OrdersCompletedComponent implements OnInit, OnDestroy {
  completedOrders!: Order[];
  loading = false;
  error: Error | null = null;

  private subscriptions = new Subscription();

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loading = true;
    this.subscriptions.add(
      this.orderService
        .getDeliveredOrders()
        .subscribe(
          this.handleOrderSuccess.bind(this),
          this.handleOrderError.bind(this)
        )
    );
  }

  private handleOrderSuccess(completedOrders: Order[]) {
    this.completedOrders = completedOrders;
    this.loading = false;
  }

  private handleOrderError(error: Error) {
    this.error = error;
    this.loading = false;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
