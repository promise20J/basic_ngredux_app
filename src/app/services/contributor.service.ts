import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthDataService} from './auth-data.service';
import {Observable} from 'rxjs';
import {BASE_URL} from '../config/config';
import {map} from 'rxjs/operators';
import {ContributorInterface} from '../interfaces/contributor.interface';

@Injectable({
  providedIn: 'root'
})
export class ContributorService {

  constructor(private readonly httpClient: HttpClient, protected dataService: AuthDataService) {
  }

  getAllContributors(): Observable<ContributorInterface[]> {
    return this.httpClient.get(`${BASE_URL}/contributor/all`, {headers: this.dataService.headers()}).pipe(
      map((res: any) => res.contributors)
    );
  }

  getContributorByCode(code: string): Observable<ContributorInterface> {
    return this.httpClient.get(`${BASE_URL}/contributor/${code}`, {headers: this.dataService.headers()}).pipe(
      map((res: any) => res.contributor)
    );
  }

  updateContributor(contributor: ContributorInterface): Observable<ContributorInterface> {
    return this.httpClient.put(`${BASE_URL}/contributor`, {...contributor},
      {headers: this.dataService.headers()}).pipe(
      map((res: any) => res.contributor)
    );
  }

  deleteContributor(id: string): Observable<string> {
    return this.httpClient.delete(`${BASE_URL}/contributor/${id}`,
      {headers: this.dataService.headers()}).pipe(
      map((res: any) => res.message)
    );
  }

  registerContributor(contributor: ContributorInterface): Observable<ContributorInterface> {
    return this.httpClient.post(`${BASE_URL}/contributor`,
      {...contributor},
      {headers: this.dataService.headers()}).pipe(
      map((res: any) => res.contributor)
    );
  }
}
