import {EntitieInterface} from '../../interfaces/entitie.interface';
import {EntitieActions, EntitieTypes} from '../actions/entitie.actions';

export interface EntitiesState {
  entities: EntitieInterface[];
  updateEntitie: EntitieInterface;
  loading: boolean;
  errorMessage: string;
  infoMessage: string;
}

const initialState: EntitiesState = {
  entities: [],
  updateEntitie: null,
  errorMessage: null,
  infoMessage: null,
  loading: false
};


export const EntitiesReducer = (state: EntitiesState = initialState, action: EntitieActions): EntitiesState => {
  switch (action.type) {
    case EntitieTypes.LOADING_ACTION: {
      return {
        ...state,
        loading: true
      };
    }
    case EntitieTypes.LOADING_ACTION_FAILURE: {
      return {
        ...state,
        infoMessage: null,
        loading: false,
        errorMessage: action.payload.message
      };
    }
    case EntitieTypes.LOADING_ACTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        errorMessage: null,
        entities: action.payload.entities
      };
    }
    case EntitieTypes.LOADING_BY_CODE_ACTION: {
      return {
        ...state,
        loading: true
      };
    }
    case EntitieTypes.LOADING_BY_CODE_ACTION_FAILURE: {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.message
      };
    }
    case EntitieTypes.SET_ENTITIE: {
      return {
        ...state,
        infoMessage: null,
        updateEntitie: action.payload.entitie,
        loading: false,
        errorMessage: null
      };
    }
    case EntitieTypes.ACTION_ENTITIE: {
      return {
        ...state,
        loading: true,
        infoMessage: 'Actualizando entidad...',
      };
    }
    case EntitieTypes.ACTION_DOCTYPE_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.message,
        infoMessage: null,
        loading: false
      };
    }
    case EntitieTypes.ACTION_DOCTYPE_SUCCESS: {
      return {
        ...state,
        loading: false,
        errorMessage: null,
        updateEntitie: action.payload.entitie,
        infoMessage: action.payload.message || 'Entidad actualizada',
      };
    }
    case EntitieTypes.REGISTER_ENTITIE: {
      return {
        ...state,
        loading: true,
        errorMessage: null,
        infoMessage: 'Creando entidad...'
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};
