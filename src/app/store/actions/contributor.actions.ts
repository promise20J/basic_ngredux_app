import {Action} from '@ngrx/store';
import {ContributorInterface} from '../../interfaces/contributor.interface';

export enum ContributorTypes {
  LOADING_ACTION = '[CONTRIBUTOR] LOADING ACTION',
  LOADING_ACTION_SUCCESS = '[CONTRIBUTOR] LOADING ACTION SUCCESS',
  LOADING_ACTION_FAILURE = '[CONTRIBUTOR] LOADING ACTION FAILURE',
  LOADING_BY_CODE_ACTION = '[CONTRIBUTOR] LOADING BY CODE ACTION',
  SET_CONTRIBUTOR = '[CONTRIBUTOR] SET UPDATE CONTRIBUTOR',
  LOADING_BY_CODE_ACTION_FAILURE = '[CONTRIBUTOR] LOADING BY CODE ACTION FAILURE',
  ACTION_CONTRIBUTOR = '[CONTRIBUTOR] UPDATE CNTR ACTION',
  REGISTER_CONTRIBUTOR = '[CONTRIBUTOR] REGISTER CNTR ACTION',
  ACTION_DOCTYPE_SUCCESS = '[CONTRIBUTOR] UPDATE CNTR ACTION SUCCESS',
  ACTION_DOCTYPE_FAILURE = '[CONTRIBUTOR] UPDATE CNTR ACTION FAILURE',
}


export class LoadingCntrbAction implements Action {
  readonly type = ContributorTypes.LOADING_ACTION;
}

export class LoadingCntrbSuccessAction implements Action {
  readonly type = ContributorTypes.LOADING_ACTION_SUCCESS;

  constructor(public payload: { contributors: ContributorInterface[] }) {
  }
}

export class LoadingCntrbFailureAction implements Action {
  readonly type = ContributorTypes.LOADING_ACTION_FAILURE;

  constructor(public payload: { message: string }) {
  }

}

export class LoadingCntrbByCodeAction implements Action {
  readonly type = ContributorTypes.LOADING_BY_CODE_ACTION;

  constructor(public payload: { code: string }) {
  }
}


export class LoadingCntrbByCodeActionFailure implements Action {
  readonly type = ContributorTypes.LOADING_BY_CODE_ACTION_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export class SetCntrbForUpdateAction implements Action {
  readonly type = ContributorTypes.SET_CONTRIBUTOR;

  constructor(public payload: { contributor: ContributorInterface }) {
  }
}

export class UpdateCntrbTypeAction implements Action {
  readonly type = ContributorTypes.ACTION_CONTRIBUTOR;

  constructor(public payload: { contributor: ContributorInterface, delete: boolean }) {
  }
}

export class UpdateCntrbTypeActionSuccess implements Action {
  readonly type = ContributorTypes.ACTION_DOCTYPE_SUCCESS;

  constructor(public payload: { contributor: ContributorInterface, message?: string }) {
  }
}

export class RegisterCntrbTypeAction implements Action {
  readonly type = ContributorTypes.REGISTER_CONTRIBUTOR;

  constructor(public payload: { contributor: ContributorInterface, message?: string }) {
  }
}

export class UpdateCntrbTypeActionFailure implements Action {
  readonly type = ContributorTypes.ACTION_DOCTYPE_FAILURE;

  constructor(public payload: { message: string }) {
  }
}


export type ContributorActions = LoadingCntrbAction |
  LoadingCntrbSuccessAction |
  LoadingCntrbFailureAction |
  LoadingCntrbByCodeAction |
  LoadingCntrbByCodeActionFailure |
  SetCntrbForUpdateAction |
  UpdateCntrbTypeAction |
  UpdateCntrbTypeActionSuccess |
  RegisterCntrbTypeAction |
  UpdateCntrbTypeActionFailure;


