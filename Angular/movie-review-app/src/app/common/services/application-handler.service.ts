import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationHandlerService {

  static data:any={}
  constructor() { }
  
  static set(key:string, value:any){
    this.data[key]=value;
  }
  
  static get(key:string){
    return ApplicationHandlerService.data[key];
  }
  
}
