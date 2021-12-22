import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { Order } from 'shared/models/orders/order';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
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
          this.handleOrderError.bind(this),
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
