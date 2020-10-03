import {AdminGStoreReducer, AdminGStoreState} from './reducers/admin-dashboard.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from './app.reducer';


export interface InternalAdminState {
  dashboardState: AdminGStoreState;
}

export interface AppAdminState extends AppState {
  adminState: InternalAdminState;
}

export const AdminAppReducer: ActionReducerMap<InternalAdminState> = {
  dashboardState: AdminGStoreReducer,
};

export const selectFeature = createFeatureSelector<AppAdminState, InternalAdminState>('adminState');

export const selectFeatureGStore = createSelector(
  selectFeature,
  (state: InternalAdminState) => state.dashboardState
);
