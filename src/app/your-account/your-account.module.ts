import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';

import { UserAddressFormComponent } from './components/user-address-form/user-address-form.component';
import { YourAccountComponent } from './components/your-account/your-account.component';
import { YourAddressesComponent } from './components/your-addresses/your-addresses.component';
import { YourAccountRoutingModule } from './your-account-routing.module';

@NgModule({
  declarations: [
    YourAccountComponent,
    UserAddressFormComponent,
    YourAddressesComponent,
  ],
  imports: [CommonModule, YourAccountRoutingModule, SharedModule],
})
export class YourAccountModule {}
