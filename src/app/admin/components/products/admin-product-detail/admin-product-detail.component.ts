import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AlertComponent } from 'shared/components/alert/alert.component';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.scss'],
})
export class AdminProductDetailComponent implements OnInit, OnDestroy {
  product?: Product;
  error?: Error;
  pageLoading = false;
  deleteActionLoading = false;
  private pid: string | null = null;
  private productSubscription?: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.pageLoading = true;
    this.pid = this.route.snapshot.paramMap.get('pid');
    if (this.pid)
      this.productSubscription = this.productService
        .getProduct(this.pid)
        .subscribe(
          this.handleProductSuccess.bind(this),
          this.handleProductError.bind(this)
        );
    else this.handleProductError(new Error('No Product Found'));
  }

  editProduct() {
    this.router.navigate(['./edit'], {
      relativeTo: this.route,
      state: this.product,
    });
  }

  deleteAlert() {
    const dialogRef = this.matDialog.open(AlertComponent, {
      data: {
        title: `Delete Product?`,
        body: `Are you sure to delete ${
          this.product?.title.split(' ').slice(0, 4).join(' ') || `this product`
        }. After you delete this, it can't be recovered.`,
        cancelButton: 'Cancel',
        confirmButton: 'Delete',
      },
      width: '95%',
      maxWidth: 500,
      panelClass: 'mat-dialog-box',
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(this.deleteProduct.bind(this));
  }

  private deleteProduct(value: boolean) {
    if (value && this.product && this.pid) {
      this.deleteActionLoading = true;
      this.productSubscription?.unsubscribe();

      this.productService
        .deleteProduct(this.product, this.pid)
        .subscribe(() => {
          this.deleteActionLoading = false;
          this.router.navigate(['../'], { relativeTo: this.route });
        }, this.handleProductError.bind(this));
    }
  }

  private handleProductError(error: Error) {
    this.error = error;
    this.pageLoading = false;
    this.deleteActionLoading = false;
  }

  private handleProductSuccess(product: Product) {
    this.product = product;
    this.error = undefined;
    this.pageLoading = false;
  }

  ngOnDestroy() {
    this.productSubscription?.unsubscribe();
  }
}
