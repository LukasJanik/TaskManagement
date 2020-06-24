import {createAction, props} from '@ngrx/store';

import {Status, Task} from './task.model';

export const addTask = createAction(
  '[User/API] Add Task',
  props<{ task: Task }>()
);

export const RemoveTask = createAction(
  '[User/API] Remove Task',
);

export const changeOrder = createAction(
  '[User/API] Change order',
  props<{ previousIndex: number, newIndex: number, typeStatus: Status, task: Task }>()
);
