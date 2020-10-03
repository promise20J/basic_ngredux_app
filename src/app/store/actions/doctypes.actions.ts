import {Action} from '@ngrx/store';
import {DocumentTypeInterface} from '../../interfaces/document-type.interface';

export enum DoctypesTypes {
  LOADING_ACTION = '[DOCTYPES] LOADING ACTION',
  LOADING_ACTION_SUCCESS = '[DOCTYPES] LOADING ACTION SUCCESS',
  LOADING_ACTION_FAILURE = '[DOCTYPES] LOADING ACTION FAILURE',
  LOADING_DOC_BY_CODE_ACTION = '[DOCTYPES] LOADING BY CODE ACTION',
  SET_DOCUMENTTYPE = '[DOCTYPES] SET UPDATE DOCTYPE',
  LOADING_DOC_BY_CODE_ACTION_FAILURE = '[DOCTYPES] LOADING BY CODE ACTION FAILURE',
  ACTION_DOCTYPE = '[DOCTYPES] UPDATE DOCTYPE ACTION',
  REGISTER_DOCTYPE = '[DOCTYPES] REGISTER DOCTYPE ACTION',
  ACTION_DOCTYPE_SUCCESS = '[DOCTYPES] UPDATE DOCTYPE ACTION SUCCESS',
  ACTION_DOCTYPE_FAILURE = '[DOCTYPES] UPDATE DOCTYPE ACTION FAILURE',
}


export class LoadingDocTypesAction implements Action {
  readonly type = DoctypesTypes.LOADING_ACTION;
}

export class LoadingDocTypesSuccessAction implements Action {
  readonly type = DoctypesTypes.LOADING_ACTION_SUCCESS;

  constructor(public payload: { documents: DocumentTypeInterface[] }) {
  }
}

export class LoadingDocTypeFailureAction implements Action {
  readonly type = DoctypesTypes.LOADING_ACTION_FAILURE;

  constructor(public payload: { message: string }) {
  }

}

export class LoadingDocTypeByCodeAction implements Action {
  readonly type = DoctypesTypes.LOADING_DOC_BY_CODE_ACTION;

  constructor(public payload: { code: string }) {
  }
}


export class LoadingDocTypeByCodeActionFailure implements Action {
  readonly type = DoctypesTypes.LOADING_DOC_BY_CODE_ACTION_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export class SetDocTypeForUpdateAction implements Action {
  readonly type = DoctypesTypes.SET_DOCUMENTTYPE;

  constructor(public payload: { document: DocumentTypeInterface }) {
  }
}

export class UpdateDocTypeAction implements Action {
  readonly type = DoctypesTypes.ACTION_DOCTYPE;

  constructor(public payload: { document: DocumentTypeInterface, delete: boolean }) {
  }
}

export class UpdateDocTypeActionSuccess implements Action {
  readonly type = DoctypesTypes.ACTION_DOCTYPE_SUCCESS;

  constructor(public payload: { document: DocumentTypeInterface, message?: string }) {
  }
}

export class RegisterDocTypeAction implements Action {
  readonly type = DoctypesTypes.REGISTER_DOCTYPE;

  constructor(public payload: { document: DocumentTypeInterface, message?: string }) {
  }
}

export class UpdateDocTypeActionFailure implements Action {
  readonly type = DoctypesTypes.ACTION_DOCTYPE_FAILURE;

  constructor(public payload: { message: string }) {
  }
}


export type DoctypesActions = LoadingDocTypesAction |
  LoadingDocTypesSuccessAction |
  LoadingDocTypeFailureAction |
  LoadingDocTypeByCodeAction |
  LoadingDocTypeByCodeActionFailure |
  SetDocTypeForUpdateAction |
  UpdateDocTypeAction |
  UpdateDocTypeActionSuccess |
  UpdateDocTypeActionFailure |
  RegisterDocTypeAction;


