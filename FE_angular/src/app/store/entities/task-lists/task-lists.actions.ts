import {createAction, props} from '@ngrx/store';
import { Board, TaskList, Task } from '../entities';

export const setBoardData = createAction(
  '[TaskLists] Set Board Data',
  props<{ board: Board }>()
);

export const addTask = createAction(
  '[TaskLists] Add Task',
  props<{ listId: number, name: string }>()
);

export const addedTask = createAction(
  '[TaskLists] Added Task',
  props<{ listId: number, task: Task }>()
);

export const addTaskList = createAction(
  '[TaskLists] Add Task List',
  props<{ name: string }>()
);

export const addedTaskList = createAction(
  '[TaskLists] Added Task List',
  props<{ taskList: TaskList }>()
);

export const deleteTask = createAction(
  '[TaskLists] Delete Task',
  props<{ listId: number, taskId: number }>()
);

export const deletedTask = createAction(
  '[TaskLists] Deleted Task',
  props<{ listId: number, taskId: number }>()
);

export const deleteTaskList = createAction(
  '[TaskLists] Delete Task List',
  props<{ listId: number }>()
);

export const deletedTaskList = createAction(
  '[TaskLists] Deleted Task List',
  props<{ listId: number }>()
);

export const dragTask = createAction(
  '[Task/API] Drag Task',
  props<{ previousListId: number, currentListId: number, previousIndex: number, currentIndex: number }>()
);

export const draggedTask = createAction(
  '[Task/API] Dragged Task'
);

