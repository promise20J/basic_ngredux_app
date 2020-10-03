import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppAdminState, selectDocTypes} from '../../../../store/admin-app.reducer';
import {Router} from '@angular/router';
import {RegisterDocTypeAction} from '../../../../store/actions/doctypes.actions';

@Component({
  selector: 'app-doctype-register',
  templateUrl: './doctype-register.component.html',
  styles: []
})
export class DoctypeRegisterComponent implements OnInit, OnDestroy {

  message: string;
  errorMessage: string;
  loading: boolean;
  infoMessage: string;

  doctypeSubscription: Subscription;

  documentFormRegister: FormGroup;

  constructor(private store: Store<AppAdminState>, private router: Router) {
  }

  ngOnInit(): void {
    this.documentFormRegister = new FormGroup({
      code: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      status: new FormControl(false, [Validators.required]),
    });

    this.doctypeSubscription = this.store.select(selectDocTypes).subscribe((state) => {

      this.loading = state.loading;

      this.errorMessage = state.errorMessage;
      this.message = state.infoMessage;

      this.infoMessage = state.infoMessage;

      if (state.updateDocument) {
        this.router.navigate([`/dashboard/doctypes/${state.updateDocument.id}`]);
      }

    });
  }

  registerDocument(): void {
    const document = {...this.documentFormRegister.value};
    delete document.id;
    this.store.dispatch(new RegisterDocTypeAction({document}));
  }

  ngOnDestroy(): void {
    this.doctypeSubscription.unsubscribe();
  }
}
