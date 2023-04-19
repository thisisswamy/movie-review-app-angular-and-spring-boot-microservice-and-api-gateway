import { Component, OnInit } from '@angular/core';
import { apiDetails } from 'src/environment/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  ngOnInit(): void {
    console.log("token ::>> "+ apiDetails.JWT_TOKEN);
    
  }

  login(){
    console.log("clicked,,");
    
  }

}
