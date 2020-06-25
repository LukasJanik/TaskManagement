import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromUser from './Entities/User/user.reducer';
import * as fromTask from './Entities/Task/task.reducer';


export interface State {
  [fromUser.usersFeatureKey]: fromUser.State;
  [fromTask.tasksFeatureKey]: fromTask.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromUser.usersFeatureKey]: fromUser.reducer,
  [fromTask.tasksFeatureKey]: fromTask.reducer
};

export const currentUser = (state: State) => state.users.currentUser;
export const toDoTasks = (state: State) => state.tasks.toDo;
export const inProgressTasks = (state: State) => state.tasks.inProgress;
export const doneTasks = (state: State) => state.tasks.done;

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
