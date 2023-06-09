import { Component, OnInit } from '@angular/core';
import { TypeStage } from '../interfaces/typestage';
import { TypeStageService } from '../services/typestage/typestage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationClass } from '../services/notification';

@Component({
  selector: 'app-TypeStage',
  templateUrl: './TypeStage.component.html',
  styleUrls: ['./TypeStage.component.css']
})
export class TypeStageComponent implements OnInit {

  libelleTypeStage: string = '';
  codeTypeStage: string = '';

  public TypeStages: TypeStage[] = [];
  public TypeStageID: number = 0;
  TypeStage: any={} ;

  // addTypeStageFormGroup!: FormGroup;
  // editTypeStageFormGroup!: FormGroup;

  constructor(
    private TypeStageService: TypeStageService,
    private fb: FormBuilder,
    private notification: NotificationClass
    ) { }

  //initialization of TypeStage add form as a Reactive-Form
  addTypeStageFormGroup = this.fb.group({
    libelleTypeStageField: ['', Validators.required]
  });
  editTypeStageFormGroup = this.fb.group({
    libelleTypeStageField: ['', Validators.required]
  });

  ngOnInit(): void {
    this.handleGetAllTypeStages();
  }

  get codeTypeStageField(){return this.editTypeStageFormGroup.get('codeTypeStageField');}
  get libelleTypeStageField(){return this.editTypeStageFormGroup.get('libelleTypeStageField');}

  public handleGetAllTypeStages(){
    this.TypeStageService.getAllTypeStages().subscribe({
      next: (value) => {
        this.TypeStages = value;
      },
      error: (value)=>{
        console.log(value);
      }
    });
  }

  public getTypeStage(TypeStageId: number): void{
    this.TypeStageID = TypeStageId;
    this.TypeStageService.getOneTypeStage(TypeStageId).subscribe((response)=>{
      this.editTypeStageFormGroup.setValue(
        {
          libelleTypeStageField: response.libelleTypeStage
        }
      )
    });
  }

  public handleDeleteTypeStage(TypeStageId: number): void{
    this.TypeStageService.deleteTypeStage(TypeStageId).subscribe({
      next: (value) => {
        this.TypeStages = this.TypeStages.filter(TypeStage => TypeStage.id !== TypeStageId);
        this.notification.showSuccess();
      },
      error: ()=>{this.notification.showError();}
    });
  }

  public handleCreateTypeStage(): void {
    //Creation of the TypeStage Object to persist
    this.TypeStage = {
      libelleTypeStage: this.addTypeStageFormGroup.value.libelleTypeStageField
    };
    this.TypeStageService.createTypeStage(this.TypeStage).subscribe({
      next: (value)=>{
        //refresh the list of TypeStages
        this.TypeStages = [value].concat(this.TypeStages);
        //reset form fields
        this.addTypeStageFormGroup.reset();
        this.notification.showSuccess();
      },
      error: ()=>{this.notification.showError();}
    });
  }

  public handleUpdateTypeStage(TypeStageId:number): void {
    //Creation of the TypeStage Object to persist
    this.TypeStage = {
      libelleTypeStage: this.editTypeStageFormGroup.value.libelleTypeStageField
    };
    this.TypeStageService.updateTypeStage(TypeStageId,this.TypeStage).subscribe({
      next: ()=>{
        //Update of the selected item
        this.TypeStages.map((e) => {
          if(e.id == TypeStageId){
            e.libelleTypeStage = this.TypeStage.libelleTypeStage;
          }
        });
        //reset form fields
        this.editTypeStageFormGroup.reset();
        this.notification.showSuccess();
      },
      error: ()=>{this.notification.showError();}
    });
  }
}
