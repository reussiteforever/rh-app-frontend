import { Component, OnInit } from '@angular/core';
import { Service } from '../interfaces/service';
import { ServiceService } from '../services/service/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departement } from '../interfaces/departement';
import { DepartementService } from '../services/departement/departement.service';
import { NotificationClass } from '../services/notification';

@Component({
  selector: 'app-Service',
  templateUrl: './Service.component.html',
  styleUrls: ['./Service.component.css']
})
export class ServiceComponent implements OnInit {

  libelleService: string = '';
  codeService: string = '';

  public services: any[] = [];
  public ServiceID: number = 0;
  service: any={} ;
  listeDepartements!: Departement[]; 

  // addServiceFormGroup!: FormGroup;
  // editServiceFormGroup!: FormGroup;

  constructor(
    private serviceService: ServiceService,
    private fb: FormBuilder,
    private departementService: DepartementService,
    private notification: NotificationClass
    ) { }

  //initialization of Service add form as a Reactive-Form
  addServiceFormGroup = this.fb.group({
    codeServiceField: ['', Validators.required],
    libelleServiceField: ['', Validators.required],
    departementField: ['', Validators.required]
  });

  editServiceFormGroup = this.fb.group({
    codeServiceField: ['', Validators.required],
    libelleServiceField: ['', Validators.required],
    departementField: ['', Validators.required]
  });

  ngOnInit(): void {
    //Get list of Departements
    this.departementService.getAllDepartements().subscribe((response)=>{this.listeDepartements = response;});
    //Get list of Services
    this.handleGetAllServices();
  }

  // Access formcontrols getter
  get codeServiceField(){return this.editServiceFormGroup.get('codeServiceField');}
  get libelleServiceField(){return this.editServiceFormGroup.get('libelleServiceField');}
  get departementField() {
    return this.addServiceFormGroup.get('departementField');
  }


  changeDepartement(e:any){
    this.departementField?.setValue(e.target.value, {
      onlySelf: true
    });
  }

  

  public handleGetAllServices(){
    this.serviceService.getAllServices().subscribe({
      next: (value) => {
        this.services = value;
      },
      error: (value)=>{
        console.log(value);
      }
    });
  }

  public getService(ServiceId: number): void{
    this.ServiceID = ServiceId;
    this.serviceService.getOneService(ServiceId).subscribe((response)=>{
      this.editServiceFormGroup.setValue(
        {
          codeServiceField : response.codeService,
          libelleServiceField: response.libelleService,
          departementField: response.DepartementId
        }
      )
    });
  }

  public handleDeleteService(ServiceId: number): void{
    this.serviceService.deleteService(ServiceId).subscribe({
      next: (value) => {
        this.services = this.services.filter(Service => Service.id !== ServiceId);
        this.notification.showSuccess();
      },
      error: ()=>{this.notification.showError();}
    });
  }

  public handleCreateService(): void {
    //Creation of the Service Object to persist
    this.service = {
      codeService : this.addServiceFormGroup.value.codeServiceField,
      libelleService: this.addServiceFormGroup.value.libelleServiceField,
      DepartementId: this.addServiceFormGroup.value.departementField
    };    
    this.serviceService.createService(this.service).subscribe({
      next: (value)=>{
        //refresh the list of Services
        this.services = [value].concat(this.services);
        //reset form fields
        this.addServiceFormGroup.reset();
        this.notification.showSuccess();
      },
      error: ()=>{this.notification.showError();}
    });
  }

  public handleUpdateService(serviceId:number): void {
    //Creation of the Service Object to persist
    this.service = {
      codeService : this.editServiceFormGroup.value.codeServiceField,
      libelleService: this.editServiceFormGroup.value.libelleServiceField,
      DepartementId: this.editServiceFormGroup.value.departementField
    };
    this.serviceService.updateService(serviceId,this.service).subscribe({
      next: ()=>{
        //Update of the selected item
        this.services.map((e) => {
          if(e.id == serviceId){
            e.codeService = this.service.codeService;
            e.libelleService = this.service.libelleService;
            e.DepartementId = this.service.DepartementId;
          }
        });
        //reset form fields
        this.editServiceFormGroup.reset();
        this.notification.showSuccess();
      },
      error: ()=>{this.notification.showError();}
    });
  }

}
