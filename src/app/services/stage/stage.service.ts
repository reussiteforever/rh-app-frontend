import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Stage } from 'src/app/interfaces/stage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  private listOfStages!: Observable<Stage[]>;

  private stageUrl = 'localhost:3000/api/stage';  // URL to backend api

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns La liste de tous les stages
   */
  public getAllStages(): Observable<Stage[]>{
    this.listOfStages = this.http.get<Stage[]>(this.stageUrl);
    return this.listOfStages;
  }
}
