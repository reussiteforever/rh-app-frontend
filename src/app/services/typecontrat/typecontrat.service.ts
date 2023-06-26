import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeContrat } from 'src/app/interfaces/typecontrat';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class TypeContratService {
  private TypeContratUrl = 'http://localhost:3000/api/TypeContrat';  // URL to backend api

  constructor(private http: HttpClient) { }
  
  /**
   * 
   * @returns La liste de tous les TypeContrats
   */
  public getAllTypeContrats(): Observable<TypeContrat[]>{
    return this.http.get<TypeContrat[]>(this.TypeContratUrl);
  }

  /**
   * 
   * @returns Récupérer un TypeContrat
   */
  public getOneTypeContrat(id:number): Observable<TypeContrat>{
    return this.http.get<TypeContrat>(this.TypeContratUrl+`/${id}`);
  }

  /**
   * @returns Supprimer un TypeContrat
   */
  public deleteTypeContrat(id:number): Observable<any>{
    return this.http.patch(this.TypeContratUrl+`/${id}/state/0`,{});
  }

  /**
   * @returns Création d'un nouveau TypeContrat
   */
  public createTypeContrat(TypeContrat: TypeContrat): Observable<TypeContrat>{
    return this.http.post<TypeContrat>(
      this.TypeContratUrl,
      TypeContrat,
      httpOptions
    );
  }

  /**
   * @returns Mettre à jour un nouveau TypeContrat
   */
  public updateTypeContrat(id:number,TypeContrat:TypeContrat): Observable<TypeContrat>{
    return this.http.patch<TypeContrat>(
      this.TypeContratUrl+`/${id}`,
      TypeContrat,
      httpOptions
    );
  }


}
