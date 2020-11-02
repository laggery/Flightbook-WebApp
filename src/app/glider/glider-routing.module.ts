import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GliderComponent } from './glider.component';

const routes: Routes = [
  {
    path: '',
    component: GliderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GliderRoutingModule { }
