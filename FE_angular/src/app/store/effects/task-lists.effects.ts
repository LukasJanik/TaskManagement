import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { selectCurrentBoard, State } from '../index';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import {
  addedTask,
  addedTaskList,
  addTask,
  addTaskList, deletedTask, deletedTaskList, deleteTask, deleteTaskList, draggedTask, dragTask
} from '../entities/task-lists/task-lists.actions';
import { Task, TaskList } from '../entities/entities';
import { TaskListsService } from '../../services/task-lists.service';
import { reloadBoards } from '../entities/board/board.actions';

@Injectable()
export class TaskListsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private dataService: TaskListsService,
  ) {
  }


  addTaskList$ = createEffect(() => this.actions$
    .pipe(ofType(addTaskList),
      withLatestFrom(this.store.select(selectCurrentBoard)),
      mergeMap(([action, board]) => this.dataService.addTaskList(board.id, action.name)
        .pipe(
          map((taskList: TaskList) => {
            return addedTaskList({taskList});
          }),
        )
      )
    )
  );

  addTask$ = createEffect(() => this.actions$
    .pipe(ofType(addTask),
      withLatestFrom(this.store.select(selectCurrentBoard)),
      mergeMap(([action, board]) => this.dataService.addTask(board.id, action.listId, action.name)
        .pipe(
          map((task: Task) => {
            return addedTask({listId: action.listId, task});
          }),
        )
      )
    )
  );

  deleteTaskList$ = createEffect(() => this.actions$
    .pipe(ofType(deleteTaskList),
      withLatestFrom(this.store.select(selectCurrentBoard)),
      mergeMap(([action, board]) => this.dataService.deleteTaskList(board.id, action.listId)
        .pipe(
          map(() => {
            return deletedTaskList(action);
          }),
        )
      )
    )
  );

  deleteTask$ = createEffect(() => this.actions$
    .pipe(ofType(deleteTask),
      withLatestFrom(this.store.select(selectCurrentBoard)),
      mergeMap(([action, board]) => this.dataService.deleteTask(board.id, action.listId, action.taskId)
        .pipe(
          map(() => {
            return deletedTask(action);
          }),
        )
      )
    )
  );

  updateTaskLists$ = createEffect(() => this.actions$
    .pipe(ofType(dragTask),
      withLatestFrom(this.store.select(selectCurrentBoard)),
      mergeMap(([action, board]) => {
          const listsWithChanges = board.lists.filter(list => list.id === action.currentListId || list.id === action.previousListId)
          return this.dataService.updateTaskLists(board.id, listsWithChanges)
            .pipe(
              map(() => draggedTask()),
              catchError(() => reloadBoards)
            );
        }
      )
    )
  );
}
