import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {EntitiesService} from '../../services/entities.service';
import {
  EntitieTypes,
  LoadingEntitieByCodeAction,
  LoadingEntitieFailureAction,
  LoadingEntitieSuccessAction,
  RegisterEntitieTypeAction,
  SetEntitieForUpdateAction,
  UpdateEntitieTypeAction,
  UpdateEntitieTypeActionFailure,
  UpdateEntitieTypeActionSuccess
} from '../actions/entitie.actions';

@Injectable()
export class EntitiesEffects {
  constructor(private actions$: Actions, protected entitiesService: EntitiesService) {
  }

  @Effect()
  LoadEntities = this.actions$.pipe(
    ofType(EntitieTypes.LOADING_ACTION),
    mergeMap(() => {
      return this.entitiesService.getAllEntities()
        .pipe(
          map((entities) => new LoadingEntitieSuccessAction({entities})),
          catchError((err) => of(new LoadingEntitieFailureAction({message: err.error.message})))
        );
    })
  );

  @Effect()
  LoadEntitieByCode = this.actions$.pipe(
    ofType(EntitieTypes.LOADING_BY_CODE_ACTION),
    mergeMap((action: LoadingEntitieByCodeAction) => {
      return this.entitiesService.getEntitieByCode(action.payload.code)
        .pipe(
          map((entitie) => new SetEntitieForUpdateAction({entitie})),
          catchError((err) => of(new LoadingEntitieFailureAction({message: err.error.message})))
        );
    })
  );

  @Effect()
  RegisterEntitie = this.actions$.pipe(
    ofType(EntitieTypes.REGISTER_ENTITIE),
    mergeMap((action: RegisterEntitieTypeAction) => {
      return this.entitiesService.registerEntitie(action.payload.entitie)
        .pipe(
          map((entitie) => new SetEntitieForUpdateAction({entitie})),
          catchError((err) => of(new UpdateEntitieTypeActionFailure({message: err.error.message})))
        );
    })
  );

  @Effect()
  UpdateEntitie = this.actions$.pipe(
    ofType(EntitieTypes.ACTION_ENTITIE),
    mergeMap((action: UpdateEntitieTypeAction) => {
      if (action.payload.delete) {
        return this.entitiesService.deleteEntitie(action.payload.entitie.code)
          .pipe(
            map((message) => new UpdateEntitieTypeActionSuccess({entitie: null, message})),
            catchError((err) => of(new UpdateEntitieTypeActionFailure({message: err.error.message})))
          );
      } else {
        return this.entitiesService.updateEntitie(action.payload.entitie)
          .pipe(
            map((entitie) => new UpdateEntitieTypeActionSuccess({entitie})),
            catchError((err) => of(new UpdateEntitieTypeActionFailure({message: err.error.message})))
          );
      }

    })
  );

}
