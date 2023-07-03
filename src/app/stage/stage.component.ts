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
  listeFonction: Fonction[] = [];
  listeTypeStage: TypeStage[] = [];

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
              private typestageService: TypeStageService) 
    { }

  ngOnInit(): void {
    //Get list of Stages
    this.handleGetAllStages();
    //Get list of Services
    this.serviceService.getAllServices().subscribe((response) => { this.listeServices = response; });
    //Get list of Personnes
    this.serviceService.getAllServices().subscribe((response) => { this.listeServices = response; });
    //Get list of Type de Stage
    this.personneService.getAllPersonnes().subscribe((response) => { this.listePersonnes = response; });
    //Get list of fonctions
    this.fonctionService.getAllFonctions().subscribe((response) => { this.listeFonction = response; });
  }

  // Access formcontrols getter
  get codeStageField(){return this.editStageFormGroup.get('codeStageField');}
  get libelleStageField(){return this.editStageFormGroup.get('libelleStageField');}
  get siteField() {
    return this.addStageFormGroup.get('siteField');
  }


  changeSite(e:any){
    this.siteField?.setValue(e.target.value, {
      onlySelf: true
    });
  }

  

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
          dateDebutField: response.dateDebut,
          dateFinField: response.dateFin,
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
      codeStage : this.addStageFormGroup.value.codeStageField,
      libelleStage: this.addStageFormGroup.value.libelleStageField,
      SiteId: this.addStageFormGroup.value.siteField
    };    
    this.stageService.createStage(this.Stage).subscribe({
      next: (value)=>{
        //refresh the list of Stages
        this.Stages = [value].concat(this.Stages);
        console.log("Opération réussie!");
        //reset form fields
        this.addStageFormGroup.reset();
      }
    });
  }

  public handleUpdateStage(StageId:number): void {
    //Creation of the Stage Object to persist
    this.Stage = {
      codeStage : this.editStageFormGroup.value.codeStageField,
      libelleStage: this.editStageFormGroup.value.libelleStageField,
      SiteId: this.editStageFormGroup.value.siteField
    };
    this.stageService.updateStage(StageId,this.Stage).subscribe({
      next: ()=>{
        //Update of the selected item
        this.Stages.map((e) => {
          if(e.id == StageId){
            e.codeStage = this.Stage.codeStage;
            e.libelleStage = this.Stage.libelleStage;
            e.SiteId = this.Stage.SiteId;
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
