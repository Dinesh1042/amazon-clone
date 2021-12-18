import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Order } from 'shared/models/order';
import { OrderSuccess } from 'shared/models/orderSuccess';
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

      const order: Order = {
        products: this.shoppingCart.shoppingCartMap,
        shipping,
      };

      this.orderService
        .placeOrder(order)
        .pipe(take(1))
        .subscribe(
          this.handleOrderSuccess.bind(this),
          this.handleOrderError.bind(this)
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

  private handleOrderSuccess(orderSuccess: OrderSuccess | null) {
    if (orderSuccess) {
      const orderId = Object.keys(orderSuccess)[0];
      this.router.navigate(['/order-success', orderId], {
        state: orderSuccess[orderId],
      });
      this.snackBar.open('Order Placed Successfully', undefined, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    }

    this.orderPlacedLoading = false;
  }

  private handleOrderError(error: Error) {
    this.orderPlacedLoading = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
