import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(({ AuthModule }) => AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then(({ AdminModule }) => AdminModule),
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
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./order/order.module').then(({ OrderModule }) => OrderModule),
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
