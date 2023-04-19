import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/common/services/Error-handler';
import { ApplicationHandlerService } from 'src/app/common/services/application-handler.service';
import { apiDetails } from 'src/environment/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{

  matcher = new MyErrorStateMatcher();
  forgotPassForm!:FormGroup;
  isPwdHide!:boolean;
  isInvalidEmail!:boolean;
  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router){}
  ngOnInit(): void {
    this.forgotPassForm=this.fb.group({
      email:['abcd@gmail.com',[Validators.required,Validators.email]]
    })
  }
  submit(){
    this.isInvalidEmail=false;
    if(this.forgotPassForm.invalid){
      return;
    }
    const body={
      "email":this.forgotPassForm.get("email")?.value
    }
  
    const endpoint:string = apiDetails.getApigatWay() +apiDetails.user_ms_service_api.forgotPassword;

    return new Promise((resolve,reject)=>{
      this.http.post(endpoint,body).subscribe(res=>{
        console.log(res);
        ApplicationHandlerService.set("userDetails",res)
        this.router.navigate(['/user/reset-password'])
        resolve(res);
        
      },
      err=>{
        this.isInvalidEmail=true;
        console.log(err);
        
      })
    })
     
  }
}
