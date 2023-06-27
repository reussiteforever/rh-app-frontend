import { Component, OnInit } from '@angular/core';
import { Fonction } from '../interfaces/fonction';
import { FonctionService } from '../services/fonction/fonction.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationClass } from '../services/notification';

@Component({
  selector: 'app-Fonction',
  templateUrl: './Fonction.component.html',
  styleUrls: ['./Fonction.component.css']
})
export class FonctionComponent implements OnInit {

  libelleFonction: string = '';
  codeFonction: string = '';

  public Fonctions: Fonction[] = [];
  public FonctionID: number = 0;
  Fonction: any={} ;

  // addFonctionFormGroup!: FormGroup;
  // editFonctionFormGroup!: FormGroup;

  constructor(
    private FonctionService: FonctionService,
    private router: Router,
    private fb: FormBuilder,
    private notification: NotificationClass
    ) { }

  //initialization of Fonction add form as a Reactive-Form
  addFonctionFormGroup = this.fb.group({
    codeFonctionField: ['', Validators.required],
    libelleFonctionField: ['', Validators.required]
  });
  editFonctionFormGroup = this.fb.group({
    codeFonctionField: ['', Validators.required],
    libelleFonctionField: ['', Validators.required]
  });

  ngOnInit(): void {
    this.handleGetAllFonctions();
  }

  get codeFonctionField(){return this.editFonctionFormGroup.get('codeFonctionField');}
  get libelleFonctionField(){return this.editFonctionFormGroup.get('libelleFonctionField');}

  public handleGetAllFonctions(){
    this.FonctionService.getAllFonctions().subscribe({
      next: (value) => {
        this.Fonctions = value;
      },
      error: (value)=>{
        console.log(value);
      }
    });
  }

  public getFonction(FonctionId: number): void{
    this.FonctionID = FonctionId;
    this.FonctionService.getOneFonction(FonctionId).subscribe((response)=>{
      this.editFonctionFormGroup.setValue(
        {
          codeFonctionField : response.codeFonction,
          libelleFonctionField: response.libelleFonction
        }
      )
    });
  }

  public handleDeleteFonction(FonctionId: number): void{
    this.FonctionService.deleteFonction(FonctionId).subscribe({
      next: (value) => {
        this.Fonctions = this.Fonctions.filter(Fonction => Fonction.id !== FonctionId);
        this.notification.showSuccess();
      },
      error: ()=>{this.notification.showError();}
    });
  }

  public handleCreateFonction(): void {
    //Creation of the Fonction Object to persist
    this.Fonction = {
      codeFonction : this.addFonctionFormGroup.value.codeFonctionField,
      libelleFonction: this.addFonctionFormGroup.value.libelleFonctionField
    };
    this.FonctionService.createFonction(this.Fonction).subscribe({
      next: (value)=>{
        //refresh the list of Fonctions
        this.Fonctions = [value].concat(this.Fonctions);
        //reset form fields
        this.addFonctionFormGroup.reset();
        this.notification.showSuccess();
      },
      error: ()=>{this.notification.showError();}
    });
  }

  public handleUpdateFonction(FonctionId:number): void {
    //Creation of the Fonction Object to persist
    this.Fonction = {
      codeFonction : this.editFonctionFormGroup.value.codeFonctionField,
      libelleFonction: this.editFonctionFormGroup.value.libelleFonctionField
    };
    this.FonctionService.updateFonction(FonctionId,this.Fonction).subscribe({
      next: ()=>{
        //Update of the selected item
        this.Fonctions.map((e) => {
          if(e.id == FonctionId){
            e.codeFonction = this.Fonction.codeFonction;
            e.libelleFonction = this.Fonction.libelleFonction;
          }
        });
        //reset form fields
        this.editFonctionFormGroup.reset();
        this.notification.showSuccess();
      },
      error: ()=>{this.notification.showError();}
    });
  }
}
