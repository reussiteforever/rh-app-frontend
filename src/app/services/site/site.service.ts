import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Site } from 'src/app/interfaces/site';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private siteUrl = 'http://localhost:3000/api/site';  // URL to backend api

  constructor(private http: HttpClient) { }
  
  /**
   * 
   * @returns La liste de tous les sites
   */
  public getAllSites(): Observable<Site[]>{
    return this.http.get<Site[]>(this.siteUrl);
  }

  /**
   * @returns Supprimer un site
   */
  public deleteSite(id:number): Observable<any>{
    return this.http.patch(`http://localhost:3000/api/site/${id}/state/0`,{});
  }

  /**
   * @returns Création d'un nouveau site
   */
  public createSite(site: Site): Observable<Site>{
    return this.http.post<Site>(
      'http://localhost:3000/api/site',
      site,
      httpOptions
    );
  }

  /**
   * @returns Mettre à jour un nouveau site
   */
  public updateSite(id:number,site:Site): Observable<Site>{
    return this.http.patch<Site>(
      `http://localhost:3000/api/site/${id}`,
      site,
      httpOptions
    );
  }


}
