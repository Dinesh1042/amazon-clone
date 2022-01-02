import { Component, Input } from '@angular/core';
import { OrderProduct } from 'shared/models/order/order-product';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';
import { Router } from '@angular/router';

@Component({
  selector: 'order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent {
  @Input('items') items: Array<OrderProduct | ShoppingCartItem> = [];
  @Input('total') total: number = 0;
  @Input('boxShadow') boxShadow = true;
  @Input('padding') padding = true;

  constructor(private router: Router) {}

  showProduct(productID: string) {
    this.router.navigate(['/products', productID]);
  }

  trackByProductID(_index: number, item: OrderProduct | ShoppingCartItem) {
    return item.productID;
  }
}
