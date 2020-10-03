import {Action} from '@ngrx/store';

export enum AdminDashboardTypes {
  STORE_INFO = '[GINDAR] GET INFO',
  STORE_INFO_SUCCESS = '[GINDAR] GET INFO SUCCESS',
  STORE_INFO_FAILURE = '[GINDAR] GET INFO FAILURE',
  UPDATE_STORE_INFO = '[GINDAR] UPDATE STORE INFO'
}


export class AdminStoreInfoAction implements Action {
  readonly type = AdminDashboardTypes.STORE_INFO;
}



export type AdminDashboardActions = AdminStoreInfoAction ;


