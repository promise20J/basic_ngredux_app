import {AdminDashboardActions} from '../actions/admin-dashboard.actions';

export interface AdminGStoreState {
  name: string;
}

const initialState: AdminGStoreState = {
  name: null,
};


export const AdminGStoreReducer = (state: AdminGStoreState = initialState, action: AdminDashboardActions): AdminGStoreState => {
  switch (action.type) {

    default: {
      return state;
    }
  }
};
