import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppAdminState, selectContributorFeature} from '../../../store/admin-app.reducer';
import {Router} from '@angular/router';
import {ContributorsState} from '../../../store/reducers/contributor.reducer';
import {ContributorInterface} from '../../../interfaces/contributor.interface';
import {LoadingCntrbAction, SetCntrbForUpdateAction} from '../../../store/actions/contributor.actions';
import {DocumentTypeInterface} from '../../../interfaces/document-type.interface';
import {SetDocTypeForUpdateAction} from '../../../store/actions/doctypes.actions';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styles: []
})
export class ContributorsComponent implements OnInit, OnDestroy {
  contributors: ContributorInterface[] = [];
  loading: boolean;
  message: string;
  errorMessage: string;

  contributorsSubscription: Subscription;

  constructor(private store: Store<AppAdminState>, private router: Router) {
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadingCntrbAction());

    this.contributorsSubscription = this.store.select(selectContributorFeature)
      .subscribe((contributorsState: ContributorsState) => {
        this.contributors = contributorsState.contributors;
        this.loading = contributorsState.loading;
        this.message = contributorsState.infoMessage;
        this.errorMessage = contributorsState.errorMessage;
      });
  }

  ngOnDestroy(): void {
    this.contributorsSubscription.unsubscribe();
  }

  moveToUpdate(contributor: ContributorInterface): void {
    this.store.dispatch(new SetCntrbForUpdateAction({contributor}));
    this.router.navigate([`/dashboard/contributors/${contributor.code}`]);
  }
}
