import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { snackBarConfig } from 'shared/config/snack-bar-config';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'add-cart-btn',
  templateUrl: './add-cart-btn.component.html',
  styleUrls: ['./add-cart-btn.component.scss'],
})
export class AddCartBtnComponent implements OnInit, OnDestroy {
  @Input('product') product?: Product;

  shoppingCart?: ShoppingCart;
  quantity = this.cartProductQuantity;

  private subscriptions = new Subscription();

  constructor(
    private cartService: ShoppingCartService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.cartService.getCart().subscribe((cart) => {
        this.shoppingCart = cart;
        this.quantity = this.cartProductQuantity;
      })
    );
  }

  addToCart(event: Event) {
    event.stopPropagation();

    if (this.product)
      this.cartService
        .addToCart(this.product)
        .subscribe((v) => this.showSnackBar(v));
  }

  increaseQuantity(event: Event) {
    event.stopPropagation();

    if (this.product?.productID)
      this.cartService
        .increaseProductQuantity(this.product.productID)
        .subscribe((v) => this.showSnackBar(v));
  }

  decreaseQuantity(event: Event) {
    event.stopPropagation();

    if (this.product?.productID)
      this.cartService
        .decreaseProductQuantity(this.product.productID)
        .subscribe((v) => this.showSnackBar(v));
  }

  private get cartProductQuantity() {
    return this.shoppingCart && this.product
      ? this.shoppingCart?.getQuantity(this.product)
      : 0;
  }

  private showSnackBar(value: any) {
    this.matSnackBar.open(value, undefined, snackBarConfig);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
