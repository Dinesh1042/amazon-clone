import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'shared/models/order/order';
import { AdminOrderService } from '../../../services/order/admin-order.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent {
  @Input('orders') orders?: Order[];
  @Input('pageLoading') pageLoading = false;
  @Input('error') error?: Error | null = null;
  @Input('isUpcomingOrders') isUpcomingOrders = true;

  constructor(
    private adminOrderService: AdminOrderService,
    private snackBar: MatSnackBar
  ) {}

  modifyCompleteStatus(orderID: string, isCompleted: boolean) {
    this.adminOrderService[
      isCompleted ? 'markOrderAsUnComplete' : 'markOrderAsComplete'
    ](orderID).subscribe(this.showSnackBar.bind(this));
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
