import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router, CanLoad, Route} from '@angular/router';
import {Observable, of} from 'rxjs';
import {filter, switchMap, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AdminStatusLoginAction} from '../store/actions/admin-auth.actions';
import {AdminAuthService} from '../services/admin-auth.service';
import {AppState} from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AdminTokenGuard implements CanActivate, CanLoad {

  constructor(private store: Store<AppState>, private readonly authService: AdminAuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot): boolean {
    return (this.authService.checkToken(true));
  }

  waitForTokenVerification(): Observable<any> {
    return this.store.select(state => state.authState).pipe(
      filter(authState => !authState.isLoading)
    );
  }

  canLoad(route: Route): Observable<boolean> {
    this.store.dispatch(new AdminStatusLoginAction({redirect: false}));

    return this.waitForTokenVerification().pipe(
      switchMap(() => {
        return of(true);
      }),
      take(1)
    );

    // return of(true);

  }
}
