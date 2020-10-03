import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {

  constructor() {
  }

  saveToken(token: string): void {
    localStorage.setItem('ent_admin_jwt', token);
  }

  getToken(): string {
    return localStorage.getItem('ent_admin_jwt');
  }

  removeToken(): void {
    localStorage.removeItem('ent_admin_jwt');
  }

  headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
  }
}
