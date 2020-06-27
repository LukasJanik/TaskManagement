import {createAction, props} from '@ngrx/store';
import {Task} from './task.model';

export const loadTasks = createAction(
  '[Task/API] Load Tasks',
);

export const loadedTasks = createAction(
  '[Task/API] Loaded Tasks',
  props<{ tasks: Task[] }>()
);

export const addTask = createAction(
  '[Task/API] Add Task',
  props<{ task: Task }>()
);

export const addedTask = createAction(
  '[Task/API] Added Task',
  props<{ localTask: Task, remoteTask: Task }>()
);

export const updateTask = createAction(
  '[Task/API] Update Task',
  props<{ task: Task }>()
);

export const updatedTask = createAction(
  '[Task/API] Updated Task',
);

export const removeTask = createAction(
  '[Task/API] Remove Task',
  props<{ task: Task }>()
);

export const removedTask = createAction(
  '[Task/API] Removed Task',
);

export const dragTask = createAction(
  '[Task/API] Drag Task',
  props<{previousList: string, currentList: string, previousIndex: number, currentIndex: number}>()
);

