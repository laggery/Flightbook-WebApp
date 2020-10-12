import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AlertComponent } from './alert/alert.component';
import { ErrorComponent } from './error/error.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [AlertComponent, ErrorComponent],
  imports: [
    TranslateModule.forChild(),
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    AlertComponent,
    ErrorComponent
  ]
})
export class ApplicationComponentsModule { }
