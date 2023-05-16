import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContratComponent } from './contrat/contrat.component';
import { StageComponent } from './stage/stage.component';

const routes: Routes = [
  // {path:"", component:LoginComponent},
  {path:"", component:ContratComponent},
  {path:"dashboard", component:DashboardComponent},
  {path:"contrat", component:ContratComponent},
  {path:"stage", component:StageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
