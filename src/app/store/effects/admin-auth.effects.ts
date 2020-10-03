import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AdminAuthService} from '../../services/admin-auth.service';
import {
  AdminAuthTypes,
  AdminLoginAction,
  AdminLoginFailureAction,
  AdminLoginSuccessAction, AdminRegisterAction, AdminRegisterFailureAction, AdminRegisterSuccessAction,
  AdminStatusLoginAction
} from '../actions/admin-auth.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {AdminUserInterface} from '../../interfaces/admin-user.interface';

@Injectable()
export class AdminAuthEffects {
  constructor(private actions$: Actions, private authService: AdminAuthService,
              private readonly router: Router) {
  }

  @Effect()
  AdminLogin = this.actions$.pipe(
    ofType(AdminAuthTypes.LOGIN_USER),
    mergeMap((loginAction: AdminLoginAction) => {
      const user = loginAction.payload.user;
      return this.authService.login(user.email, user.password)
        .pipe(
          map((adminUser) => {
            this.router.navigate(['dashboard']);
            return new AdminLoginSuccessAction({user: adminUser});
          }),
          catchError((err) => {
            // console.log(err);
            return of(new AdminLoginFailureAction({errorMessage: err.error.message, errorCode: err.status}));
          })
        );
    })
  );

  @Effect()
  AdminRegisterSuccess = this.actions$.pipe(
    ofType(AdminAuthTypes.REGISTER_USER_SUCCESS),
    mergeMap((action: AdminRegisterSuccessAction) => {
      this.router.navigate(['dashboard']);
      return of(new AdminLoginSuccessAction({user: action.payload.user}));
    })
  );

  @Effect()
  AdminRegister = this.actions$.pipe(
    ofType(AdminAuthTypes.REGISTER_USER),
    mergeMap((registerAction: AdminRegisterAction) => {
      const user = registerAction.payload.user;
      return this.authService.register(user)
        .pipe(
          map((adminUser) => new AdminRegisterSuccessAction({user: adminUser})),
          catchError((err) => of(new AdminRegisterFailureAction({message: err.error.message})))
        );
    })
  );

  @Effect({dispatch: false})
  AdminLoginFailure = this.actions$.pipe(
    ofType(AdminAuthTypes.LOGIN_USER_FAILURE),
    tap(() => {
      this.authService.removeToken();
    })
  );

  @Effect({dispatch: false})
  LogOut = this.actions$.pipe(
    ofType(AdminAuthTypes.LOGOUT_USER),
    tap(() => {
      this.authService.logout();
    })
  );

  @Effect()
  AdminStatusLogin = this.actions$.pipe(
    ofType(AdminAuthTypes.STATUS_LOGIN),
    mergeMap((statusLogin: AdminStatusLoginAction) => {
      return this.authService.verifyLogin()
        .pipe(
          map((user: AdminUserInterface) => {
            if (statusLogin.payload.redirect) {
              this.router.navigate(['dashboard']);
            }
            return new AdminLoginSuccessAction({user});
          }),
          catchError((err) => {
            // console.log(err);
            this.router.navigate(['login']);
            return of(new AdminLoginFailureAction({errorCode: err.status, errorMessage: err.error.message}));
          })
        );
    })
  );

}
