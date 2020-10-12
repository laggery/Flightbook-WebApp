import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { NewsModule as NewsModuleLibrary, FlightModule as FlightModuleLibrary, ApplicationPipesModule} from 'flightbook-commons-library';
import { environment } from 'src/environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NewsComponent } from './news/news.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [DashboardComponent, NewsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    FlexLayoutModule,
    NewsModuleLibrary.forRoot(environment),
    FlightModuleLibrary.forRoot(environment),
    TranslateModule.forChild(),
    ApplicationPipesModule
  ]
})
export class DashboardModule { }
