import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { YourAccountComponent } from './components/your-account/your-account.component';
import { YourAccountRoutingModule } from './your-account-routing.module';

@NgModule({
  declarations: [YourAccountComponent],
  imports: [CommonModule, YourAccountRoutingModule],
})
export class YourAccountModule {}
