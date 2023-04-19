import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, ActivationStart, NavigationEnd, NavigationStart, Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { filter, map, pairwise } from 'rxjs';
import { DataConstants } from '../../services/Error-handler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  isMenuOpen!:boolean;
  isMenuItemsOpen!:boolean
  reloadRoutes =DataConstants.reloadRoutes

  constructor(private dataService:DataService, private router:Router,private activeRoute:ActivatedRoute, private http:HttpClient){
    
  }

  ngOnInit(): void {
    this.dataService.menuOpenClose.subscribe(data=>{
      this.isMenuOpen=data;
    })
  }
  menuEvent(){
    this.isMenuOpen = this.isMenuOpen ? false :true
  }

}
