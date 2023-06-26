import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeStage } from 'src/app/interfaces/typestage';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class TypeStageService {
  private TypeStageUrl = 'http://localhost:3000/api/TypeStage';  // URL to backend api

  constructor(private http: HttpClient) { }
  
  /**
   * 
   * @returns La liste de tous les TypeStages
   */
  public getAllTypeStages(): Observable<TypeStage[]>{
    return this.http.get<TypeStage[]>(this.TypeStageUrl);
  }

  /**
   * 
   * @returns Récupérer un TypeStage
   */
  public getOneTypeStage(id:number): Observable<TypeStage>{
    return this.http.get<TypeStage>(this.TypeStageUrl+`/${id}`);
  }

  /**
   * @returns Supprimer un TypeStage
   */
  public deleteTypeStage(id:number): Observable<any>{
    return this.http.patch(this.TypeStageUrl+`/${id}/state/0`,{});
  }

  /**
   * @returns Création d'un nouveau TypeStage
   */
  public createTypeStage(TypeStage: TypeStage): Observable<TypeStage>{
    return this.http.post<TypeStage>(
      this.TypeStageUrl,
      TypeStage,
      httpOptions
    );
  }

  /**
   * @returns Mettre à jour un nouveau TypeStage
   */
  public updateTypeStage(id:number,TypeStage:TypeStage): Observable<TypeStage>{
    return this.http.patch<TypeStage>(
      this.TypeStageUrl+`/${id}`,
      TypeStage,
      httpOptions
    );
  }


}
