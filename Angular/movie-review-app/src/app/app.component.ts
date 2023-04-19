import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ApplicationState } from './store/state/application.state';
import { Store } from '@ngrx/store';
import { DataService } from './common/services/data.service';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { DataConstants } from './common/services/Error-handler';
import { apiDetails } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { ApplicationHandlerService } from './common/services/application-handler.service';
import { UserStatus } from './store/action/user-login.actions';
import { CookieService } from 'ngx-cookie-service';
import { SessionService } from './common/services/session.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'movie-review-app';
  isUserLoggedIn!:boolean;

  reloadRoutes =DataConstants.reloadRoutes;
  nonReloadedRoutes =DataConstants.noReloadRoutes;
  isEnteredIf!:boolean;
  @ViewChild("header") header:any;
  
  constructor(private store:Store<ApplicationState>, 
    private dataService:DataService,
    private router:Router,
    private http:HttpClient,
    private sessionService:SessionService,
    private cookieService:CookieService){
    
    this.router.events.pipe(
      filter(event=> event instanceof NavigationStart)
    ).subscribe((current:any) =>{
 
      if(current.id === 1 && this.router.url === '/' && current.url!== this.router.url && this.reloadRoutes.includes(current.url)){
        this.getUserDetailsOnReload(current.url)
        this.isEnteredIf =true;
      }
      if(!this.isEnteredIf && current.id !== 1 && this.router.url === '/' && current.url!== this.router.url && !this.nonReloadedRoutes.includes(current.url)){
        this.isEnteredIf =true;
        console.log("router second if..");
        
        // this.router.navigate([""])
      }

    })

    //session
     
    

   
  }
  logOutUser(){
    this.cookieService.delete("token")
    this.store.dispatch(new UserStatus({isUserLoggedIn:false}))
    this.router.navigateByUrl("/").then(()=>{
      this.router.navigate([''])
    })
  }
  ngOnInit(): void {
    this.store.subscribe(state=>{
      this.isUserLoggedIn=state.userLoggedStatus.isUserLoggedIn;
      if(this.isUserLoggedIn) {
        this.sessionService.startSession()
      }
     
    })
    

  }
  @HostListener('window:scroll', ['$event']) 
  onScrollEvent(event:any) {
    this.dataService.menuOpenClose.next(false)
  }

  @HostListener('click',['$event'])
  menuEvent(event:any){
    if(event.target && event.target.classList && event.target.classList && !(event.target.classList.contains("menu-icon") || event.target.classList.contains("menu-close")) ){
      this.dataService.menuOpenClose.next(false);
      
    }
  }

  async getUserDetailsOnReload(currentRoute :any){
    await this.goToAPICall(currentRoute);
  }

  async goToAPICall(route:any){
    const endpoint:string = apiDetails.getApigatWay() + apiDetails.user_ms_service_api.validateByJWT;
    return new Promise<any>((resolve, reject) => {
      this.http.get(endpoint).subscribe(
        (res: any) => { 
          ApplicationHandlerService.set("userDetails",res);
          this.store.dispatch(new UserStatus({isUserLoggedIn:true}))
          console.log("reloaded route ::: >> "+ route);
          this.router.navigate([route])
          resolve(true);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
}
