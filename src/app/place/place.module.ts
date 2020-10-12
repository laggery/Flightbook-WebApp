import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlaceRoutingModule } from './place-routing.module';
import { PlaceComponent } from './place.component';
import { environment } from 'src/environments/environment';
import { PlaceModule as PlaceModuleLibrary} from 'flightbook-commons-library';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PlaceFormComponent } from './place-form/place-form.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [PlaceComponent, PlaceFormComponent],
  imports: [
    CommonModule,
    PlaceRoutingModule,
    TranslateModule.forChild(),
    PlaceModuleLibrary.forRoot(environment),
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class PlaceModule { }
