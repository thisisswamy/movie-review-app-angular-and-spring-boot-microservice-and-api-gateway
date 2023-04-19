import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewLandingComponent } from './review-landing/review-landing.component';
import { WriteReviewComponent } from './write-review/write-review.component';

const routes: Routes = [
  {
    path:'',component:ReviewLandingComponent
  },
  {
    path:'write-review',component:WriteReviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyReviewRoutingModule { }
