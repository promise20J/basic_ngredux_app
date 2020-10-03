import {ContributorInterface} from '../../interfaces/contributor.interface';
import {ContributorActions, ContributorTypes} from '../actions/contributor.actions';

export interface ContributorsState {
  contributors: ContributorInterface[];
  updateContributor: ContributorInterface;
  loading: boolean;
  errorMessage: string;
  infoMessage: string;
}

const initialState: ContributorsState = {
  contributors: [],
  updateContributor: null,
  errorMessage: null,
  infoMessage: null,
  loading: false
};


export const ContributorsReducer = (state: ContributorsState = initialState, action: ContributorActions): ContributorsState => {
  switch (action.type) {
    case ContributorTypes.LOADING_ACTION: {
      return {
        ...state,
        loading: true
      };
    }
    case ContributorTypes.LOADING_ACTION_FAILURE: {
      return {
        ...state,
        infoMessage: null,
        loading: false,
        errorMessage: action.payload.message
      };
    }
    case ContributorTypes.LOADING_ACTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        errorMessage: null,
        contributors: action.payload.contributors
      };
    }
    case ContributorTypes.LOADING_BY_CODE_ACTION: {
      return {
        ...state,
        loading: true
      };
    }
    case ContributorTypes.LOADING_BY_CODE_ACTION_FAILURE: {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.message
      };
    }
    case ContributorTypes.SET_CONTRIBUTOR: {
      return {
        ...state,
        infoMessage: null,
        updateContributor: action.payload.contributor,
        loading: false,
        errorMessage: null
      };
    }
    case ContributorTypes.ACTION_CONTRIBUTOR: {
      return {
        ...state,
        loading: true,
        infoMessage: 'Actualizando contribuyente...',
      };
    }
    case ContributorTypes.ACTION_DOCTYPE_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.message,
        infoMessage: null,
        loading: false
      };
    }
    case ContributorTypes.ACTION_DOCTYPE_SUCCESS: {
      return {
        ...state,
        loading: false,
        errorMessage: null,
        updateContributor: action.payload.contributor,
        infoMessage: action.payload.message || 'Contribuyente actualizado',
      };
    }
    case ContributorTypes.REGISTER_CONTRIBUTOR: {
      return {
        ...state,
        loading: true,
        errorMessage: null,
        infoMessage: 'Creando contribuyente...'
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};
