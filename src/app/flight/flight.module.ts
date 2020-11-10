import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightRoutingModule } from './flight-routing.module';
import { FlightFormComponent } from './flight-form/flight-form.component';
import { FlightFilterComponent } from './flight-filter/flight-filter.component';
import { FlightComponent } from './flight.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlightModule as FlightModuleLibrary, ApplicationPipesModule} from 'flightbook-commons-library';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { ApplicationComponentsModule } from '../application-components/application-components.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [FlightFormComponent, FlightFilterComponent, FlightComponent],
  imports: [
    CommonModule,
    FlightRoutingModule,
    TranslateModule.forChild(),
    FlightModuleLibrary.forRoot(environment),
    FormsModule,
    ApplicationComponentsModule,
    ApplicationPipesModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatPaginatorModule
  ]
})
export class FlightModule { }
