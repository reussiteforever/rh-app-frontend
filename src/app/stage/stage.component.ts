import { Component, OnInit } from '@angular/core';
import { StageService } from '../services/stage/stage.service';
import { Stage } from '../interfaces/stage';
import { ServiceService } from '../services/service/service.service';
import { Service } from '../interfaces/service';
import { PersonneService } from '../services/personne/personne.service';
import { FonctionService } from '../services/fonction/fonction.service';
import { TypeStageService } from '../services/typestage/typestage.service';
import { Personne } from '../interfaces/personne';
import { Fonction } from '../interfaces/fonction';
import { TypeStage } from '../interfaces/typestage';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationClass } from '../services/notification';
import { TempusDominus } from '@eonasdan/tempus-dominus';


@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  public Stages: any[] = [];
  public StageID: number = 0;
  Stage: any={} ;

  stages: Stage[] = [];
  listeServices: Service[] = [];
  listePersonnes: Personne[] = [];
  listeFonctions: Fonction[] = [];
  listeTypeStage: TypeStage[] = [];

  dateDebut = document.getElementsByClassName("datetimepicker");

  //initialization of Stage add form as a Reactive-Form
  addStageFormGroup = this.fb.group({
    dateDebutField: ['', Validators.required],
    dateFinField: ['', Validators.required],
    responsableStageField: ['', Validators.required],
    typeStageField: ['', Validators.required],
    fonctionField: ['', Validators.required],
    serviceField: ['', Validators.required],
    personneField: ['', Validators.required]
  });

  editStageFormGroup = this.fb.group({
    dateDebutField: ['', Validators.required],
    dateFinField: ['', Validators.required],
    responsableStageField: ['', Validators.required],
    typeStageField: ['', Validators.required],
    fonctionField: ['', Validators.required],
    serviceField: ['', Validators.required],
    personneField: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private stageService: StageService,
              private serviceService: ServiceService,
              private personneService: PersonneService,
              private fonctionService: FonctionService,
              private typestageService: TypeStageService,
              private notification: NotificationClass) 
    { }

  ngOnInit(): void {
    //Get list of Stages
    this.handleGetAllStages();
    //Get list of Services
    this.serviceService.getAllServices().subscribe((response) => { this.listeServices = response; });
    //Get list of Personnes
    this.typestageService.getAllTypeStages().subscribe((response) => { this.listeTypeStage = response; });
    //Get list of Type de Stage
    this.personneService.getAllPersonnes().subscribe((response) => { this.listePersonnes = response; });
    //Get list of fonctions
    this.fonctionService.getAllFonctions().subscribe((response) => { this.listeFonctions = response; });
  }


  // Access formcontrols getter
  get dateDebutField(){return this.addStageFormGroup.get('dateDebutField');}
  get dateFinField(){return this.addStageFormGroup.get('dateFinField');}
  get responsableStageField(){return this.addStageFormGroup.get('responsableStageField');}
  get typeStageField(){return this.addStageFormGroup.get('typeStageField');}
  get fonctionField(){return this.editStageFormGroup.get('fonctionField');}
  get serviceField(){return this.editStageFormGroup.get('serviceField');}
  get personneField(){return this.addStageFormGroup.get('personneField');}


  changeFonction(e:any){this.fonctionField?.setValue(e.target.value, {onlySelf: true});console.log("Fonction :"+ e.target.value);}
  changeService(e:any){this.serviceField?.setValue(e.target.value, {onlySelf: true});}
  changePersonne(e:any){this.personneField?.setValue(e.target.value, {onlySelf: true});}
  changeTypeStage(e:any){this.typeStageField?.setValue(e.target.value, {onlySelf: true});console.log("date début :"+ e);}
  changeDateDebut(e:any){this.dateDebutField?.setValue(e.target.value, {onlySelf: true}); console.log("date fin :"+e);
  }
  changeDateFin(e:any){this.dateFinField?.setValue(e.target.value, {onlySelf: true});}

  

  public handleGetAllStages(){
    this.stageService.getAllStages().subscribe({
      next: (value) => {
        this.Stages = value;
      },
      error: (value)=>{
        console.log(value);
      }
    });
  }

  public getStage(StageId: number): void{
    this.StageID = StageId;
    this.stageService.getOneStage(StageId).subscribe((response)=>{
      this.editStageFormGroup.setValue(
        {
          dateDebutField: response.dateDebut.toString(),
          dateFinField: response.dateFin.toString(),
          responsableStageField: response.responsableStage,
          typeStageField: response.TypeStageId,
          fonctionField: response.FonctionId,
          serviceField: response.ServiceId,
          personneField: response.PersonneId
        }
      )
    });
  }

  public handleDeleteStage(StageId: number): void{
    this.stageService.deleteStage(StageId).subscribe({
      next: (value) => {
        this.Stages = this.Stages.filter(Stage => Stage.id !== StageId);
        console.log("Suppression réussie !"+ value);
      }
    });
  }

  public handleCreateStage(): void {
    //Creation of the Stage Object to persist
    this.Stage = {
      dateDebut: this.addStageFormGroup.value.dateDebutField,
      dateFin: this.addStageFormGroup.value.dateFinField,
      responsableStage: this.addStageFormGroup.value.responsableStageField,
      typeStageId: this.addStageFormGroup.value.typeStageField,
      fonctionId: this.addStageFormGroup.value.fonctionField,
      serviceId: this.addStageFormGroup.value.serviceField,
      personneId: this.addStageFormGroup.value.personneField
    };    
    console.log(this.addStageFormGroup.value);
    console.log(this.Stage.dateFin.value);
    // this.stageService.createStage(this.Stage).subscribe({
    //   next: (value)=>{
    //     //refresh the list of Stages
    //     this.Stages = [value].concat(this.Stages);
    //     console.log("Opération réussie!");
    //     //reset form fields
    //     this.addStageFormGroup.reset();
    //   },
    //   error: (e) => { console.log(e);
    //     console.log(this.addStageFormGroup.value);
    //     console.log(this.Stage.dateFin.value);
        
    //   }
    // });
  }

  public handleUpdateStage(StageId:number): void {
    //Creation of the Stage Object to persist
    this.Stage = {
      dateDebut: this.editStageFormGroup.value.dateDebutField,
      dateFin: this.editStageFormGroup.value.dateFinField,
      responsableStage: this.editStageFormGroup.value.responsableStageField,
      typeStageId: this.editStageFormGroup.value.typeStageField,
      fonctionId: this.editStageFormGroup.value.fonctionField,
      serviceId: this.editStageFormGroup.value.serviceField,
      personneId: this.editStageFormGroup.value.personneField
    };
    this.stageService.updateStage(StageId,this.Stage).subscribe({
      next: ()=>{
        //Update of the selected item
        this.Stages.map((e) => {
          if(e.id == StageId){
            e.dateDebut = this.Stage.dateDebut;
            e.dateFin = this.Stage.dateFin;
            e.responsableStage = this.Stage.responsableStage;
            e.typeStageId = this.Stage.typeStageId;
            e.fonctionId = this.Stage.fonctionId;
            e.serviceId = this.Stage.serviceId;
            e.personneId = this.Stage.personneId;
          }
        });
        //refresh the list of Stages
        console.log("Opération réussie!");
        //reset form fields
        this.editStageFormGroup.reset();
      }
    });
  }

}
