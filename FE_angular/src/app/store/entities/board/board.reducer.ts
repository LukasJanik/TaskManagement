import { createReducer, on } from '@ngrx/store';
import * as BoardActions from './board.actions';
import { Board } from '../entities';

export const boardFeatureKey = 'board';

export interface State {
  boards: Board[];
}

export const initialState: State = {
  boards: [],
};


export const reducer = createReducer(
  initialState,
  on(BoardActions.loadedBoards,
    (state, action) => {
      return Object.assign({}, state, {
        boards: action.boards
      });
    }
  ),
  on(BoardActions.addedBoard,
    (state, action) => {
      return Object.assign({}, state, {
        boards: [...state.boards, action.board]
      });
    }
  ),
  on(BoardActions.deleteBoard,
    (state, action) => {
      return Object.assign({}, {boards: state.boards.filter(board => board.id !== action.id)});
    }
  ),
);
