import {ProfileActions} from '../actions/profile.actions';

export interface ProfileState {
  name: string;
}

const initialState: ProfileState = {
  name: null,
};


export const ProfileReducer = (state: ProfileState = initialState, action: ProfileActions): ProfileState => {
  switch (action.type) {

    default: {
      return state;
    }
  }
};
