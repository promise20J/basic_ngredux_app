import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AdminAuthState} from '../../../store/reducers/admin-auth.reducer';
import {Store} from '@ngrx/store';
import {AdminLogUserInterface} from '../../../interfaces/admin-user.interface';
import {AdminLoginAction} from '../../../store/actions/admin-auth.actions';
import {EMAIL_REGEX} from '../../../config/config';
import {AppState} from '../../../store/app.reducer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy{

  adminLoginForm: FormGroup;
  errorMessage: string = null;
  loading: boolean;

  authSubscription: Subscription;

  constructor(private router: Router, private readonly store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.adminLoginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(EMAIL_REGEX)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.authSubscription = this.store.select('authState').subscribe((adminAuthState: AdminAuthState) => {
      this.loading = adminAuthState.isLoading;
      this.errorMessage = adminAuthState.authErrorMessage;
    });
  }

  login(): void {

    if (this.adminLoginForm.invalid) {
      this.errorMessage = 'Por favor ingrese datos válidos.';
      return;
    }
    this.errorMessage = null;

    const user: AdminLogUserInterface = {
      password: this.adminLoginForm.controls.password.value.toString(),
      email: this.adminLoginForm.controls.email.value.toString()
    };

    this.store.dispatch(new AdminLoginAction({user}));
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
