import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PopupComponent } from '../components/popup/popup.component';
import { SpinnerComponent } from '../components/spinner/spinner.component';

const materialImports:any[]=[MatIconModule,MatInputModule,MatFormFieldModule,MatTooltipModule]


@NgModule({
  declarations: [PopupComponent,SpinnerComponent],
  imports: [CommonModule,materialImports],
  exports:[materialImports,PopupComponent,SpinnerComponent]
})
export class SharedModule { }
