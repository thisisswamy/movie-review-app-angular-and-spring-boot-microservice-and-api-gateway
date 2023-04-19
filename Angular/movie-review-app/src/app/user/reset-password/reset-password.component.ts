import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/common/services/Error-handler';
import { ApplicationHandlerService } from 'src/app/common/services/application-handler.service';
import { apiDetails } from 'src/environment/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  

  matcher = new MyErrorStateMatcher();
  resetPassForm!:FormGroup;
  isPwdHide!:boolean;
  isServerError!:boolean;
  user:any;
  constructor(private fb:FormBuilder,private router:Router,private http:HttpClient){}

  ngOnInit(): void {
    this.resetPassForm =this.fb.group({
      password:['',[Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      confirmPassword:['',[Validators.required]],
    })
    this.user =ApplicationHandlerService.get('userDetails');

    if(this.user == undefined){
      this.router.navigate(["/user/forgot-password"])
    }
  }
  submit(){
    if(this.resetPassForm.invalid){
      this.resetPassForm.markAllAsTouched()
      return;
    }
    
    const body = {
      "userName":this.user.userName,
      "emailAddress":this.user.emailAddress,
      "password":this.resetPassForm.get("password")?.value,
      "confirmPassword":this.resetPassForm.get("confirmPassword")?.value
    };
    const endpoint:string =apiDetails.getApigatWay() + apiDetails.user_ms_service_api.resetPassword;
    return new Promise((resolve,reject)=>{
      this.http.post(endpoint,body,{responseType:'text'}).subscribe(res=>{
        console.log(res);
        this.router.navigate(['/user/login'])
        resolve(res)
        
      },
      err=>{
        console.log(err);
        
      })
    })
    
  }


}
