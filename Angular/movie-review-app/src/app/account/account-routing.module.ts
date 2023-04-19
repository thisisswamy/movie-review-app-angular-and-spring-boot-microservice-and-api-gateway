import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLandingComponent } from './account-landing/account-landing.component';

const routes: Routes = [{
  path:'',component:AccountLandingComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
