import { createAction, props } from '@ngrx/store';
import { Board } from '../entities';

export const loadedBoards = createAction(
  '[Board] Loaded Boards',
  props<{ boards: Board[] }>()
);

export const reloadBoards = createAction(
  '[Board] Reload Boards',
  props<{ boardId?: number }>()
);

export const findBoard = createAction(
  '[Board] Find Board',
  props<{ boardId: number }>()
);

export const addBoard = createAction(
  '[Board] Add Board',
  props<{ name: string }>()
);

export const addedBoard = createAction(
  '[Board] Added Board',
  props<{ board: Board }>()
);

export const deleteBoard = createAction(
  '[Board] Delete Board',
  props<{ id: number }>()
);

export const deletedBoard = createAction(
  '[Board] Deleted Board',
  props<{ id: number }>()
);
