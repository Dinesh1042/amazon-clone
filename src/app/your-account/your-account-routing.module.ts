import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/services/guards/auth.guard';

import { ProfileComponent } from './components/profile/profile.component';
import { UserAddressFormComponent } from './components/user-address-form/user-address-form.component';
import { YourAccountComponent } from './components/your-account/your-account.component';
import { YourAddressesComponent } from './components/your-addresses/your-addresses.component';

const routes: Routes = [
  {
    path: '', // your-account
    component: YourAccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addresses',
    component: YourAddressesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addresses/new',
    component: UserAddressFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addresses/:addressId/edit',
    component: UserAddressFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourAccountRoutingModule {}
