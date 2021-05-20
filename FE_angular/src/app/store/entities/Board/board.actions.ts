import { createAction, props } from '@ngrx/store';


export const addBoard = createAction(
  '[Board] Add Board',
  props<{ name: string }>()
);

export const removeBoard = createAction(
  '[Board] Remove Board',
  props<{ id: number }>()
);
