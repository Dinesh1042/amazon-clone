import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  product?: Product;
  loading = false;
  error: Error | null = null;
  private navigationData?: Product;
  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.navigationData = this.router.getCurrentNavigation()?.extras.state as
      | Product
      | undefined;
  }

  ngOnInit(): void {
    this.loading = true;
    const productID = this.route.snapshot.paramMap.get('productID');

    this.navigationData
      ? this.handleProductSuccess(this.navigationData)
      : this.subscriptions.add(
          this.productService
            .getProduct(productID!)
            .subscribe(
              this.handleProductSuccess.bind(this),
              this.handleProductError.bind(this)
            )
        );
  }

  private handleProductSuccess(product: Product) {
    this.product = product;
    this.loading = false;
  }

  private handleProductError(error: Error) {
    this.error = error;
    this.loading = false;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
