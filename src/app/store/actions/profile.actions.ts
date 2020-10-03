import {Action} from '@ngrx/store';

export enum AdminDashboardTypes {
  STORE_INFO = '[PROFILE] GET INFO',
  PROFILE_LOADING_SUCCESS = '[PROFILE] GET INFO SUCCESS',
  PROFILE_LOADING_FAILURE = '[PROFILE] GET INFO FAILURE',
  PROFILE_UPDATE_INFO = '[PROFILE] UPDATE PROFILE',
  PROFILE_UPDATE_INFO_SUCCESS = '[PROFILE] UPDATE PROFILE SUCCESS',
  PROFILE_UPDATE_INFO_FAILURE = '[PROFILE] UPDATE PROFILE FAILURE',
}


export class AdminStoreInfoAction implements Action {
  readonly type = AdminDashboardTypes.STORE_INFO;
}



export type ProfileActions = AdminStoreInfoAction ;


