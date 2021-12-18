import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'shared/services/admin.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then(({ AdminModule }) => AdminModule),
    canLoad: [AdminGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(({ AuthModule }) => AuthModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./product/product.module').then(
        ({ ProductModule }) => ProductModule
      ),
  },
  {
    path: 'shopping-cart',
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
