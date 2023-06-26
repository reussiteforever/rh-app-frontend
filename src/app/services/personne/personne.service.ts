import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personne } from 'src/app/interfaces/personne';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class PersonneService {
  private personneUrl = 'http://localhost:3000/api/personne';  // URL to backend api

  constructor(private http: HttpClient) { }
  
  /**
   * 
   * @returns La liste de tous les personnes
   */
  public getAllPersonnes(): Observable<Personne[]>{
    return this.http.get<Personne[]>(this.personneUrl);
  }

  /**
   * 
   * @returns Récupérer une personne
   */
  public getOnePersonne(id:number): Observable<Personne>{
    return this.http.get<Personne>(this.personneUrl+`/${id}`);
  }

  /**
   * @returns Supprimer un personne
   */
  public deletePersonne(id:number): Observable<any>{
    return this.http.patch(this.personneUrl+`/${id}/state/0`,{});
  }

  /**
   * @returns Création d'un nouveau personne
   */
  public createPersonne(personne: Personne): Observable<Personne>{
    return this.http.post<Personne>(
      this.personneUrl,
      personne,
      httpOptions
    );
  }

  /**
   * @returns Mettre à jour un nouveau personne
   */
  public updatePersonne(id:number,personne:Personne): Observable<Personne>{
    return this.http.patch<Personne>(
      this.personneUrl+`/${id}`,
      personne,
      httpOptions
    );
  }


}
