import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

import { ToastrModule } from 'ngx-toastr';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


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
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
