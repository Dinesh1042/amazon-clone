import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'shared/models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input('product') product!: Product;

  constructor(private router: Router, private route: ActivatedRoute) {}

  navigateToProduct() {
    this.router.navigate(['./', this.product.productID], {
      relativeTo: this.route,
      state: this.product,
    });
  }
}
