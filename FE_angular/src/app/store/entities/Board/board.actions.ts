import { createAction, props } from '@ngrx/store';
import { Board } from '../entities';

export const loadedBoards = createAction(
  '[Board] Loaded Boards',
  props<{ boards: Board[] }>()
);
export const addBoard = createAction(
  '[Board] Add Board',
  props<{ name: string }>()
);

export const removeBoard = createAction(
  '[Board] Remove Board',
  props<{ id: number }>()
);

export const setCurrentBoard = createAction(
  '[Board] Set Current Board',
  props<{ id: number }>()
);
