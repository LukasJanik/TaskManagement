import { createReducer, on } from '@ngrx/store';
import * as BoardActions from './board.actions';
import { Board } from '../entities';

export const boardFeatureKey = 'board';

export interface State {
  boards: Board[];
  currentBoard: Board;
}

export const initialState: State = {
  boards: [],
  currentBoard: null,
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
  on(BoardActions.addBoard,
    (state, action) => {
      return Object.assign({}, state, {
        boards: [...state.boards, {
          name: action.name,
          id: Date.now(),
          lists: []
        } as Board]
      });
    }
  ),
  on(BoardActions.removeBoard,
    (state, action) => {
      return Object.assign({}, {boards: state.boards.filter(board => board.id !== action.id)});
    }
  ),
  on(BoardActions.setCurrentBoard,
    (state, action) => {
      return Object.assign({}, state, {currentBoard: state.boards.find((board) => board.id === action.id)});
    }
  ),
);
