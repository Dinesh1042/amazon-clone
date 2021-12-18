import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  shoppingCart?: ShoppingCart;
  loading = false;
  error: Error | null = null;

  private subscription: Subscription = new Subscription();

  constructor(private cartService: ShoppingCartService) {}

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

  trackByCartId(_index: number, cartProduct: ShoppingCartItem) {
    return cartProduct.pid;
  }

  private handleCartSuccess(cart: ShoppingCart) {
    this.shoppingCart = cart;
    this.loading = false;
  }

  private handleCartError(error: Error) {
    this.error = error;
    this.loading = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
