import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductCardComponent } from './components/product-card/product-card.component';

import { ProductComponent } from './components/product/product.component';
import { ProductRoutingModule } from './product.routing';
import { ProductsComponent } from './components/products/products.component';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  declarations: [ProductComponent, ProductCardComponent, ProductsComponent],
  imports: [CommonModule, ProductRoutingModule, SharedModule],
})
export class ProductModule {}
