import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { BnNgIdleService } from 'bn-ng-idle';
import { CookieService } from 'ngx-cookie-service';
import { UserStatus } from 'src/app/store/action/user-login.actions';
import { ApplicationState } from 'src/app/store/state/application.state';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private cookieService:CookieService, private router:Router, private store:Store<ApplicationState>,private bnIdle: BnNgIdleService) {
    
    
  }

  startSession(){
    console.log("session started.....");
    this.bnIdle.startWatching(600).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        this.logOutUser()
        console.log('session expired');
      }
      
    });

    
  }

  logOutUser(){
    this.cookieService.delete("token")
    this.store.dispatch(new UserStatus({isUserLoggedIn:false}))
    this.router.navigateByUrl("/").then(()=>{
      this.router.navigate([''])
    })
  }
  
}
