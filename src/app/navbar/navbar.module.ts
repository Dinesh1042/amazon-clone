import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { UserAccountComponent } from './components/user-account/user-account.component';

@NgModule({
  declarations: [NavbarComponent, SearchFormComponent, UserAccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [NavbarComponent],
})
export class NavbarModule {}
