import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AdminUserInterface} from '../interfaces/admin-user.interface';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {AuthDataService} from './auth-data.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  errorMessage: string;

  constructor(private readonly httpClient: HttpClient,
              private router: Router,
              private dataService: AuthDataService) {
  }

  login(email: string, password: string): Observable<AdminUserInterface> {

    return this.httpClient.post(`${environment.baseUrl}/auth/login`, {email, password})
      .pipe(
        map((data: any) => {
          this.dataService.saveToken(data.user.token);
          return data.user;
        })
      );

  }


  checkToken(redirect: boolean): boolean {
    if (redirect && this.dataService.getToken()) {
      this.router.navigate(['/dashboard/home']);
    }
    return !this.dataService.getToken();
  }

  register(user: AdminUserInterface): Observable<AdminUserInterface> {

    return this.httpClient.post(`${environment.baseUrl}/auth/register`, {...user},
      {headers: this.dataService.headers()})
      .pipe(
        map((data: any) => {
          this.dataService.saveToken(data.user.token);
          return data.user;
        })
      );
  }

  private expirated(dateExp: number): boolean {
    const currentDate = new Date().getTime() / 1000;
    return ((dateExp - currentDate) < 1200);
  }

  verifyLogin(redirect: boolean = false): Observable<AdminUserInterface> {

    const adminToken = this.dataService.getToken();

    if (adminToken) {

      try {
        const payload = JSON.parse(atob(adminToken.split('.')[1]));
        const isExp = this.expirated(payload.exp);

        if (isExp) {
          return this.httpClient.post(`${environment.baseUrl}/auth/refreshToken`, {token: adminToken})
            .pipe(
              map((res: { user: AdminUserInterface }) => {
                this.dataService.saveToken(res.user.token);
                return res.user;
              })
            );

        } else {
          return this.httpClient.post(`${environment.baseUrl}/auth/validateToken`, {token: adminToken})
            .pipe(
              map((res: { user: AdminUserInterface }) => res.user)
            );
        }


      } catch (error) {
        return new Observable((subscriber => {
          subscriber.error({status: 404, error: {message: 'Bad admin token'}});
        }));
      }

    } else {
      return new Observable((subscriber => {
        subscriber.error({status: 404, error: {message: 'No admin token'}});
      }));
    }
  }

  logout(): void {
    this.dataService.removeToken();
    this.router.navigate(['login']);
  }

  removeToken(): void {
    this.dataService.removeToken();
  }
}
