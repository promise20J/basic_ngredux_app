import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContributorInterface} from '../../../../interfaces/contributor.interface';
import {DocumentTypeInterface} from '../../../../interfaces/document-type.interface';
import {EntitieInterface} from '../../../../interfaces/entitie.interface';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppAdminState, selectContributorFeature, selectDocTypes, selectEntitieFeature} from '../../../../store/admin-app.reducer';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingEntitieByCodeAction, RegisterEntitieTypeAction, UpdateEntitieTypeAction} from '../../../../store/actions/entitie.actions';
import {LoadingDocTypesAction} from '../../../../store/actions/doctypes.actions';
import {LoadingCntrbAction} from '../../../../store/actions/contributor.actions';

@Component({
  selector: 'app-entitie-form-register',
  templateUrl: './entitie-form-register.component.html',
  styles: []
})
export class EntitieFormRegisterComponent implements OnInit, OnDestroy {

  contributors: ContributorInterface[] = [];
  doctypes: DocumentTypeInterface[] = [];

  code: string;
  message: string;
  errorMessage: string;
  loading: boolean;
  infoMessage: string;

  entitieSubscription: Subscription;
  contributorSubscription: Subscription;
  doctypeSubscription: Subscription;

  entitieFormRegister: FormGroup;

  constructor(private store: Store<AppAdminState>, private router: Router) {
  }

  ngOnInit(): void {

    this.contributorSubscription = this.store.select(selectContributorFeature).subscribe(state => {
      this.contributors = state.contributors;
    });
    this.doctypeSubscription = this.store.select(selectDocTypes).subscribe(state => {
      this.doctypes = state.documents;
    });

    this.entitieFormRegister = new FormGroup({
      documentTypeCode: new FormControl(null, [Validators.required]),
      documentNumber: new FormControl(null, [Validators.required]),
      bussinesName: new FormControl(null, [Validators.required]),
      businessReason: new FormControl(null, [Validators.required]),
      contributorCode: new FormControl(null, [Validators.required]),
      address: new FormControl('', []),
      phone: new FormControl('', []),
      status: new FormControl(false, [Validators.required]),
    });

    this.entitieSubscription = this.store.select(selectEntitieFeature)
      .subscribe((state) => {

        this.loading = state.loading;

        this.errorMessage = state.errorMessage;
        this.message = state.infoMessage;

        this.infoMessage = state.infoMessage;

        if (state.updateEntitie) {
          this.router.navigate([`/dashboard/entities/${state.updateEntitie.code}`]);
        }

      });

    if (this.doctypes.length === 0) {
      this.store.dispatch(new LoadingDocTypesAction());
    }

    if (this.contributors.length === 0) {
      this.store.dispatch(new LoadingCntrbAction());
    }

  }

  registerEntitie(): void {

    if (this.entitieFormRegister.invalid) {
      this.errorMessage = 'Complete los datos';
      return;
    }

    const entitie = {
      ...this.entitieFormRegister.value,
      code: this.code
    };

    this.store.dispatch(new RegisterEntitieTypeAction({entitie}));
  }

  ngOnDestroy(): void {
    this.entitieSubscription.unsubscribe();
  }

}
