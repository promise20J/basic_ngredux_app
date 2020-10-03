import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppAdminState, selectContributorFeature, selectDocTypes, selectEntitieFeature} from '../../../../store/admin-app.reducer';
import {ActivatedRoute} from '@angular/router';
import {LoadingEntitieByCodeAction, SetEntitieForUpdateAction, UpdateEntitieTypeAction} from '../../../../store/actions/entitie.actions';
import {EntitieInterface} from '../../../../interfaces/entitie.interface';
import {ContributorInterface} from '../../../../interfaces/contributor.interface';
import {LoadingDocTypesAction} from '../../../../store/actions/doctypes.actions';
import {LoadingCntrbAction} from '../../../../store/actions/contributor.actions';
import {DocumentTypeInterface} from '../../../../interfaces/document-type.interface';

@Component({
  selector: 'app-entitie-form-update',
  templateUrl: './entitie-form-update.component.html',
  styles: []
})
export class EntitieFormUpdateComponent implements OnInit, OnDestroy {

  contributors: ContributorInterface[] = [];
  doctypes: DocumentTypeInterface[] = [];

  entitie: EntitieInterface = null;
  code: string;
  message: string;
  errorMessage: string;
  loading: boolean;
  infoMessage: string;

  entitieSubscription: Subscription;
  contributorSubscription: Subscription;
  doctypeSubscription: Subscription;

  entitieFormUpdate: FormGroup;

  constructor(private store: Store<AppAdminState>, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.contributorSubscription = this.store.select(selectContributorFeature).subscribe(state => {
      this.contributors = state.contributors;
    });
    this.doctypeSubscription = this.store.select(selectDocTypes).subscribe(state => {
      this.doctypes = state.documents;
    });

    this.entitieFormUpdate = new FormGroup({
      documentTypeCode: new FormControl(null, [Validators.required]),
      documentNumber: new FormControl(null, [Validators.required]),
      bussinesName: new FormControl(null, [Validators.required]),
      businessReason: new FormControl(null, [Validators.required]),
      contributorCode: new FormControl(null, [Validators.required]),
      address: new FormControl('', []),
      phone: new FormControl('', []),
      status: new FormControl(false, [Validators.required]),
    });

    this.activatedRoute.params.subscribe((params) => {
      if (params) {
        this.code = params.code;
      }
    });

    this.entitieSubscription = this.store.select(selectEntitieFeature)
      .subscribe((state) => {

        this.loading = state.loading;

        this.entitie = state.updateEntitie;
        this.errorMessage = state.errorMessage;
        this.message = state.infoMessage;

        this.infoMessage = state.infoMessage;

        if (this.entitie && !this.loading) {

          this.entitieFormUpdate.setValue({
            documentTypeCode: this.entitie.documentTypeCode,
            documentNumber: this.entitie.documentNumber,
            bussinesName: this.entitie.bussinesName,
            businessReason: this.entitie.businessReason,
            contributorCode: this.entitie.contributorCode,
            address: this.entitie.address || '',
            phone: this.entitie.phone || '',
            status: this.entitie.status,
          });
        }

      });

    if (this.entitie === null) {
      this.store.dispatch(new LoadingEntitieByCodeAction({code: this.code}));
    }

    if (this.doctypes.length === 0) {
      this.store.dispatch(new LoadingDocTypesAction());
    }

    if (this.contributors.length === 0) {
      this.store.dispatch(new LoadingCntrbAction());
    }

  }

  updateDocType(): void {

    if (this.entitieFormUpdate.invalid) {
      this.errorMessage = 'Complete los datos';
      return;
    }

    const entitie = {
      ...this.entitieFormUpdate.value,
      code: this.code
    };

    delete entitie.docTypeName;
    delete entitie.contributorName;

    this.store.dispatch(new UpdateEntitieTypeAction({entitie, delete: false}));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new SetEntitieForUpdateAction({entitie: null}));
    this.entitieSubscription.unsubscribe();
  }

  deleteDocument(): void {

    const entitie = {
      ...this.entitieFormUpdate.value,
      code: this.code
    };

    this.store.dispatch(new UpdateEntitieTypeAction({entitie, delete: true}));
  }

}
