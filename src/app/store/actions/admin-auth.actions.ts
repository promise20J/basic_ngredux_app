import {Action} from '@ngrx/store';
import {AdminLogUserInterface, AdminUserInterface} from '../../interfaces/admin-user.interface';

export enum AdminAuthTypes {
  LOGIN_USER = '[ADMIN-AUTH] LOGIN USER',
  LOGIN_USER_SUCCESS = '[ADMIN-AUTH] LOGIN SUCCESS',
  LOGIN_USER_FAILURE = '[ADMIN-AUTH] LOGIN FAILURE',
  REGISTER_USER = '[ADMIN-AUTH] REGISTER USER',
  REGISTER_USER_SUCCESS = '[ADMIN-AUTH] REGISTER SUCCESS',
  REGISTER_USER_FAILURE = '[ADMIN-AUTH] REGISTER FAILURE',
  LOGOUT_USER = '[ADMIN-AUTH] LOGOUT USER',
  STATUS_LOGIN = '[ADMIN-AUTH] STATUS LOGIN',
  RESET_STATUS = '[ADMIN-AUTH] RESET STATUS'
}

export class AdminResetStatusAction implements Action {
  readonly type = AdminAuthTypes.RESET_STATUS;
}

export class AdminLoginAction implements Action {
  readonly type = AdminAuthTypes.LOGIN_USER;

  constructor(public payload: { user: AdminLogUserInterface }) {
  }
}

export class AdminLoginSuccessAction implements Action {
  readonly type = AdminAuthTypes.LOGIN_USER_SUCCESS;

  constructor(public payload: { user: AdminUserInterface }) {
  }
}

export class AdminLoginFailureAction implements Action {
  readonly type = AdminAuthTypes.LOGIN_USER_FAILURE;

  constructor(public payload: { errorCode: number, errorMessage: string }) {
  }
}

export class AdminRegisterAction implements Action {
  readonly type = AdminAuthTypes.REGISTER_USER;

  constructor(public payload: { user: AdminUserInterface }) {
  }
}

export class AdminRegisterSuccessAction implements Action {
  readonly type = AdminAuthTypes.REGISTER_USER_SUCCESS;

  constructor(public payload: { user: AdminUserInterface }) {
  }
}

export class AdminRegisterFailureAction implements Action {
  readonly type = AdminAuthTypes.REGISTER_USER_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export class AdminLogoutAction implements Action {
  readonly type = AdminAuthTypes.LOGOUT_USER;
}

export class AdminStatusLoginAction implements Action {
  readonly type = AdminAuthTypes.STATUS_LOGIN;

  constructor(public payload: { redirect: boolean }) {
  }
}

export type AdminAuthActions = AdminResetStatusAction |
  AdminLoginAction |
  AdminLoginSuccessAction |
  AdminLoginFailureAction |
  AdminRegisterAction |
  AdminRegisterSuccessAction |
  AdminRegisterFailureAction |
  AdminLogoutAction |
  AdminStatusLoginAction;
