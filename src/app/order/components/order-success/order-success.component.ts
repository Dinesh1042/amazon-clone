import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { Order } from 'shared/models/order/order';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss'],
})
export class OrderSuccessComponent implements OnInit {
  order?: Order;
  navigationOrderData: Order | undefined;
  loading = false;
  error: Error | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.navigationOrderData = router.getCurrentNavigation()?.extras.state as
      | Order
      | undefined;
  }

  ngOnInit() {
    this.loading = true;

    this.navigationOrderData
      ? this.handleOrderSuccessData(this.navigationOrderData)
      : this.route.paramMap
          .pipe(
            switchMap((params) =>
              this.orderService.getOrder(params.get('orderId')!)
            ),
            take(1)
          )
          .subscribe(
            this.handleOrderSuccessData.bind(this),
            this.handleOrderErrorData.bind(this)
          );
  }

  private handleOrderSuccessData(data: Order) {
    this.order = data;
    this.loading = false;
  }

  private handleOrderErrorData(error: Error) {
    this.error = error;
    this.loading = false;
  }
}
