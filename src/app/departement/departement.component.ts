import { Component, OnInit } from '@angular/core';
import { Departement } from '../interfaces/departement';
import { DepartementService } from '../services/departement/departement.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteService } from '../services/site/site.service';
import { Site } from '../interfaces/site';

@Component({
  selector: 'app-Departement',
  templateUrl: './Departement.component.html',
  styleUrls: ['./Departement.component.css']
})
export class DepartementComponent implements OnInit {

  libelleDepartement: string = '';
  codeDepartement: string = '';

  public departements: any[] = [];
  public departementID: number = 0;
  departement: any={} ;
  listeSites!: Site[]; 

  // addDepartementFormGroup!: FormGroup;
  // editDepartementFormGroup!: FormGroup;

  constructor(
    private departementService: DepartementService,
    private router: Router,
    private fb: FormBuilder,
    private siteService: SiteService
    ) { }

  //initialization of Departement add form as a Reactive-Form
  addDepartementFormGroup = this.fb.group({
    codeDepartementField: ['', Validators.required],
    libelleDepartementField: ['', Validators.required],
    siteField: ['', Validators.required]
  });

  editDepartementFormGroup = this.fb.group({
    codeDepartementField: ['', Validators.required],
    libelleDepartementField: ['', Validators.required],
    siteField: ['', Validators.required]
  });

  ngOnInit(): void {
    //Get list of Departements
    this.handleGetAllDepartements();
    //Get list of Sites
    this.siteService.getAllSites().subscribe((response)=>{this.listeSites = response;});
  }

  // Access formcontrols getter
  get codeDepartementField(){return this.editDepartementFormGroup.get('codeDepartementField');}
  get libelleDepartementField(){return this.editDepartementFormGroup.get('libelleDepartementField');}
  get siteField() {
    return this.addDepartementFormGroup.get('siteField');
  }


  changeSite(e:any){
    this.siteField?.setValue(e.target.value, {
      onlySelf: true
    });
  }

  

  public handleGetAllDepartements(){
    this.departementService.getAllDepartements().subscribe({
      next: (value) => {
        this.departements = value;
      },
      error: (value)=>{
        console.log(value);
      }
    });
  }

  public getDepartement(departementId: number): void{
    this.departementID = departementId;
    this.departementService.getOneDepartement(departementId).subscribe((response)=>{
      this.editDepartementFormGroup.setValue(
        {
          codeDepartementField : response.codeDepartement,
          libelleDepartementField: response.libelleDepartement,
          siteField: response.SiteId
        }
      )
    });
  }

  public handleDeleteDepartement(DepartementId: number): void{
    this.departementService.deleteDepartement(DepartementId).subscribe({
      next: (value) => {
        this.departements = this.departements.filter(Departement => Departement.id !== DepartementId);
        console.log("Suppression réussie !"+ value);
      }
    });
  }

  public handleCreateDepartement(): void {
    //Creation of the Departement Object to persist
    this.departement = {
      codeDepartement : this.addDepartementFormGroup.value.codeDepartementField,
      libelleDepartement: this.addDepartementFormGroup.value.libelleDepartementField,
      SiteId: this.addDepartementFormGroup.value.siteField
    };    
    this.departementService.createDepartement(this.departement).subscribe({
      next: (value)=>{
        //refresh the list of departements
        this.departements = [value].concat(this.departements);
        console.log("Opération réussie!");
        //reset form fields
        this.addDepartementFormGroup.reset();
      }
    });
  }

  public handleUpdateDepartement(departementId:number): void {
    //Creation of the Departement Object to persist
    this.departement = {
      codeDepartement : this.editDepartementFormGroup.value.codeDepartementField,
      libelleDepartement: this.editDepartementFormGroup.value.libelleDepartementField,
      SiteId: this.editDepartementFormGroup.value.siteField
    };
    this.departementService.updateDepartement(departementId,this.departement).subscribe({
      next: ()=>{
        //Update of the selected item
        this.departements.map((e) => {
          if(e.id == departementId){
            e.codeDepartement = this.departement.codeDepartement;
            e.libelleDepartement = this.departement.libelleDepartement;
            e.SiteId = this.departement.SiteId;
          }
        });
        //refresh the list of departements
        console.log("Opération réussie!");
        //reset form fields
        this.editDepartementFormGroup.reset();
      }
    });
  }

}
