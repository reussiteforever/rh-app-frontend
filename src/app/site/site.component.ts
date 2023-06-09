import { Component, OnInit } from '@angular/core';
import { Site } from '../interfaces/site';
import { SiteService } from '../services/site/site.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationClass } from '../services/notification';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  libelleSite: string = '';
  codeSite: string = '';

  public sites: Site[] = [];
  public siteID: number = 0;
  site: any={} ;

  // addSiteFormGroup!: FormGroup;
  // editSiteFormGroup!: FormGroup;

  constructor(
    private siteService: SiteService,
    private router: Router,
    private fb: FormBuilder,
    private notification: NotificationClass
    ) { }

  //initialization of Site add form as a Reactive-Form
  addSiteFormGroup = this.fb.group({
    codeSiteField: ['', Validators.required],
    libelleSiteField: ['', Validators.required]
  });
  editSiteFormGroup = this.fb.group({
    codeSiteField: ['', Validators.required],
    libelleSiteField: ['', Validators.required]
  });

  ngOnInit(): void {
    this.handleGetAllSites();
  }

  get codeSiteField(){return this.editSiteFormGroup.get('codeSiteField');}
  get libelleSiteField(){return this.editSiteFormGroup.get('libelleSiteField');}

  public handleGetAllSites(){
    this.siteService.getAllSites().subscribe({
      next: (value) => {
        this.sites = value;
      },
      error: (value)=>{
        console.log(value);
      }
    });
  }

  public getSite(siteId: number): void{
    this.siteID = siteId;
    this.siteService.getOneSite(siteId).subscribe((response)=>{
      this.editSiteFormGroup.setValue(
        {
          codeSiteField : response.codeSite,
          libelleSiteField: response.libelleSite
        }
      )
    });
  }

  public handleDeleteSite(siteId: number): void{
    this.siteService.deleteSite(siteId).subscribe({
      next: (value) => {
        this.sites = this.sites.filter(site => site.id !== siteId);
        this.notification.showSuccess();
      },
      error: ()=>{this.notification.showError();}
    });
  }

  public handleCreateSite(): void {
    //Creation of the Site Object to persist
    this.site = {
      codeSite : this.addSiteFormGroup.value.codeSiteField,
      libelleSite: this.addSiteFormGroup.value.libelleSiteField
    };
    this.siteService.createSite(this.site).subscribe({
      next: (value)=>{
        //refresh the list of sites
        this.sites = [value].concat(this.sites);
        //reset form fields
        this.addSiteFormGroup.reset();
        this.notification.showSuccess();
      },
      error: ()=>{this.notification.showError();}
    });
  }

  public handleUpdateSite(siteId:number): void {
    //Creation of the Site Object to persist
    this.site = {
      codeSite : this.editSiteFormGroup.value.codeSiteField,
      libelleSite: this.editSiteFormGroup.value.libelleSiteField
    };
    this.siteService.updateSite(siteId,this.site).subscribe({
      next: ()=>{
        //Update of the selected item
        this.sites.map((e) => {
          if(e.id == siteId){
            e.codeSite = this.site.codeSite;
            e.libelleSite = this.site.libelleSite;
          }
        });
        //reset form fields
        this.editSiteFormGroup.reset();
        this.notification.showSuccess();
      },
      error: ()=>{this.notification.showError();}
    });
  }
}
