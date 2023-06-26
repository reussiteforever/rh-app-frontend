import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/interfaces/service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private ServiceUrl = 'http://localhost:3000/api/service';  // URL to backend api

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns La liste de tous les Services
   */
  public getOneService(id:number): Observable<Service>{
    return this.http.get<Service>(this.ServiceUrl+`/${id}`);
  }
  
  /**
   * 
   * @returns La liste de tous les Services
   */
  public getAllServices(): Observable<Service[]>{
    return this.http.get<Service[]>(this.ServiceUrl);
  }

  /**
   * @returns Supprimer un Service
   */
  public deleteService(id:number): Observable<any>{
    return this.http.patch(this.ServiceUrl+`/${id}/state/0`,{});
  }

  /**
   * @returns Création d'un nouveau Service
   */
  public createService(Service: Service): Observable<Service>{
    return this.http.post<Service>(
      this.ServiceUrl,
      Service,
      httpOptions
    );
  }

  /**
   * @returns Mettre à jour un nouveau Service
   */
  public updateService(id:number,Service:Service): Observable<Service>{
    return this.http.patch<Service>(
      this.ServiceUrl+`/${id}`,
      Service,
      httpOptions
    );
  }


}
