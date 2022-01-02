import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'shared/models/product';

@Component({
  selector: 'home-product-card',
  templateUrl: './home-product-card.component.html',
  styleUrls: ['./home-product-card.component.scss'],
})
export class HomeProductCardComponent {
  @Input('product') product!: Product;

  constructor(private router: Router) {}

  showProduct(product: Product) {
    console.log(product);
    product.productID &&
      this.router.navigate(['/products', product.productID], {
        state: product,
      });
  }
}
