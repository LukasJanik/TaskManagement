import { createReducer, on } from '@ngrx/store';
import { Task } from './task.model';
import * as TaskActions from './task.actions';

export const tasksFeatureKey = 'tasks';

export interface State {
  toDo: Task[];
  inProgress: Task[];
  done: Task[];
}

export const initialState: State = {
  toDo: [],
  inProgress: [],
  done: []
};


export const reducer = createReducer(
  initialState,
  on(TaskActions.addTask,
    (state, action) => {
      return Object.assign(state, {toDo: [...state.toDo, action.task]});
    }
  ),
);
