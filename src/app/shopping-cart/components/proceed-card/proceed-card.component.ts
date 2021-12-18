import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'proceed-card',
  templateUrl: './proceed-card.component.html',
  styleUrls: ['./proceed-card.component.scss'],
})
export class ProceedCardComponent {
  @Input('shoppingCart') shoppingCart!: ShoppingCart;

  constructor(private router: Router) {}

  navigateToCheckOut() {
    this.shoppingCart.cartProductCount > 0 &&
      this.router.navigate(['/shipping']);
  }
}
