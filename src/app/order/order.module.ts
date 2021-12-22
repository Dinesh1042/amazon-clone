import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';

import { EmptyOrderComponent } from './components/empty-order/empty-order.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { OrderComponent } from './components/order/order.component';
import { OrdersCompletedComponent } from './components/orders-completed/orders-completed.component';
import { OrdersUpcomingComponent } from './components/orders-upcoming/orders-upcoming.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderRoutingModule } from './order-routing.module';


@NgModule({
  declarations: [
    EmptyOrderComponent,
    OrderCardComponent,
    OrderComponent,
    OrderDetailComponent,
    OrdersCompletedComponent,
    OrdersComponent,
    OrderSuccessComponent,
    OrdersUpcomingComponent,
  ],
  imports: [CommonModule, OrderRoutingModule, SharedModule],
})
export class OrderModule { }
