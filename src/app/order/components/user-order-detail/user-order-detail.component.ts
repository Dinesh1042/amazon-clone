import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { Order } from 'shared/models/order/order';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'user-order-detail',
  templateUrl: './user-order-detail.component.html',
})
export class UserOrderDetailComponent implements OnInit {
  order?: Order;
  error: Error | null = null;
  loading = false;

  private navigationOrderData: undefined | Order;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.navigationOrderData = this.router.getCurrentNavigation()?.extras
      .state as Order | undefined;
  }

  ngOnInit(): void {
    this.loading = true;

    this.navigationOrderData
      ? this.handleOrderSuccess(this.navigationOrderData)
      : this.route.paramMap
          .pipe(
            switchMap((param) =>
              this.orderService.getOrder(param.get('orderId')!)
            ),
            take(1)
          )
          .subscribe(
            this.handleOrderSuccess.bind(this),
            this.handleOrderError.bind(this)
          );
  }

  private handleOrderSuccess(order: Order) {
    this.order = order;
    this.loading = false;
  }

  private handleOrderError(error: Error) {
    this.error = error;
    this.loading = false;
  }
}
