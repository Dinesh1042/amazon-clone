import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';

import { UserAddressFormComponent } from './components/user-address-form/user-address-form.component';
import { YourAccountComponent } from './components/your-account/your-account.component';
import { YourAddressesComponent } from './components/your-addresses/your-addresses.component';
import { YourAccountRoutingModule } from './your-account-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { UserImageComponent } from './components/user-image/user-image.component';
import { UserImageEditComponent } from './components/user-image-edit/user-image-edit.component';
import { UserProfileFormComponent } from './components/user-profile-form/user-profile-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    YourAccountComponent,
    UserAddressFormComponent,
    YourAddressesComponent,
    ProfileComponent,
    UserImageComponent,
    UserImageEditComponent,
    UserProfileFormComponent,
  ],
  imports: [
    CommonModule,
    YourAccountRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class YourAccountModule {}
