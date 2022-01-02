import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Order } from 'shared/models/order/order';
import { AdminOrderService } from '../../../services/order/admin-order.service';

@Component({
  selector: 'admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
})
export class AdminOrderDetailComponent implements OnInit {
  order?: Order;
  pageLoading = false;
  error: Error | null = null;

  private subscriptions = new Subscription();

  constructor(
    private adminOrderService: AdminOrderService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.pageLoading = true;

    this.subscriptions.add(
      this.route.paramMap
        .pipe(
          switchMap((param) =>
            this.adminOrderService.getOrder(param.get('orderID')!)
          )
        )
        .subscribe(
          this.handleGETOrderSuccess.bind(this),
          this.handleGETOrderError.bind(this)
        )
    );
  }

  modifyCompleteStatus(orderID: string, isCompleted: boolean) {
    this.adminOrderService[
      isCompleted ? 'markOrderAsUnComplete' : 'markOrderAsComplete'
    ](orderID).subscribe(this.showSnackBar.bind(this));
  }

  private handleGETOrderSuccess(order: Order) {
    this.order = order;
    this.pageLoading = false;
  }

  private handleGETOrderError(error: Error) {
    this.error = error;
    this.pageLoading = false;
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
