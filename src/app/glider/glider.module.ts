import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GliderRoutingModule } from './glider-routing.module';
import { GliderComponent } from './glider.component';
import { GliderFormComponent } from './glider-form/glider-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { GliderModule as GliderModuleLibrary, ApplicationPipesModule} from 'flightbook-commons-library';
import { environment } from 'src/environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ApplicationComponentsModule } from '../application-components/application-components.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GliderFilterComponent } from './glider-filter/glider-filter.component';


@NgModule({
  declarations: [GliderComponent, GliderFormComponent, GliderFilterComponent],
  imports: [
    CommonModule,
    GliderRoutingModule,
    TranslateModule.forChild(),
    GliderModuleLibrary.forRoot(environment),
    FormsModule,
    ApplicationComponentsModule,
    ApplicationPipesModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule
  ]
})
export class GliderModule { }
