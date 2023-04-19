import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationHandlerService } from 'src/app/common/services/application-handler.service';
import { apiDetails } from 'src/environment/environment';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss'],
})
export class WriteReviewComponent implements OnInit {
  reviewForm!: FormGroup;
  userInfo: any;
  isWritten!: boolean;
  imageFile:any;
  isDataSubmitted!:boolean;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.userInfo = ApplicationHandlerService.get('userDetails');
    this.reviewForm = this.fb.group({
      name: ['RRR', [Validators.required]],
      lang: ['Telugu', [Validators.required]],
      castCrew: ['RAJAMOULI,RAMCHARAN,TARAK', [Validators.required]],
      rating: ['6', [Validators.required]],
      verdict: ['BLOCK BUSTER', [Validators.required]],
      poster:[null,[Validators.required]],
    });
   
  }
  uploadPoster(event:any){
    this.imageFile = event?.target?.files[0]
    
    this.reviewForm.patchValue({
      poster:this.imageFile
    })
    
  }
  submit() {
    
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }
    this.isWritten = false;
    this.isDataSubmitted=true;
    const endpoint: string =apiDetails.getApigatWay() + apiDetails.review_ms_service_apis.writeReviewWithPoster;
    const userData = {
      userName: this.userInfo.userName,
      movieName: this.reviewForm.get('name')?.value,
      rating: this.reviewForm.get('rating')?.value,
      verdict: this.reviewForm.get('verdict')?.value,
      castCrew: this.reviewForm.get('castCrew')?.value.split(','),
      language: this.reviewForm.get('lang')?.value,
      key: this.reviewForm.get('name')?.value+new Date().valueOf(),
    };
    const body:FormData = new FormData()
    body.append("reviewForm",new Blob([JSON.stringify(userData)],{type:"application/json"}))
    body.append("poster",this.imageFile)
 
    return new Promise((resolve, reject) => {
      this.http
        .post(endpoint, body, {responseType: 'text' })
        .subscribe(
          (res) => {
            if(res.includes("ALready")){
              this.isWritten=true;
              this.isDataSubmitted=false;
            }else{
              this.router.navigateByUrl("/").then(()=>{
                this.isDataSubmitted=false;
                this.router.navigate(['/my-reviews']);
                
              })
            }
            resolve(true)
          },
          (err) => {
            this.isDataSubmitted=false;
            this.isWritten = true;
            console.log(err);
          }
        );
    });

  }
}
