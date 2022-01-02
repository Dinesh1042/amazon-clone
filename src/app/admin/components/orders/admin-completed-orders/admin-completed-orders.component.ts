import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'shared/models/order/order';
import { AdminOrderService } from '../../../services/order/admin-order.service';

@Component({
  selector: 'admin-completed-orders',
  templateUrl: './admin-completed-orders.component.html',
})
export class AdminCompletedOrdersComponent implements OnInit {
  completedOrders?: Order[];
  pageLoading = false;
  error: Error | null = null;

  private subscriptions = new Subscription();

  constructor(private adminOrderService: AdminOrderService) {}

  ngOnInit(): void {
    this.pageLoading = true;

    this.subscriptions.add(
      this.adminOrderService
        .getDeliveredOrders()
        .subscribe(
          this.handleGETOrderSuccess.bind(this),
          this.handleGETOrderError.bind(this)
        )
    );
  }

  private handleGETOrderSuccess(upcomingOrders: Order[]) {
    this.completedOrders = upcomingOrders;
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
