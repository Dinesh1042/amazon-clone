import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { AlertComponent } from 'shared/components/alert/alert.component';
import { Product } from 'shared/models/product';

import { AdminProductService } from '../../../services/product/admin-product.service';

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

  private productID: string | null = null;
  private subscriptions = new Subscription();

  constructor(
    private adminProductService: AdminProductService,
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.pageLoading = true;
    this.productID = this.route.snapshot.paramMap.get('productID');
    if (this.productID)
      this.subscriptions.add(
        this.adminProductService
          .getProduct(this.productID)
          .subscribe(
            this.handleProductSuccess.bind(this),
            this.handleProductError.bind(this)
          )
      );
    else this.handleProductError(new Error('No Product Found'));
  }

  editProduct() {
    this.router.navigate(['./edit'], {
      relativeTo: this.route,
      state: this.product,
    });
  }

  deleteProduct() {
    if (this.product && this.productID)
      this.showDeleteAlert()
        .pipe(
          filter((response) => !!response),
          switchMap(() => {
            this.deleteActionLoading = true;
            this.subscriptions.unsubscribe();

            return this.adminProductService.deleteProduct(
              this.product!,
              this.productID!
            );
          })
        )
        .subscribe(() => {
          this.deleteActionLoading = false;
          this.router.navigate(['../'], { relativeTo: this.route });
        }, this.handleProductError.bind(this));
  }

  private showDeleteAlert() {
    const dialogRef: MatDialogRef<AlertComponent, boolean> =
      this.matDialog.open(AlertComponent, {
        data: {
          title: `Delete Product?`,
          body: `Are you sure to delete ${
            this.product?.title.split(' ').slice(0, 4).join(' ') ||
            `this product`
          }. After you delete this, it can't be recovered.`,
          cancelButton: 'Cancel',
          confirmButton: 'Delete',
        },
        width: '95%',
        maxWidth: 500,
        panelClass: 'mat-dialog-box',
      });

    return dialogRef.afterClosed();
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
    this.subscriptions.unsubscribe();
  }
}
