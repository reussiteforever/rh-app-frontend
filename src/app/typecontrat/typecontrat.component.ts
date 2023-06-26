import { Component, OnInit } from '@angular/core';
import { TypeContrat } from '../interfaces/typecontrat';
import { TypeContratService } from '../services/typecontrat/typecontrat.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-TypeContrat',
  templateUrl: './TypeContrat.component.html',
  styleUrls: ['./TypeContrat.component.css']
})
export class TypeContratComponent implements OnInit {

  libelleTypeContrat: string = '';
  codeTypeContrat: string = '';

  public TypeContrats: TypeContrat[] = [];
  public TypeContratID: number = 0;
  TypeContrat: any={} ;

  // addTypeContratFormGroup!: FormGroup;
  // editTypeContratFormGroup!: FormGroup;

  constructor(
    private TypeContratService: TypeContratService,
    private router: Router,
    private fb: FormBuilder
    ) { }

  //initialization of TypeContrat add form as a Reactive-Form
  addTypeContratFormGroup = this.fb.group({
    libelleTypeContratField: ['', Validators.required]
  });
  editTypeContratFormGroup = this.fb.group({
    libelleTypeContratField: ['', Validators.required]
  });

  ngOnInit(): void {
    this.handleGetAllTypeContrats();
  }

  get codeTypeContratField(){return this.editTypeContratFormGroup.get('codeTypeContratField');}
  get libelleTypeContratField(){return this.editTypeContratFormGroup.get('libelleTypeContratField');}

  public handleGetAllTypeContrats(){
    this.TypeContratService.getAllTypeContrats().subscribe({
      next: (value) => {
        this.TypeContrats = value;
      },
      error: (value)=>{
        console.log(value);
      }
    });
  }

  public getTypeContrat(TypeContratId: number): void{
    this.TypeContratID = TypeContratId;
    this.TypeContratService.getOneTypeContrat(TypeContratId).subscribe((response)=>{
      this.editTypeContratFormGroup.setValue(
        {
          libelleTypeContratField: response.libelleTypeContrat
        }
      )
    });
  }

  public handleDeleteTypeContrat(TypeContratId: number): void{
    this.TypeContratService.deleteTypeContrat(TypeContratId).subscribe({
      next: (value) => {
        this.TypeContrats = this.TypeContrats.filter(TypeContrat => TypeContrat.id !== TypeContratId);
        console.log("Suppression réussie !"+ value);
      }
    });
  }

  public handleCreateTypeContrat(): void {
    //Creation of the TypeContrat Object to persist
    this.TypeContrat = {
      libelleTypeContrat: this.addTypeContratFormGroup.value.libelleTypeContratField
    };
    this.TypeContratService.createTypeContrat(this.TypeContrat).subscribe({
      next: (value)=>{
        //refresh the list of TypeContrats
        this.TypeContrats = [value].concat(this.TypeContrats);
        console.log("Opération réussie!");
        //reset form fields
        this.addTypeContratFormGroup.reset();
      }
    });
  }

  public handleUpdateTypeContrat(TypeContratId:number): void {
    //Creation of the TypeContrat Object to persist
    this.TypeContrat = {
      libelleTypeContrat: this.editTypeContratFormGroup.value.libelleTypeContratField
    };
    this.TypeContratService.updateTypeContrat(TypeContratId,this.TypeContrat).subscribe({
      next: ()=>{
        //Update of the selected item
        this.TypeContrats.map((e) => {
          if(e.id == TypeContratId){
            e.libelleTypeContrat = this.TypeContrat.libelleTypeContrat;
          }
        });
        //refresh the list of TypeContrats
        console.log("Opération réussie!");
        //reset form fields
        this.editTypeContratFormGroup.reset();
      }
    });
  }
}
