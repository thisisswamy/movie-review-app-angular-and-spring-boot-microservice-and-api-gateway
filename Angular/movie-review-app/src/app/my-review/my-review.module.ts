import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyReviewRoutingModule } from './my-review-routing.module';
import { ReviewLandingComponent } from './review-landing/review-landing.component';
import { WriteReviewComponent } from './write-review/write-review.component';
import { ReviewCardComponent } from './review-card/review-card.component';
import { SharedModule } from '../common/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ReviewLandingComponent,
    WriteReviewComponent,
    ReviewCardComponent
  ],
  imports: [
    CommonModule,
    MyReviewRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class MyReviewModule { }
