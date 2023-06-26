import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContratComponent } from './contrat/contrat.component';
import { StageComponent } from './stage/stage.component';
import { SiteComponent } from './site/site.component';
import { DepartementComponent } from './departement/departement.component';
import { ServiceComponent } from './service/service.component';
import { FonctionComponent } from './fonction/fonction.component';
import { TypeStageComponent } from './typestage/typestage.component';
import { TypeContratComponent } from './typecontrat/typecontrat.component';
import { PersonneComponent } from './personne/personne.component';

const routes: Routes = [
  // {path:"", component:LoginComponent},
  {path:"", component:ContratComponent},
  {path:"dashboard", component:DashboardComponent},
  {path:"contrat", component:ContratComponent},
  {path:"stage", component:StageComponent},
  {path:"site", component:SiteComponent},
  {path:"departement", component:DepartementComponent},
  {path:"service", component:ServiceComponent},
  {path:"fonction", component:FonctionComponent},
  {path:"typestage", component:TypeStageComponent},
  {path:"typecontrat", component: TypeContratComponent},
  {path:"personne", component: PersonneComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
