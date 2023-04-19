import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountLandingComponent } from './account-landing/account-landing.component';
import { SharedModule } from '../common/shared/shared.module';


@NgModule({
  declarations: [
    AccountLandingComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule { }
