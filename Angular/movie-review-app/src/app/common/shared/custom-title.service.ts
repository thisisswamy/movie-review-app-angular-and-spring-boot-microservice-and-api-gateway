import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomTitleService extends TitleStrategy{
  
  
  override updateTitle(snapshot: RouterStateSnapshot): void {
    let routeTitle = snapshot.root.children.map(t=>t.routeConfig?.path as string)[0]
    if(routeTitle){
      const titlePattern = routeTitle.at(0)?.toUpperCase() + routeTitle.slice(1);
      this.title.setTitle(titlePattern)
    }else{
      this.title.setTitle("Review App")
    }
    
  }

  constructor(private title:Title){
    super()
  }
  
 

 
  
}
