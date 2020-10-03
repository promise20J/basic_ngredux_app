import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {EMAIL_REGEX} from '../../../config/config';
import {Subscription} from 'rxjs';
import {AdminUserInterface} from '../../../interfaces/admin-user.interface';
import {AdminRegisterAction} from '../../../store/actions/admin-auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  adminRegisterForm: FormGroup;
  errorMessage: string = null;
  loading: boolean;

  storeSubs: Subscription;

  constructor(private router: Router, private readonly store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.adminRegisterForm = new FormGroup({
      email: new FormControl('example@gmail.com', [Validators.pattern(EMAIL_REGEX)]),
      password: new FormControl('123456', [Validators.required]),
      passwordr: new FormControl('123456', [Validators.required]),
    }, {
      validators: this.verifyPassword('password', 'passwordr')
    });


    this.storeSubs = this.store.select('authState').subscribe((adminAuthState) => {
      this.loading = adminAuthState.isLoading;
      this.errorMessage = adminAuthState.registerErrorMessage;
    });
  }

  verifyPassword(pass1: string, pass2: string): any {
    return (group: FormGroup) => {

      const vpass1 = group.controls[pass1].value;
      const vpass2 = group.controls[pass2].value;

      if (vpass1 === vpass2) {
        return null;
      }

      return {
        passequals: false
      };

    };
  }

  register(): void {
    if (this.adminRegisterForm.invalid) {
      this.errorMessage = 'Por favor corrija datos';
      this.adminRegisterForm.markAllAsTouched();
      return;
    } else {

      const user: AdminUserInterface = {
        email: this.adminRegisterForm.controls.email.value,
        password: this.adminRegisterForm.controls.passwordr.value,
      };

      this.store.dispatch(new AdminRegisterAction({user}));
    }
  }

  ngOnDestroy(): void {
    this.storeSubs.unsubscribe();
  }

}
