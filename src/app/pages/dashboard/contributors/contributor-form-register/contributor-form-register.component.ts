import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppAdminState, selectContributorFeature} from '../../../../store/admin-app.reducer';
import {Router} from '@angular/router';
import {RegisterCntrbTypeAction} from '../../../../store/actions/contributor.actions';

@Component({
  selector: 'app-contributor-form-register',
  templateUrl: './contributor-form-register.component.html',
  styles: []
})
export class ContributorFormRegisterComponent implements OnInit {

  message: string;
  errorMessage: string;
  loading: boolean;
  infoMessage: string;

  contributorSubscription: Subscription;

  contributorFormRegister: FormGroup;

  constructor(private store: Store<AppAdminState>, private router: Router) {
  }

  ngOnInit(): void {
    this.contributorFormRegister = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      status: new FormControl(false, [Validators.required]),
    });

    this.contributorSubscription = this.store.select(selectContributorFeature).subscribe((state) => {

      this.loading = state.loading;

      this.errorMessage = state.errorMessage;
      this.message = state.infoMessage;

      this.infoMessage = state.infoMessage;

      if (state.updateContributor) {
        this.router.navigate([`/dashboard/contributors/${state.updateContributor.code}`]);
      }

    });
  }


  registerContributor(): void {
    const contributor = {...this.contributorFormRegister.value};
    this.store.dispatch(new RegisterCntrbTypeAction({contributor}));
  }

  ngOnDestroy(): void {
    this.contributorSubscription.unsubscribe();
  }

}
