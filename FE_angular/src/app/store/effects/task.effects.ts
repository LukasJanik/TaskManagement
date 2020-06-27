import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {setCurrentUser} from '../Entities/User/user.actions';
import {TaskService} from '../../services/Task.service';
import {
  addedTask,
  addTask,
  loadedTasks,
  loadTasks, removedTask,
  removeTask,
  updatedTask,
  updateTask
} from '../Entities/Task/task.actions';
import {State} from '../index';
import {Store} from '@ngrx/store';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private store: Store<State>
  ) {
  }

  loadTasks$ = createEffect(() => this.actions$
    .pipe(ofType(setCurrentUser, loadTasks),
      withLatestFrom(this.store),
      mergeMap(([action, store]) => {
        const user = store.users.currentUser;
        return this.taskService.getUserTasks(user)
          .pipe(
            map(tasks => loadedTasks({tasks})),
            catchError(() => {
              return of({type: 'Unable to load current user\'s tasks'});
            }),
          );
      })
    )
  );

  addTasks$ = createEffect(() => this.actions$
    .pipe(ofType(addTask),
      withLatestFrom(this.store),
      mergeMap(([action, store]) => {
        const user = store.users.currentUser;
        const localTask = store.tasks.todo[store.tasks.todo.length - 1];
        return this.taskService.addTask(user, localTask)
          .pipe(
            map(task => addedTask({localTask: action.task, remoteTask: task})),
            catchError(() => {
              return of({type: 'Unable to add task for current user'});
            }),
          );
      })
    )
  );

  updateTask$ = createEffect(() => this.actions$
    .pipe(ofType(updateTask),
      mergeMap((action) => this.taskService.updateTask(action.task)
        .pipe(
          map(() => updatedTask()),
          catchError(() => {
            return of(loadTasks);
          }),
        )
      )
    )
  );

  removeTask$ = createEffect(() => this.actions$
    .pipe(ofType(removeTask),
      mergeMap((action) => this.taskService.removeTask(action.task)
        .pipe(
          map(() => removedTask()),
          catchError(() => {
            return of(loadTasks);
          }),
        )
      )
    )
  );
}
