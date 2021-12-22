import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/services/auth.guard';

import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { OrderComponent } from './components/order/order.component';
import { OrdersCompletedComponent } from './components/orders-completed/orders-completed.component';
import { OrdersUpcomingComponent } from './components/orders-upcoming/orders-upcoming.component';

const routes: Routes = [
  {
    path: 'my-orders',
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
    path: 'my-orders/:orderId',
    component: OrderDetailComponent,
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
export class OrderRoutingModule { }
