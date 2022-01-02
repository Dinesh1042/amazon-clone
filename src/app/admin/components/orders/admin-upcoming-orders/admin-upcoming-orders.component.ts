import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'shared/models/order/order';
import { AdminOrderService } from '../../../services/order/admin-order.service';

@Component({
  selector: 'admin-upcoming-orders',
  templateUrl: './admin-upcoming-orders.component.html',
})
export class AdminUpcomingOrdersComponent implements OnInit, OnDestroy {
  upcomingOrders?: Order[];
  pageLoading = false;
  error: Error | null = null;

  private subscriptions = new Subscription();

  constructor(private adminOrderService: AdminOrderService) {}

  ngOnInit(): void {
    this.pageLoading = true;

    this.subscriptions.add(
      this.adminOrderService
        .getUpcomingOrders()
        .subscribe(
          this.handleGETOrderSuccess.bind(this),
          this.handleGETOrderError.bind(this)
        )
    );
  }

  private handleGETOrderSuccess(upcomingOrders: Order[]) {
    this.upcomingOrders = upcomingOrders;
    this.pageLoading = false;
  }

  private handleGETOrderError(error: Error) {
    this.error = error;
    this.pageLoading = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
