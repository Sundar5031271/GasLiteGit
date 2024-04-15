import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ChannelComponent } from './channel/channel.component';
import { CaseComponent } from './case/case.component';
import { SearchOperationsComponent } from './search-operations/search-operations.component';


const routes: Routes = [
  {path:'', component: DashboardComponent, children: [
    { path: 'home', component: HomeComponent, children:[
      { path:'channel', component: ChannelComponent},
      { path:'case', component: CaseComponent},
      { path:'searchOperations', component: SearchOperationsComponent},
    ]},
    { path: '', redirectTo: '/home/channel', pathMatch: 'full'}
  ]}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashRoutingModule { }
