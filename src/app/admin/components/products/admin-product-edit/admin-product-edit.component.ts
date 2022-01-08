import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { AlertComponent } from 'shared/components/alert/alert.component';
import { Product } from 'shared/models/product';

import { EditComponentDeactivate } from '../../../guard/edit-component-deactivate.guard';
import { AdminProductService } from '../../../services/product/admin-product.service';

@Component({
  selector: 'admin-product-edit',
  templateUrl: './admin-product-edit.component.html',
  styleUrls: ['./admin-product-edit.component.scss'],
})
export class AdminProductEditComponent
  implements OnInit, EditComponentDeactivate
{
  product = new Product({});
  editProduct = new Product({});
  isEditProduct = false;
  loading = false;
  error: Error | null = null;

  private isChangesSaved = true;
  private navigationData: Product | undefined;

  constructor(
    private adminProductService: AdminProductService,
    private route: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog
  ) {
    this.navigationData = this.router.getCurrentNavigation()?.extras.state as
      | Product
      | undefined;
  }

  ngOnInit(): void {
    const editProductId = this.route.snapshot.paramMap.get('productID');
    if (editProductId) {
      this.isEditProduct = true;
      this.loading = true;

      this.navigationData
        ? this.handleEditProductSuccess(this.navigationData)
        : this.adminProductService
            .getProduct(editProductId)
            .pipe(take(1))
            .subscribe(
              this.handleEditProductSuccess.bind(this),
              this.handleEditProductError.bind(this)
            );
    }
  }

  productFormEvent(productFormValue: Product) {
    Object.assign(this.product, productFormValue);
  }

  changesSavedEvent(editSaved: boolean) {
    this.isChangesSaved = editSaved;
  }

  private handleEditProductSuccess(product: Product) {
    Object.assign(this.editProduct, product);
    this.loading = false;
  }

  private handleEditProductError(error: Error) {
    this.error = error;
    this.loading = false;
  }

  canDeactivate() {
    if (this.isChangesSaved) return of(true);

    const dialogRef = this.matDialog.open(AlertComponent, {
      data: {
        title: `Leaving`,
        body: `Are you sure you want to leave? After leaving, enter data can't be recovered.`,
        cancelButton: 'Cancel',
        confirmButton: 'Leave',
      },
      width: '95%',
      maxWidth: 500,
      panelClass: 'mat-dialog-box',
    });
    return dialogRef.afterClosed() as Observable<boolean>;
  }
}
