import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';

import { AdminProductService } from '../../../services/product/admin-product.service';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products?: Product[];
  filteredProducts?: Product[];
  pageLoading = false;
  error: Error | null = null;
  private subscriptions = new Subscription();

  constructor(
    private adminProductService: AdminProductService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.pageLoading = true;

    this.subscriptions.add(
      this.adminProductService
        .getAllProduct()
        .subscribe(
          this.handleProductSuccess.bind(this),
          this.handleProductError.bind(this)
        )
    );

    this.titleService.setTitle('Admin - Amazon');
  }

  private handleProductError(error: Error) {
    this.error = error;
    this.pageLoading = false;
  }

  private handleProductSuccess(products: Product[]) {
    this.products = products;
    this.filteredProducts = products;
    this.pageLoading = false;
    this.error = !products.length ? new Error('No Product Found') : null;
  }

  filterProduct(inputEl: HTMLInputElement) {
    const value = inputEl.value;
    this.filteredProducts =
      value && value.trim() && this.products
        ? this.products.filter((product) =>
            product.title.toLowerCase().includes(value.toLowerCase())
          )
        : this.products;
  }

  navigateToProduct(productID: string) {
    this.router.navigate([`./`, productID], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
