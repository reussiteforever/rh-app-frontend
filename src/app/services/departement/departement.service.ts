import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departement } from 'src/app/interfaces/departement';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private departementUrl = 'http://localhost:3000/api/departement';  // URL to backend api

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns La liste de tous les departements
   */
  public getOneDepartement(id:number): Observable<Departement>{
    return this.http.get<Departement>(this.departementUrl+`/${id}`);
  }
  
  /**
   * 
   * @returns La liste de tous les departements
   */
  public getAllDepartements(): Observable<Departement[]>{
    return this.http.get<Departement[]>(this.departementUrl);
  }

  /**
   * @returns Supprimer un departement
   */
  public deleteDepartement(id:number): Observable<any>{
    return this.http.patch(this.departementUrl+`/${id}/state/0`,{});
  }

  /**
   * @returns Création d'un nouveau departement
   */
  public createDepartement(departement: Departement): Observable<Departement>{
    return this.http.post<Departement>(
      this.departementUrl,
      departement,
      httpOptions
    );
  }

  /**
   * @returns Mettre à jour un nouveau departement
   */
  public updateDepartement(id:number,departement:Departement): Observable<Departement>{
    return this.http.patch<Departement>(
      this.departementUrl+`/${id}`,
      departement,
      httpOptions
    );
  }


}
