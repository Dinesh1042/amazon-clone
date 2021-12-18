import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminOrdersComponent } from './components/orders/admin-orders/admin-orders.component';
import { AdminProductCardComponent } from './components/products/admin-product-card/admin-product-card.component';
import { AdminProductDetailComponent } from './components/products/admin-product-detail/admin-product-detail.component';
import { AdminProductEditComponent } from './components/products/admin-product-edit/admin-product-edit.component';
import { AdminProductFormComponent } from './components/products/admin-product-form/admin-product-form.component';
import { AdminProductsComponent } from './components/products/admin-products/admin-products.component';

@NgModule({
  declarations: [
    AdminOrdersComponent,
    AdminProductCardComponent,
    AdminProductDetailComponent,
    AdminProductEditComponent,
    AdminProductFormComponent,
    AdminProductsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AdminModule {}
