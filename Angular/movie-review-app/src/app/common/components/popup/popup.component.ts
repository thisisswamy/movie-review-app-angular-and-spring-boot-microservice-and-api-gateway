import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {

  @Output()
  deletePopup =new EventEmitter()

  delete(){
    console.log("yes delete");
    this.deletePopup.emit({
      delete:true
    })
    
  }
  cancel(){
    console.log("cancel delete");
    this.deletePopup.emit({
      delete:false
    })
  }
}
