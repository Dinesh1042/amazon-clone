import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/:pid',
    component: ProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
