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
  public getAllDepartements(): Observable<Departement[]>{
    return this.http.get<Departement[]>(this.departementUrl);
  }

  /**
   * @returns Supprimer un departement
   */
  public deleteDepartement(id:number): Observable<any>{
    return this.http.patch(`http://localhost:3000/api/departement/${id}/state/0`,{});
  }

  /**
   * @returns Création d'un nouveau departement
   */
  public createDepartement(departement: Departement): Observable<Departement>{
    return this.http.post<Departement>(
      'http://localhost:3000/api/departement',
      departement,
      httpOptions
    );
  }

  /**
   * @returns Mettre à jour un nouveau departement
   */
  public updatedepartement(id:number,departement:Departement): Observable<Departement>{
    return this.http.patch<Departement>(
      `http://localhost:3000/api/departement/${id}`,
      departement,
      httpOptions
    );
  }


}
