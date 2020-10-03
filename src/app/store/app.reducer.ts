import {ActionReducerMap} from '@ngrx/store';
import {AdminAuthReducer, AdminAuthState} from './reducers/admin-auth.reducer';

export interface AppState {
  authState: AdminAuthState;
}

export const AppReducer: ActionReducerMap<AppState> = {
  authState: AdminAuthReducer
};

