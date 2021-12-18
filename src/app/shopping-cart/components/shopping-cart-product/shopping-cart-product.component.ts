import { Component, Input } from '@angular/core';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';

@Component({
  selector: 'shopping-cart-product',
  templateUrl: './shopping-cart-product.component.html',
  styleUrls: ['./shopping-cart-product.component.scss'],
})
export class ShoppingCartProductComponent {
  @Input('cartProduct') cartProduct!: ShoppingCartItem;
}
