import { Component, OnInit } from '@angular/core';
import { Personne } from '../interfaces/personne';
import { PersonneService } from '../services/personne/personne.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteService } from '../services/site/site.service';
import { Site } from '../interfaces/site';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Personne',
  templateUrl: './Personne.component.html',
  styleUrls: ['./Personne.component.css']
})
export class PersonneComponent implements OnInit {

  libellePersonne: string = '';
  codePersonne: string = '';

  public Personnes: any[] = [];
  public PersonneID: number = 0;
  Personne: any={} ;
  listeSites!: Site[]; 

  // addPersonneFormGroup!: FormGroup;
  // editPersonneFormGroup!: FormGroup;

  constructor(
    private PersonneService: PersonneService,
    private router: Router,
    private fb: FormBuilder,
    private siteService: SiteService,
    private toastr: ToastrService
    ) { }

  //initialization of Personne add form as a Reactive-Form
  addPersonneFormGroup = this.fb.group({
    nomField: ['', Validators.required],
    prenomField: ['', Validators.required],
    emailField: ['', Validators.required],
    telephoneField: ['', Validators.required],
    matriculeField: ['', Validators.required],
    adresseField: ['', Validators.required]
  });

  editPersonneFormGroup = this.fb.group({
    nomField: ['', Validators.required],
    prenomField: ['', Validators.required],
    emailField: ['', Validators.required],
    telephoneField: ['', Validators.required],
    matriculeField: ['', Validators.required],
    adresseField: ['', Validators.required]
  });

  ngOnInit(): void {
    //Get list of Personnes
    this.handleGetAllPersonnes();
    //Get list of Sites
    this.siteService.getAllSites().subscribe((response)=>{this.listeSites = response;});
  }

  // Access formcontrols getter
  get nomField(){return this.editPersonneFormGroup.get('nomField');}
  get prenomField(){return this.editPersonneFormGroup.get('prenomField');}
  get emailField(){return this.editPersonneFormGroup.get('emailField');}
  get telephoneField(){return this.editPersonneFormGroup.get('telephoneField');}
  get matriculeField(){return this.editPersonneFormGroup.get('matriculeField');}
  get adresseField(){return this.editPersonneFormGroup.get('adresseField');}

  public handleGetAllPersonnes(){
    this.PersonneService.getAllPersonnes().subscribe({
      next: (value) => {
        this.Personnes = value;
      },
      error: (value)=>{
        console.log(value);
      }
    });
  }

  public getPersonne(PersonneId: number): void{
    this.PersonneID = PersonneId;
    this.PersonneService.getOnePersonne(PersonneId).subscribe((response)=>{
      this.editPersonneFormGroup.setValue(
        {
          nomField: response.nom,
          prenomField: response.prenom,
          emailField: response.email,
          telephoneField: response.telephone,
          matriculeField: response.matricule,
          adresseField: response.adresse
        }
      )
    });
  }

  public handleDeletePersonne(PersonneId: number): void{
    this.PersonneService.deletePersonne(PersonneId).subscribe({
      next: (value) => {
        this.Personnes = this.Personnes.filter(Personne => Personne.id !== PersonneId);
        this.showSuccess()
      },
      error: ()=>{this.showError()}
    });
  }

  public handleCreatePersonne(): void {
    //Creation of the Personne Object to persist
    this.Personne = {
      nom : this.addPersonneFormGroup.value.nomField,
      prenom: this.addPersonneFormGroup.value.prenomField,
      email: this.addPersonneFormGroup.value.emailField,
      telephone: this.addPersonneFormGroup.value.telephoneField,
      matricule: this.addPersonneFormGroup.value.matriculeField,
      adresse: this.addPersonneFormGroup.value.adresseField
    };    
    this.PersonneService.createPersonne(this.Personne).subscribe({
      next: (value)=>{
        //refresh the list of Personnes
        this.Personnes = [value].concat(this.Personnes);
        //reset form fields
        this.addPersonneFormGroup.reset();
        this.showSuccess()
      },
      error: ()=>{this.showError()}
    });
  }

  public handleUpdatePersonne(PersonneId:number): void {
    //Creation of the Personne Object to persist
    this.Personne = {
      nom : this.editPersonneFormGroup.value.nomField,
      prenom: this.editPersonneFormGroup.value.prenomField,
      email: this.editPersonneFormGroup.value.emailField,
      telephone: this.editPersonneFormGroup.value.telephoneField,
      matricule: this.editPersonneFormGroup.value.matriculeField,
      adresse: this.editPersonneFormGroup.value.adresseField
    };
    this.PersonneService.updatePersonne(PersonneId,this.Personne).subscribe({
      next: ()=>{
        //Update of the selected item
        this.Personnes.map((e) => {
          if(e.id == PersonneId){
            e.nom = this.Personne.nom;
            e.prenom = this.Personne.prenom;
            e.email = this.Personne.email;
            e.telephone = this.Personne.telephone;
            e.matricule = this.Personne.matricule;
            e.adresse = this.Personne.adresse;
          }
        },
        this.showSuccess()
        );
        //reset form fields
        this.editPersonneFormGroup.reset();
      },
      error: ()=>{this.showError()}
    });
  }

  showSuccess() {
    this.toastr.success("L'opération a réussi.", 'Succès !');
  }

  showError() {
    this.toastr.error("L'opération a échoué.",'Echec !');
  }

}
