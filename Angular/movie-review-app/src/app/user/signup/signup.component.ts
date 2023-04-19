import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../common/services/Error-handler';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../../../../g-mail-clone-app/src/environments/environment.prod';
import { apiDetails } from 'src/environment/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationState } from 'src/app/store/state/application.state';
import { Store } from '@ngrx/store';
import { UserStatus } from 'src/app/store/action/user-login.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  signUpForm!:FormGroup;
  isPwdHide!:boolean;
  isUserExisted!: boolean;
  constructor(private fb:FormBuilder,
    private http:HttpClient,
    private router:Router,
    private store:Store<ApplicationState>){}
  
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      displayName:['',[Validators.required]],
      password:['',[Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      confirmPassword:['',[Validators.required]],
    });
  }
  submit(){
    console.log(this.signUpForm.value);
    if(this.signUpForm.invalid){
      this.signUpForm.markAllAsTouched()
      return;
    }
    this.isUserExisted=false;
    const userName = uuidv4();
    const body = {
      "userName":userName,
      "emailAddress": this.signUpForm.get("email")?.value,
      "displayName":this.signUpForm.get("displayName")?.value,
      "password":this.signUpForm.get("password")?.value,
      "confirmPassword":this.signUpForm.get("confirmPassword")?.value
    }

    const endpoint = apiDetails.getApigatWay() + apiDetails.user_ms_service_api.registerUser;

    console.log(endpoint);
    

    return new Promise<any>((resolve,reject)=>{
      this.http.post(endpoint,body).subscribe((res:any)=>{
    
        if(res?.message.includes("already")){
          this.isUserExisted=true;
        }else{
          this.signUpForm.reset()
          this.store.dispatch(new UserStatus({isUserLoggedIn:true}))
          this.router.navigate(['/user/login'])
        }
        resolve(true)
      },err=>{
        this.isUserExisted=false;
        console.log(err);
        
      }
      
      )
    })
  
    
  }
  generateUsername(data:any){

  }

  

}
