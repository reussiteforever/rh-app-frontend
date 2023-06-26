import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContratComponent } from './contrat/contrat.component';
import { StageComponent } from './stage/stage.component';
import { HttpClientModule } from '@angular/common/http';
import { SiteComponent } from './site/site.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartementComponent } from './departement/departement.component';
import { ServiceComponent } from './service/service.component';
import { FonctionComponent } from './fonction/fonction.component';
import { TypeStageComponent } from './typestage/typestage.component';
import { TypeContratComponent } from './typecontrat/typecontrat.component';
import { PersonneComponent } from './personne/personne.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    SidebarComponent,
    ContratComponent,
    StageComponent,
    SiteComponent,
    DepartementComponent,
    ServiceComponent,
    FonctionComponent,
    TypeStageComponent,
    TypeContratComponent,
    PersonneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
