import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApplicationHandlerService } from 'src/app/common/services/application-handler.service';
import { apiDetails } from 'src/environment/environment';

@Component({
  selector: 'app-movie-catalog',
  templateUrl: './movie-catalog.component.html',
  styleUrls: ['./movie-catalog.component.scss'],
})
export class MovieCatalogComponent implements OnInit {
  
  isFirstImg!:boolean;
  isLastImg!:boolean;
  index=0
  imgList = [
    'bb2_logo.jpg',
    'bb2_prabhas.jpg',
    'charan_angry_rr.jpeg',
    'cover-page.jpg',
    'kgf.jpg',
  ];
  baseURL: any = '../../../assets/images/';
  imgName:any;
  imgURL:any;
  userInfo:any;

  recentMovieList:any=[]
  isDataLoading!:boolean;

  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.imgName=this.imgList[this.index];
    this.imgURL = this.baseURL+this.imgName
   this.userInfo= ApplicationHandlerService.get("userDetails")
    this.getRecentMoviesOfUser(this.userInfo);
  }

  prevImage(){
    this.index -=1 
    this.imgName=this.imgList[this.index]
    if(this.imgList.indexOf(this.imgName)> -1){
      this.imgURL=this.baseURL+this.imgName
      this.isLastImg=false;
      if(this.index===0){
        this.isFirstImg=false
      }
    }else{
      return;
    }

  }
  nextImage() {
    this.isFirstImg=true;
    this.index +=1 
    this.imgName=this.imgList[this.index]
    if(this.imgList.indexOf(this.imgName)> -1){
      this.imgURL=this.baseURL+this.imgName
      if(this.index=== this.imgList.length-1){
        this.isLastImg=true
      }
      
    }else{
      return;
    }
  }
  getRecentMoviesOfUser(user:any){
    let endpoint:string=apiDetails.getApigatWay() + apiDetails.review_ms_service_apis.getReviewsByUserName
    const body ={
      "userName":String(user.userName),
    }
    return new Promise((resolve,reject)=>{
      this.http.post(endpoint,body).subscribe((res:any)=>{
        this.recentMovieList=res
        this.recentMovieList=this.recentMovieList.reverse()
        this.isDataLoading=true;
        ApplicationHandlerService.set("totalMovies",res.length)
        if(res.length>11){
          this.recentMovieList =this.recentMovieList.slice(-(this.recentMovieList.length-1/2) ,-1)

        }
        ApplicationHandlerService.set("userMoviesList",res)
        resolve(true)
        
      },
      err=>{
        this.isDataLoading=true;
        console.log(err);
        
      }
      )
    })
  }
}
