import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  DoctypesTypes,
  LoadingDocTypeByCodeAction,
  LoadingDocTypeFailureAction,
  LoadingDocTypesSuccessAction,
  RegisterDocTypeAction,
  SetDocTypeForUpdateAction,
  UpdateDocTypeAction,
  UpdateDocTypeActionFailure,
  UpdateDocTypeActionSuccess
} from '../actions/doctypes.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {DoctypesService} from '../../services/doctypes.service';
import {of} from 'rxjs';

@Injectable()
export class DoctypesEffects {
  constructor(private actions$: Actions, protected doctypesService: DoctypesService) {
  }

  @Effect()
  LoadDocTypes = this.actions$.pipe(
    ofType(DoctypesTypes.LOADING_ACTION),
    mergeMap(() => {
      return this.doctypesService.getAllDocTypes()
        .pipe(
          map((documents) => new LoadingDocTypesSuccessAction({documents})),
          catchError((err) => of(new LoadingDocTypeFailureAction({message: err.error.message})))
        );
    })
  );

  @Effect()
  LoadDocTypeByCode = this.actions$.pipe(
    ofType(DoctypesTypes.LOADING_DOC_BY_CODE_ACTION),
    mergeMap((action: LoadingDocTypeByCodeAction) => {
      return this.doctypesService.getDocTypeByCode(action.payload.code)
        .pipe(
          map((document) => new SetDocTypeForUpdateAction({document})),
          catchError((err) => of(new LoadingDocTypeFailureAction({message: err.error.message})))
        );
    })
  );

  @Effect()
  RegisterDocument = this.actions$.pipe(
    ofType(DoctypesTypes.REGISTER_DOCTYPE),
    mergeMap((action: RegisterDocTypeAction) => {
      return this.doctypesService.registerDocument(action.payload.document)
        .pipe(
          map((document) => new SetDocTypeForUpdateAction({document})),
          catchError((err) => of(new UpdateDocTypeActionFailure({message: err.error.message})))
        );
    })
  );

  @Effect()
  UpdateDocumentType = this.actions$.pipe(
    ofType(DoctypesTypes.ACTION_DOCTYPE),
    mergeMap((action: UpdateDocTypeAction) => {
      if (action.payload.delete) {
        return this.doctypesService.deleteDocument(action.payload.document.id)
          .pipe(
            map((message) => new UpdateDocTypeActionSuccess({document: null, message})),
            catchError((err) => of(new UpdateDocTypeActionFailure({message: err.error.message})))
          );
      } else {
        return this.doctypesService.updateDocType(action.payload.document)
          .pipe(
            map((document) => new UpdateDocTypeActionSuccess({document})),
            catchError((err) => of(new UpdateDocTypeActionFailure({message: err.error.message})))
          );
      }

    })
  );

}
