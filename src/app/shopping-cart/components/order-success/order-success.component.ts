import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { MyOrder } from 'shared/models/my-orders';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'order-success',
  templateUrl: './order-success.component.html',
})
export class OrderSuccessComponent implements OnInit {
  orderData?: MyOrder;
  navigationOrderData: MyOrder | undefined;
  loading = false;
  error: Error | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.navigationOrderData = router.getCurrentNavigation()?.extras.state as
      | MyOrder
      | undefined;
  }

  ngOnInit() {
    this.loading = true;

    this.navigationOrderData
      ? this.handleOrderSuccessData(this.navigationOrderData)
      : this.route.paramMap
          .pipe(
            take(1),
            switchMap((params) =>
              this.orderService.getOrderById(params.get('orderId')!)
            )
          )
          .subscribe(
            this.handleOrderSuccessData.bind(this),
            this.handleOrderErrorData.bind(this)
          );
  }

  private handleOrderSuccessData(data: MyOrder) {
    this.orderData = data;
    this.loading = false;
  }

  private handleOrderErrorData(error: Error) {
    this.error = error;
    this.loading = false;
  }
}
