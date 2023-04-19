import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { ApplicationHandlerService } from 'src/app/common/services/application-handler.service';
import { UserStatus } from 'src/app/store/action/user-login.actions';
import { ApplicationState } from 'src/app/store/state/application.state';
import { apiDetails } from 'src/environment/environment';

@Component({
  selector: 'app-account-landing',
  templateUrl: './account-landing.component.html',
  styleUrls: ['./account-landing.component.scss']
})
export class AccountLandingComponent implements OnInit {


  totalMoviesCount:any;
  userInfo:any
  constructor(private router:Router,private store:Store<ApplicationState>, private cookieService: CookieService){}
  
  ngOnInit(): void {
    this.totalMoviesCount =ApplicationHandlerService.get("totalMovies")
    this.userInfo =ApplicationHandlerService.get("userDetails")
  }

  changePhoto(){
    console.log("change photo clicked..");
    
  }
  logout(){
    apiDetails.JWT_TOKEN ="",
    this.cookieService.delete("token")
    this.store.dispatch(new UserStatus({isUserLoggedIn:false}))
    this.router.navigateByUrl("/").then(()=>{
      this.router.navigate([''])
    })

  }
} 
