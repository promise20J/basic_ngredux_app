import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthDataService} from './auth-data.service';
import {Observable} from 'rxjs';
import {BASE_URL} from '../config/config';
import {map} from 'rxjs/operators';
import {EntitieInterface} from '../interfaces/entitie.interface';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  constructor(private readonly httpClient: HttpClient, protected dataService: AuthDataService) {
  }

  getAllEntities(): Observable<EntitieInterface[]> {
    return this.httpClient.get(`${BASE_URL}/entitie/all`, {headers: this.dataService.headers()}).pipe(
      map((res: any) => res.entities)
    );
  }

  getEntitieByCode(code: string): Observable<EntitieInterface> {
    return this.httpClient.get(`${BASE_URL}/entitie/${code}`, {headers: this.dataService.headers()}).pipe(
      map((res: any) => res.entitie)
    );
  }

  updateEntitie(document: EntitieInterface): Observable<EntitieInterface> {
    return this.httpClient.put(`${BASE_URL}/entitie`, {...document},
      {headers: this.dataService.headers()}).pipe(
      map((res: any) => res.entitie)
    );
  }

  deleteEntitie(id: string): Observable<string> {
    return this.httpClient.delete(`${BASE_URL}/entitie/${id}`,
      {headers: this.dataService.headers()}).pipe(
      map((res: any) => res.message)
    );
  }

  registerEntitie(entitie: EntitieInterface): Observable<EntitieInterface> {
    return this.httpClient.post(`${BASE_URL}/entitie`,
      {...entitie},
      {headers: this.dataService.headers()}).pipe(
      map((res: any) => res.entitie)
    );
  }
}
