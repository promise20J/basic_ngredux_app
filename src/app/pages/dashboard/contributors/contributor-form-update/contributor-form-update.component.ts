import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContributorInterface} from '../../../../interfaces/contributor.interface';
import {Store} from '@ngrx/store';
import {AppAdminState, selectContributorFeature} from '../../../../store/admin-app.reducer';
import {ActivatedRoute} from '@angular/router';
import {LoadingCntrbByCodeAction, SetCntrbForUpdateAction, UpdateCntrbTypeAction} from '../../../../store/actions/contributor.actions';

@Component({
  selector: 'app-contributor-form-update',
  templateUrl: './contributor-form-update.component.html',
  styles: []
})
export class ContributorFormUpdateComponent implements OnInit, OnDestroy {

  contributor: ContributorInterface = null;
  code: string;
  message: string;
  errorMessage: string;
  loading: boolean;
  infoMessage: string;

  contributorSubcsription: Subscription;

  documentFormUpdate: FormGroup;

  constructor(private store: Store<AppAdminState>, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.documentFormUpdate = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
    });

    this.activatedRoute.params.subscribe((params) => {
      if (params) {
        this.code = params.code;
      }
    });

    this.contributorSubcsription = this.store.select(selectContributorFeature)
      .subscribe((state) => {

        this.loading = state.loading;

        this.contributor = state.updateContributor;
        this.errorMessage = state.errorMessage;
        this.message = state.infoMessage;

        this.infoMessage = state.infoMessage;

        if (this.contributor && !this.loading) {

          this.documentFormUpdate.setValue({
            name: this.contributor.name,
            status: this.contributor.status,
          });
        }

      });

    if (this.contributor === null) {
      this.store.dispatch(new LoadingCntrbByCodeAction({code: this.code}));
    }
  }

  updateDocType(): void {

    if (this.documentFormUpdate.invalid) {
      this.errorMessage = 'Complete los datos';
      return;
    }

    const contributor = {
      ...this.documentFormUpdate.value,
      code: this.code
    };

    this.store.dispatch(new UpdateCntrbTypeAction({contributor, delete: false}));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new SetCntrbForUpdateAction({contributor: null}));
    this.contributorSubcsription.unsubscribe();
  }

  deleteDocument(): void {

    const contributor = {
      ...this.documentFormUpdate.value,
      code: this.code
    };

    this.store.dispatch(new UpdateCntrbTypeAction({contributor, delete: true}));
  }

}
