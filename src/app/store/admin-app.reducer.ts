import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from './app.reducer';
import {ProfileReducer, ProfileState} from './reducers/profile.reducer';
import {DocTypesReducer, DoctypesState} from './reducers/doctypes.reducer';
import {ContributorsReducer, ContributorsState} from './reducers/contributor.reducer';
import {EntitiesReducer, EntitiesState} from './reducers/entities.reducer';


export interface InternalAdminState {
  profileState: ProfileState;
  doctypesState: DoctypesState;
  contributorsState: ContributorsState;
  entitiesState: EntitiesState;
}

export const AdminAppReducer: ActionReducerMap<InternalAdminState> = {
  profileState: ProfileReducer,
  doctypesState: DocTypesReducer,
  contributorsState: ContributorsReducer,
  entitiesState: EntitiesReducer,
};

// Actualizar reducer (lazy load en redux)
export interface AppAdminState extends AppState {
  internalAdminState: InternalAdminState;
}

export const selectFeature = createFeatureSelector<AppAdminState, InternalAdminState>('internalAdminState');

export const selectDocTypes = createSelector(
  selectFeature,
  (state: InternalAdminState) => state.doctypesState
);

export const selectContributorFeature = createSelector(
  selectFeature,
  (state: InternalAdminState) => state.contributorsState
);

export const selectEntitieFeature = createSelector(
  selectFeature,
  (state: InternalAdminState) => state.entitiesState
);
