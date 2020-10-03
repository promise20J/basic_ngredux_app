import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ContributorService} from '../../services/contributor.service';
import {
  ContributorTypes,
  LoadingCntrbByCodeAction,
  LoadingCntrbFailureAction,
  LoadingCntrbSuccessAction,
  RegisterCntrbTypeAction,
  SetCntrbForUpdateAction,
  UpdateCntrbTypeAction,
  UpdateCntrbTypeActionFailure,
  UpdateCntrbTypeActionSuccess
} from '../actions/contributor.actions';

@Injectable()
export class ContributorEffects {
  constructor(private actions$: Actions, protected contributorService: ContributorService) {
  }

  @Effect()
  LoadEntities = this.actions$.pipe(
    ofType(ContributorTypes.LOADING_ACTION),
    mergeMap(() => {
      return this.contributorService.getAllContributors()
        .pipe(
          map((contributors) => new LoadingCntrbSuccessAction({contributors})),
          catchError((err) => of(new LoadingCntrbFailureAction({message: err.error.message})))
        );
    })
  );

  @Effect()
  LoadEntitieByCode = this.actions$.pipe(
    ofType(ContributorTypes.LOADING_BY_CODE_ACTION),
    mergeMap((action: LoadingCntrbByCodeAction) => {
      return this.contributorService.getContributorByCode(action.payload.code)
        .pipe(
          map((contributor) => new SetCntrbForUpdateAction({contributor})),
          catchError((err) => of(new LoadingCntrbFailureAction({message: err.error.message})))
        );
    })
  );

  @Effect()
  RegisterEntitie = this.actions$.pipe(
    ofType(ContributorTypes.REGISTER_CONTRIBUTOR),
    mergeMap((action: RegisterCntrbTypeAction) => {
      return this.contributorService.registerContributor(action.payload.contributor)
        .pipe(
          map((contributor) => new SetCntrbForUpdateAction({contributor})),
          catchError((err) => of(new UpdateCntrbTypeActionFailure({message: err.error.message})))
        );
    })
  );

  @Effect()
  UpdateEntitie = this.actions$.pipe(
    ofType(ContributorTypes.ACTION_CONTRIBUTOR),
    mergeMap((action: UpdateCntrbTypeAction) => {
      if (action.payload.delete) {
        return this.contributorService.deleteContributor(action.payload.contributor.code)
          .pipe(
            map((message) => new UpdateCntrbTypeActionSuccess({contributor: null, message})),
            catchError((err) => of(new UpdateCntrbTypeActionFailure({message: err.error.message})))
          );
      } else {
        return this.contributorService.updateContributor(action.payload.contributor)
          .pipe(
            map((contributor) => new UpdateCntrbTypeActionSuccess({contributor})),
            catchError((err) => of(new UpdateCntrbTypeActionFailure({message: err.error.message})))
          );
      }

    })
  );

}
