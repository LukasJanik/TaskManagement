import {
  ActionReducerMap, MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromBoard from './entities/Board/board.reducer';
import * as fromTask from './Entities/Task/task.reducer';

export interface State {
  [fromBoard.boardFeatureKey]: fromBoard.State;
  [fromTask.tasksFeatureKey]: fromTask.State;
}

export const reducers: ActionReducerMap<State> = {
// @ts-ignore
  [fromBoard.boardFeatureKey]: fromBoard.reducer,
// @ts-ignore
  [fromTask.tasksFeatureKey]: fromTask.reducer
};

export const selectBoards = (state: State) => state.board.boards;
export const selectCurrentBoard = (state: State) => {
  return state.board.currentBoard;
};
export const toDoTasks = (state: State) => state.tasks.todo;
export const inProgressTasks = (state: State) => state.tasks.in_progress;
export const doneTasks = (state: State) => state.tasks.done;

export const searchResults = (state: State) => state.tasks.searchTasks;

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
