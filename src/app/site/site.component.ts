import { Component, OnInit } from '@angular/core';
import { Site } from '../interfaces/site';
import { SiteService } from '../services/site/site.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  addSiteFormGroup!: FormGroup;
  editSiteFormGroup!: FormGroup;

  constructor(
    private siteService: SiteService,
    private router: Router,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    //initialization of Site add form as a Reactive-Form
    this.addSiteFormGroup = this.fb.group({
      codeSiteField: ['', Validators.required],
      libelleSiteField: ['', Validators.required]
    });
    this.editSiteFormGroup = this.fb.group({
      codeSiteField: ['', Validators.required],
      libelleSiteField: ['', Validators.required]
    });
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

  public getSiteId(siteId: number): void{
    this.siteID = siteId;
  }

  public handleDeleteSite(siteId: number): void{
    this.siteService.deleteSite(siteId).subscribe({
      next: (value) => {
        this.sites = this.sites.filter(site => site.id !== siteId);
        console.log("Suppression réussie !"+ value);
      }
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
        console.log("Opération réussie!");
        //reset form fields
        this.addSiteFormGroup.reset();
      }
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
        //refresh the list of sites
        console.log("Opération réussie!");
        //reset form fields
        this.editSiteFormGroup.reset();
      }
    });
  }
}
