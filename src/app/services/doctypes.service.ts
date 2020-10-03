import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DocumentTypeInterface} from '../interfaces/document-type.interface';
import {BASE_URL} from '../config/config';
import {map} from 'rxjs/operators';
import {AuthDataService} from './auth-data.service';

@Injectable({
  providedIn: 'root'
})
export class DoctypesService {

  constructor(private readonly httpClient: HttpClient, protected dataService: AuthDataService) {
  }

  getAllDocTypes(): Observable<DocumentTypeInterface[]> {
    return this.httpClient.get(`${BASE_URL}/documents/all`, {headers: this.dataService.headers()}).pipe(
      map((res: any) => res.documents)
    );
  }

  getDocTypeByCode(code: string): Observable<DocumentTypeInterface> {
    return this.httpClient.get(`${BASE_URL}/documents/${code}`, {headers: this.dataService.headers()}).pipe(
      map((res: any) => res.document)
    );
  }

  updateDocType(document: DocumentTypeInterface): Observable<DocumentTypeInterface> {
    return this.httpClient.put(`${BASE_URL}/documents`, {...document},
      {headers: this.dataService.headers()}).pipe(
      map((res: any) => res.document)
    );
  }

  deleteDocument(id: string): Observable<string> {
    return this.httpClient.delete(`${BASE_URL}/documents/${id}`,
      {headers: this.dataService.headers()}).pipe(
      map((res: any) => res.message)
    );
  }

  registerDocument(document: DocumentTypeInterface): Observable<DocumentTypeInterface> {
    return this.httpClient.post(`${BASE_URL}/documents`,
      {...document},
      {headers: this.dataService.headers()}).pipe(
      map((res: any) => res.document)
    );
  }
}
