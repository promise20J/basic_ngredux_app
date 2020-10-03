import {DocumentTypeInterface} from '../../interfaces/document-type.interface';
import {DoctypesActions, DoctypesTypes} from '../actions/doctypes.actions';

export interface DoctypesState {
  documents: DocumentTypeInterface[];
  updateDocument: DocumentTypeInterface;
  loading: boolean;
  errorMessage: string;
  infoMessage: string;
}

const initialState: DoctypesState = {
  documents: [],
  updateDocument: null,
  errorMessage: null,
  infoMessage: null,
  loading: false
};


export const DocTypesReducer = (state: DoctypesState = initialState, action: DoctypesActions): DoctypesState => {
  switch (action.type) {
    case DoctypesTypes.LOADING_ACTION: {
      return {
        ...state,
        loading: true
      };
    }
    case DoctypesTypes.LOADING_ACTION_FAILURE: {
      return {
        ...state,
        infoMessage: null,
        loading: false,
        errorMessage: action.payload.message
      };
    }
    case DoctypesTypes.LOADING_ACTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        errorMessage: null,
        documents: action.payload.documents
      };
    }
    case DoctypesTypes.LOADING_DOC_BY_CODE_ACTION: {
      return {
        ...state,
        loading: true
      };
    }
    case DoctypesTypes.LOADING_DOC_BY_CODE_ACTION_FAILURE: {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.message
      };
    }
    case DoctypesTypes.SET_DOCUMENTTYPE: {
      return {
        ...state,
        infoMessage: null,
        updateDocument: action.payload.document,
        loading: false,
        errorMessage: null
      };
    }
    case DoctypesTypes.ACTION_DOCTYPE: {
      return {
        ...state,
        loading: true,
        infoMessage: 'Actualizando documento...',
      };
    }
    case DoctypesTypes.ACTION_DOCTYPE_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.message,
        infoMessage: null,
        loading: false
      };
    }
    case DoctypesTypes.ACTION_DOCTYPE_SUCCESS: {
      return {
        ...state,
        loading: false,
        errorMessage: null,
        updateDocument: action.payload.document,
        infoMessage: action.payload.message || 'Documento actualizado',
      };
    }
    case DoctypesTypes.REGISTER_DOCTYPE: {
      return {
        ...state,
        loading: true,
        errorMessage: null,
        infoMessage: 'Creando documento...'
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};
