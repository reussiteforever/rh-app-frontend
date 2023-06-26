import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fonction } from 'src/app/interfaces/fonction';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class FonctionService {
  private fonctionUrl = 'http://localhost:3000/api/fonction';  // URL to backend api

  constructor(private http: HttpClient) { }
  
  /**
   * 
   * @returns La liste de tous les Fonctions
   */
  public getAllFonctions(): Observable<Fonction[]>{
    return this.http.get<Fonction[]>(this.fonctionUrl);
  }

  /**
   * 
   * @returns Récupérer un Fonction
   */
  public getOneFonction(id:number): Observable<Fonction>{
    return this.http.get<Fonction>(this.fonctionUrl+`/${id}`);
  }

  /**
   * @returns Supprimer un Fonction
   */
  public deleteFonction(id:number): Observable<any>{
    return this.http.patch(this.fonctionUrl+`/${id}/state/0`,{});
  }

  /**
   * @returns Création d'un nouveau Fonction
   */
  public createFonction(fonction: Fonction): Observable<Fonction>{
    return this.http.post<Fonction>(
      this.fonctionUrl,
      fonction,
      httpOptions
    );
  }

  /**
   * @returns Mettre à jour un nouveau Fonction
   */
  public updateFonction(id:number,fonction:Fonction): Observable<Fonction>{
    return this.http.patch<Fonction>(
      this.fonctionUrl+`/${id}`,
      fonction,
      httpOptions
    );
  }


}
