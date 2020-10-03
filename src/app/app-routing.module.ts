import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'flightbook-commons-library';

const routes: Routes = [
  {
  path: '',
  redirectTo: 'news',
  pathMatch: 'full'
},
{
  path: 'news',
  loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
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
