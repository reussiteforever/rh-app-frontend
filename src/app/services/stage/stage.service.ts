import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stage } from 'src/app/interfaces/stage';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class StageService {
  private StageUrl = 'http://localhost:3000/api/stage';  // URL to backend api

  constructor(private http: HttpClient) { }
  
  /**
   * 
   * @returns La liste de tous les Stages
   */
  public getAllStages(): Observable<Stage[]>{
    return this.http.get<Stage[]>(this.StageUrl);
  }

  /**
   * 
   * @returns Récupérer un Stage
   */
  public getOneStage(id:number): Observable<Stage>{
    return this.http.get<Stage>(this.StageUrl+`/${id}`);
  }

  /**
   * @returns Supprimer un Stage
   */
  public deleteStage(id:number): Observable<any>{
    return this.http.patch(this.StageUrl+`/${id}/state/0`,{});
  }

  /**
   * @returns Création d'un nouveau Stage
   */
  public createStage(Stage: Stage): Observable<Stage>{
    return this.http.post<Stage>(
      this.StageUrl,
      Stage,
      httpOptions
    );
  }

  /**
   * @returns Mettre à jour un nouveau Stage
   */
  public updateStage(id:number,Stage:Stage): Observable<Stage>{
    return this.http.patch<Stage>(
      this.StageUrl+`/${id}`,
      Stage,
      httpOptions
    );
  }


}
