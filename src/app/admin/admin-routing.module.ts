import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AdminAuthGuard } from 'shared/services/guards/admin-auth.guard';
import { AuthGuard } from 'shared/services/guards/auth.guard';

import { AdminOrdersComponent } from './components/orders/admin-orders/admin-orders.component';
import { AdminProductDetailComponent } from './components/products/admin-product-detail/admin-product-detail.component';
import { AdminProductEditComponent } from './components/products/admin-product-edit/admin-product-edit.component';
import { AdminProductsComponent } from './components/products/admin-products/admin-products.component';
import { EditComponentDeactivateGuard } from './guard/edit-component-deactivate.guard';

const routes: Route[] = [
  {
    path: '', // admin
    pathMatch: 'full',
    redirectTo: '/admin/products',
  },
  {
    path: 'products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'products/new',
    component: AdminProductEditComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
    canDeactivate: [EditComponentDeactivateGuard],
  },
  {
    path: 'products/:productID',
    component: AdminProductDetailComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'products/:productID/edit',
    component: AdminProductEditComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
    canDeactivate: [EditComponentDeactivateGuard],
  },
  {
    path: 'orders',
    component: AdminOrdersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
