import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

    menuOpenClose =new BehaviorSubject<boolean>(false)

  constructor(private sanitizer:DomSanitizer) { }

  createImageURL(review:any){
   const imageBlob =this.dataURIToBlob(review?.reviewFormImage?.imageBytes, review?.reviewFormImage?.imageType);
   const imageFile=new File([imageBlob],review.reviewFormImage.imageName,{type:review.reviewFormImage.imageType})
   const finalImageUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile));
   review.reviewFormImage.imageBytes = finalImageUrl
   return review;
  }
  createSafePosterURL(review:any){
   const finalImageUrl = this.sanitizer.bypassSecurityTrustUrl(review.posterURL);
   review.posterURL= finalImageUrl
   return review;
  }

  dataURIToBlob(imageBytes:any,imageType:any){
    const byteString=window.atob(imageBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length)
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i=0;i<byteString.length ; i++){
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob =new Blob([int8Array],{type:imageType});
    return blob;


  }


}
