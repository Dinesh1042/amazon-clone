import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'shared/shared.module';

import { EmptyCartComponent } from './components/empty-cart/empty-cart.component';
import { ProceedCardComponent } from './components/proceed-card/proceed-card.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { ShoppingCartProductComponent } from './components/shopping-cart-product/shopping-cart-product.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';

@NgModule({
  declarations: [
    ShoppingCartComponent,
    ShoppingCartProductComponent,
    ProceedCardComponent,
    EmptyCartComponent,
    ShippingComponent,
    ShippingFormComponent,
  ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class ShoppingCartModule { }
