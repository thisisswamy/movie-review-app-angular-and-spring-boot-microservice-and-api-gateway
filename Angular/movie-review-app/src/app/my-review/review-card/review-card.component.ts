import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiDetails } from 'src/environment/environment';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent implements OnInit{

  isDeleteClicked!:boolean;
  
  @Input()
  searchFilter:string=''
  
  @Input()
  movieDetails:any

  movie:any;

  constructor(private http:HttpClient,private router:Router){}

  ngOnInit(): void {
   
  }
  delete(event:any,movie:any){
    this.movie=movie;
    this.isDeleteClicked = this.isDeleteClicked ? false : true;
    this.disableMainScroll()
  }
  deleteEvent(event:any){
    this.isDeleteClicked = this.isDeleteClicked ? false : true;
    if(event.delete){
      this.deleteReview(this.movie);
    }
    this.enableMainScroll()
  }
  disableMainScroll(){
    const body:any = document.querySelector("body");
    body.style.overflow = 'hidden'
  }
  enableMainScroll(){
    const body:any = document.querySelector("body");
    body.style.overflow = 'auto'
  }

  deleteReview(movie:any){
    let endpoint:string=apiDetails.getApigatWay()+apiDetails.review_ms_service_apis.deleteReviewByKey;
    endpoint = endpoint.replace("{key}",movie.key);

    const header=new HttpHeaders({
      "Authorization" : apiDetails.JWT_TOKEN,
      'Content-Type': 'application/json'
    })

    return new Promise((resolve,reject)=>{
      this.http.delete(endpoint,{headers:header}).subscribe(res=>{
        console.log(res);
        this.router.navigateByUrl("/").then(()=>{
          this.router.navigate(['/my-reviews']);
          console.log("refreshed....");
          
        })

        
      },err=>{
        console.log(err);
        
      })
    })

  }
}
