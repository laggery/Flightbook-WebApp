import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AlertComponent } from './alert/alert.component';



@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    AlertComponent
  ]
})
export class ApplicationComponentsModule { }
