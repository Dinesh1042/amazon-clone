import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/services/auth.guard';

import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingCartComponent,
  },
  {
    path: 'shipping',
    component: ShippingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order-success/:orderId',
    component: OrderSuccessComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingCartRoutingModule {}
