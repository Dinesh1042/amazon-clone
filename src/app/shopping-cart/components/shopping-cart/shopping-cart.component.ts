import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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

  private subscriptions = new Subscription();

  constructor(
    private cartService: ShoppingCartService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.loading = true;
    this.subscriptions.add(
      this.cartService
        .getCart()
        .subscribe(
          this.handleCartSuccess.bind(this),
          this.handleCartError.bind(this)
        )
    );

    this.titleService.setTitle('Cart - Amazon');
  }

  trackByCartId(_index: number, cartProduct: ShoppingCartItem) {
    return cartProduct.productID;
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
    this.subscriptions.unsubscribe();
  }
}
