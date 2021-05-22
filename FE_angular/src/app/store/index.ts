import {
  ActionReducerMap, MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromBoard from './entities/board/board.reducer';
import * as fromTask from './entities/task-lists/task-lists.reducer';
import { Board } from './entities/entities';

export interface State {
  [fromBoard.boardFeatureKey]: fromBoard.State;
  [fromTask.tasksFeatureKey]: Board;
}

export const reducers: ActionReducerMap<State> = {
// @ts-ignore
  [fromBoard.boardFeatureKey]: fromBoard.reducer,
// @ts-ignore
  [fromTask.tasksFeatureKey]: fromTask.reducer
};

export const selectBoards = (state: State) => state.board.boards;
export const selectCurrentBoard = (state: State) => {
  return state.tasks;
};
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
