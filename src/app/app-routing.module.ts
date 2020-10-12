import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'flightbook-commons-library';

const routes: Routes = [
  {
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full'
},
{
  path: 'dashboard',
  loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  canActivate: [AuthGuardService]
},
{
  path: 'places',
  loadChildren: () => import('./place/place.module').then(m => m.PlaceModule),
  canActivate: [AuthGuardService]
},
{
  path: 'login',
  loadChildren: () => import('./account/login/login.module').then(m => m.LoginModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
