import { createAction, props } from '@ngrx/store';

import { User } from './user.model';

export const logIn = createAction(
  '[User/API] Log In',
  props<{ user: User }>()
);

export const logOut = createAction(
  '[User/API] Log Out',
);

export const getCurrentUser = createAction(
  '[User/API] Get Current User',
  props<{ user: User }>()
);

export const setCurrentUser = createAction(
  '[User/API] Set Current User',
  props<{ user: User }>()
);
