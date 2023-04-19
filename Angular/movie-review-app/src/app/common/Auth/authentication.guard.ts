import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ApplicationState } from '../../store/state/application.state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  isUserLoggedIn!:boolean;

  constructor(private store:Store<ApplicationState>){}
  async canActivate(): Promise<any> {
    this.store.subscribe(state=>{
      this.isUserLoggedIn=state.userLoggedStatus.isUserLoggedIn;
    })
   return this.isUserLoggedIn;
  
  }
  
}
