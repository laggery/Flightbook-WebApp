import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { environment } from 'src/environments/environment';
import { NewsModule as NewsModuleLibrary} from 'flightbook-commons-library';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    NewsModuleLibrary.forRoot(environment),
    TranslateModule.forChild()
  ]
})
export class NewsModule { }
