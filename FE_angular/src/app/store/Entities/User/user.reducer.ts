import { createReducer, on } from '@ngrx/store';
import { User } from './user.model';
import * as UserActions from './user.actions';

export const usersFeatureKey = 'users';

export interface State {
  currentUser: User;
}

export const initialState: State = {
  currentUser: null,
};


export const reducer = createReducer(
  initialState,
  on(UserActions.setCurrentUser,
    (state, action) => {
      return Object.assign({}, {currentUser: action.user as User});
    }
  ),
  on(UserActions.logOut,
    (state, action) => {
      return Object.assign({}, {currentUser: null});
    }
  ),
);
