import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/services/guards/auth.guard';

import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { OrderComponent } from './components/order/order.component';
import { OrdersCompletedComponent } from './components/orders-completed/orders-completed.component';
import { OrdersUpcomingComponent } from './components/orders-upcoming/orders-upcoming.component';
import { UserOrderDetailComponent } from './components/user-order-detail/user-order-detail.component';

const routes: Routes = [
  {
    path: '', // orders
    component: OrderComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'upcoming',
        pathMatch: 'full',
      },
      {
        path: 'upcoming',
        component: OrdersUpcomingComponent,
      },
      {
        path: 'completed',
        component: OrdersCompletedComponent,
      },
    ],
  },
  {
    path: ':orderId',
    component: UserOrderDetailComponent,
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
export class OrderRoutingModule {}
