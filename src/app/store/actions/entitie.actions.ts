import {Action} from '@ngrx/store';
import {EntitieInterface} from '../../interfaces/entitie.interface';

export enum EntitieTypes {
  LOADING_ACTION = '[ENTITIE] LOADING ACTION',
  LOADING_ACTION_SUCCESS = '[ENTITIE] LOADING ACTION SUCCESS',
  LOADING_ACTION_FAILURE = '[ENTITIE] LOADING ACTION FAILURE',
  LOADING_BY_CODE_ACTION = '[ENTITIE] LOADING BY CODE ACTION',
  SET_ENTITIE = '[ENTITIE] SET UPDATE ENTITIE',
  LOADING_BY_CODE_ACTION_FAILURE = '[ENTITIE] LOADING BY CODE ACTION FAILURE',
  ACTION_ENTITIE = '[ENTITIE] UPDATE ENTITIE ACTION',
  REGISTER_ENTITIE = '[ENTITIE] REGISTER ENTITIE ACTION',
  ACTION_DOCTYPE_SUCCESS = '[ENTITIE] UPDATE CNTR ACTION SUCCESS',
  ACTION_DOCTYPE_FAILURE = '[ENTITIE] UPDATE CNTR ACTION FAILURE',
}


export class LoadingEntitieAction implements Action {
  readonly type = EntitieTypes.LOADING_ACTION;
}

export class LoadingEntitieSuccessAction implements Action {
  readonly type = EntitieTypes.LOADING_ACTION_SUCCESS;

  constructor(public payload: { entities: EntitieInterface[] }) {
  }
}

export class LoadingEntitieFailureAction implements Action {
  readonly type = EntitieTypes.LOADING_ACTION_FAILURE;

  constructor(public payload: { message: string }) {
  }

}

export class LoadingEntitieByCodeAction implements Action {
  readonly type = EntitieTypes.LOADING_BY_CODE_ACTION;

  constructor(public payload: { code: string }) {
  }
}


export class LoadingEntitieByCodeActionFailure implements Action {
  readonly type = EntitieTypes.LOADING_BY_CODE_ACTION_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export class SetEntitieForUpdateAction implements Action {
  readonly type = EntitieTypes.SET_ENTITIE;

  constructor(public payload: { entitie: EntitieInterface }) {
  }
}

export class UpdateEntitieTypeAction implements Action {
  readonly type = EntitieTypes.ACTION_ENTITIE;

  constructor(public payload: { entitie: EntitieInterface, delete: boolean }) {
  }
}

export class UpdateEntitieTypeActionSuccess implements Action {
  readonly type = EntitieTypes.ACTION_DOCTYPE_SUCCESS;

  constructor(public payload: { entitie: EntitieInterface, message?: string }) {
  }
}

export class RegisterEntitieTypeAction implements Action {
  readonly type = EntitieTypes.REGISTER_ENTITIE;

  constructor(public payload: { entitie: EntitieInterface, message?: string }) {
  }
}

export class UpdateEntitieTypeActionFailure implements Action {
  readonly type = EntitieTypes.ACTION_DOCTYPE_FAILURE;

  constructor(public payload: { message: string }) {
  }
}


export type EntitieActions = LoadingEntitieAction |
  LoadingEntitieSuccessAction |
  LoadingEntitieFailureAction |
  LoadingEntitieByCodeAction |
  LoadingEntitieByCodeActionFailure |
  SetEntitieForUpdateAction |
  UpdateEntitieTypeAction |
  UpdateEntitieTypeActionSuccess |
  RegisterEntitieTypeAction |
  UpdateEntitieTypeActionFailure;


