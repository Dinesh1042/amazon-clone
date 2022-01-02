import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AdminAuthGuard } from 'shared/services/guards/admin-auth.guard';
import { AuthGuard } from 'shared/services/guards/auth.guard';

import { AdminCompletedOrdersComponent } from './components/orders/admin-completed-orders/admin-completed-orders.component';
import { AdminManageOrdersComponent } from './components/orders/admin-manage-orders/admin-manage-orders.component';
import { AdminOrderDetailComponent } from './components/orders/admin-order-detail/admin-order-detail.component';
import { AdminUpcomingOrdersComponent } from './components/orders/admin-upcoming-orders/admin-upcoming-orders.component';
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
    component: AdminManageOrdersComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'upcoming',
        pathMatch: 'full',
      },
      {
        path: 'upcoming',
        component: AdminUpcomingOrdersComponent,
      },
      {
        path: 'completed',
        component: AdminCompletedOrdersComponent,
      },
    ],
  },
  {
    path: 'orders/:orderID',
    component: AdminOrderDetailComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
