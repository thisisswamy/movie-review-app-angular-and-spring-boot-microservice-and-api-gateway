import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { PopupComponent } from './common/components/popup/popup.component';
import { AuthenticationGuard } from './common/Auth/authentication.guard';

const routes: Routes = [

  {
    path:'',
    loadChildren :()=>import('./home/home.module').then(m=>m.HomeModule)
  }, 
  
  
  {
    path:'user',
    loadChildren :()=>import('./user/user.module').then(m=>m.UserModule)
  },
  {
    path:'home',
    canActivate:[AuthenticationGuard],
    loadChildren :()=> import('./movie-landing/movie-landing.module').then(m=>m.MovieLandingModule)
  },
  {
    path:'my-reviews',
    canActivate:[AuthenticationGuard],
    loadChildren:()=>import('./my-review/my-review.module').then(m=>m.MyReviewModule)

  },
  {
    path:'account',
    canActivate:[AuthenticationGuard],
    loadChildren:()=>import('./account/account.module').then(m=>m.AccountModule)

  },
  {
    path:"**",
    loadChildren :()=>import('./home/home.module').then(m=>m.HomeModule)
  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
