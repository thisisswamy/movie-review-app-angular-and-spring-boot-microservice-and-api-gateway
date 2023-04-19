import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/common/services/Error-handler';
import { Router } from '@angular/router';
import { ApplicationState } from '../../store/state/application.state';
import { Store } from '@ngrx/store';
import { UserStatus } from '../../store/action/user-login.actions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiDetails } from 'src/environment/environment';
import { ApplicationHandlerService } from 'src/app/common/services/application-handler.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  loginForm!: FormGroup;
  isPwdHide!: boolean;
  isInvalidCreds!: boolean;
  JWT_TOKEN!:string;
  isSubmitted!:boolean;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<ApplicationState>,
    private http: HttpClient,
    private cookieService:CookieService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['abcd@gmail.com', [Validators.required, Validators.email]],
      password: ['Swamy786@', [Validators.required]],
    });
  }

  submit() {
    this.isInvalidCreds = false;
    this.isSubmitted=true;
    if (this.loginForm.valid) {
      const body = {
        "email": this.loginForm.get('email')?.value,
        "password": this.loginForm.get('password')?.value,
      };
      this.getJWTToken(body);
    }
    this.loginForm.markAllAsTouched();
    return;
  }

  getJWTToken(body: any) {
    const endpoint:string = apiDetails.getApigatWay() + apiDetails.user_ms_service_api.getJwtToken;
    console.log(endpoint);
    return new Promise<any>((resolve, reject) => {
      this.http.post(endpoint, body).subscribe(
        (res: any) => {
          apiDetails.JWT_TOKEN = "Bearer "+ res?.token;
          this.cookieService.set("token",apiDetails.JWT_TOKEN)
         this.getUserInfo(res.token);
          resolve(true);
        },

        (err) => {
          console.log(err);
          this.isSubmitted=false;
          this.isInvalidCreds=true;
        }
      );
    });
  }

  getUserInfo(token:any){
    const endpoint:string = apiDetails.getApigatWay()+ apiDetails.user_ms_service_api.validateByJWT;
    return new Promise<any>((resolve, reject) => {
      this.http.get(endpoint).subscribe(
        (res: any) => {
         
          ApplicationHandlerService.set("userDetails",res);
          this.cookieService.set("token",apiDetails.JWT_TOKEN)
          this.store.dispatch(new UserStatus({isUserLoggedIn:true}))
          this.router.navigate(['/home'])
          resolve(true);
        },
        (err) => {
          this.isSubmitted=false;
          console.log(err);
        }
      );
    });
  }


}
