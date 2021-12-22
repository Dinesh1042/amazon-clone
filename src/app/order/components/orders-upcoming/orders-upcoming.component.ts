import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Orders } from 'shared/models/orders/orders';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'orders-upcoming',
  templateUrl: './orders-upcoming.component.html',
})
export class OrdersUpcomingComponent implements OnInit, OnDestroy {
  orders!: Orders;
  loading = false;
  error: Error | null = null;

  private subscription: Subscription = new Subscription();

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loading = true;
    this.subscription.add(
      this.orderService
        .getOrders()
        .subscribe(
          this.handleOrderSuccess.bind(this),
          this.handleOrderError.bind(this)
        )
    );
  }

  private handleOrderSuccess(orders: Orders) {
    this.orders = orders;
    this.loading = false;
  }

  private handleOrderError(error: Error) {
    this.error = error;
    this.loading = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
