import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/services/guards/auth.guard';

import { YourAccountComponent } from './components/your-account/your-account.component';

const routes: Routes = [
  {
    path: '', // your-account
    component: YourAccountComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourAccountRoutingModule {}
