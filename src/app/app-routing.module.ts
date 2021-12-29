import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminCanLoadGuard } from 'shared/services/can-load/admin-can-load.guard';
import { AuthCanLoadGuard } from 'shared/services/can-load/auth-can-load.guard';
import { UserCanLoadGuard } from 'shared/services/can-load/user-can-load.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(({ AuthModule }) => AuthModule),
    canLoad: [AuthCanLoadGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then(({ AdminModule }) => AdminModule),
    canLoad: [AdminCanLoadGuard],
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./product/product.module').then(
        ({ ProductModule }) => ProductModule
      ),
  },
  {
    path: 'your-account',
    loadChildren: () =>
      import('./your-account/your-account.module').then(
        ({ YourAccountModule }) => YourAccountModule
      ),
    canLoad: [UserCanLoadGuard],
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./order/order.module').then(({ OrderModule }) => OrderModule),
    canLoad: [UserCanLoadGuard],
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./shopping-cart/shopping-cart.module').then(
        ({ ShoppingCartModule }) => ShoppingCartModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
