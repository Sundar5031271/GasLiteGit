import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
    {
    path: 'loginPage',
    component: LoginPageComponent,
    data: { title: 'loginPage' }
  },
  {
    path: 'home',
    loadChildren: () => import('./main/dash.module').then((m) => m.DashModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'loginPage',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
