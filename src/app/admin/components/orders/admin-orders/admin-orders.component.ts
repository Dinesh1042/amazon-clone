import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { snackBarConfig } from 'shared/config/snack-bar-config';
import { Order } from 'shared/models/order/order';

import { AdminOrderService } from '../../../services/order/admin-order.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit {
  @Input('orders') orders?: Order[];
  @Input('pageLoading') pageLoading = false;
  @Input('error') error?: Error | null = null;
  @Input('isUpcomingOrders') isUpcomingOrders = true;

  constructor(
    private adminOrderService: AdminOrderService,
    private snackBar: MatSnackBar,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Admin - Amazon');
  }

  modifyCompleteStatus(orderID: string, isCompleted: boolean) {
    this.adminOrderService[
      isCompleted ? 'markOrderAsUnComplete' : 'markOrderAsComplete'
    ](orderID).subscribe(this.showSnackBar.bind(this));
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, undefined, snackBarConfig);
  }
}
