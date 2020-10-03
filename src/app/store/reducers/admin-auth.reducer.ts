import {AdminUserInterface} from '../../interfaces/admin-user.interface';
import {AdminAuthActions, AdminAuthTypes} from '../actions/admin-auth.actions';

export interface AdminAuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: AdminUserInterface;
  authErrorMessage: string | null;
  registerErrorMessage: string | null;
}

const initialState: AdminAuthState = {
  authErrorMessage: null,
  registerErrorMessage: null,
  isAuthenticated: false,
  user: null, isLoading: false
};

export const AdminAuthReducer = (state: AdminAuthState = initialState, action: AdminAuthActions): AdminAuthState => {
  switch (action.type) {
    case AdminAuthTypes.RESET_STATUS: {
      return initialState;
    }
    case AdminAuthTypes.LOGIN_USER: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case AdminAuthTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authErrorMessage: null,
        isAuthenticated: true,
        user: action.payload.user
      };
    case AdminAuthTypes.LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false,
        authErrorMessage: action.payload.errorMessage
      };
    case AdminAuthTypes.REGISTER_USER: {
      return {
        ...state,
        isLoading: true,
        registerErrorMessage: null,
      };
    }
    case AdminAuthTypes.REGISTER_USER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        registerErrorMessage: action.payload.message
      };
    }
    case AdminAuthTypes.REGISTER_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        registerErrorMessage: null,
      };
    }
    case AdminAuthTypes.STATUS_LOGIN: {
      return {
        ...state,
        isLoading: true
      };
    }
    case AdminAuthTypes.LOGOUT_USER: {
      return initialState;
    }
    default: {
      return {...state};
    }
  }
};


