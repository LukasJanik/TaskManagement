import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromUser from './Entities/User/user.reducer';


export interface State {

  [fromUser.usersFeatureKey]: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromUser.usersFeatureKey]: fromUser.reducer,
};

export const currentUser = (state: State) => state.users.currentUser;

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
