import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { MyOrder } from 'shared/models/orders/my-orders/my-order';
import {
  OrderInterface,
  OrdersInterface,
} from 'shared/models/orders/orders-interface';
import { Shipping } from 'shared/models/shipping';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { OrderService } from 'shared/services/order.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'shipping',
  templateUrl: './shipping.component.html',
})
export class ShippingComponent implements OnInit {
  shoppingCart?: ShoppingCart;
  loading = false;
  error: Error | null = null;
  orderPlacedLoading = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loading = true;
    this.subscription.add(
      this.cartService
        .getCart()
        .subscribe(
          this.handleCartSuccess.bind(this),
          this.handleCartError.bind(this)
        )
    );
  }

  placeOrder(shipping: Shipping) {
    if (this.shoppingCart) {
      this.orderPlacedLoading = true;

      const order: OrderInterface = {
        products: this.shoppingCart.shoppingCartMap,
        shipping,
        orderPlaced: Date.now(),
      };

      this.orderService
        .placeOrder(order)
        .pipe(take(1))
        .subscribe(
          this.handleOrderPlacedSuccess.bind(this),
          this.handleOrderPlacedError.bind(this),
          this.showSnackBar.bind(this, 'Order Placed Successfully!')
        );
    }
  }

  private handleCartSuccess(cart: ShoppingCart) {
    this.shoppingCart = cart;
    this.loading = false;
  }

  private handleCartError(error: Error) {
    this.error = error;
    this.loading = false;
  }

  private handleOrderPlacedSuccess(orderSuccess: OrdersInterface) {
    const [orderId, order] = Object.entries(orderSuccess)[0];
    this.router.navigate(['/order-success', orderId], {
      state: new MyOrder(order, orderId),
    });
    this.orderPlacedLoading = false;
  }

  private handleOrderPlacedError(error: Error) {
    this.orderPlacedLoading = false;
    this.error = error;
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
