import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {setCurrentUser} from '../Entities/User/user.actions';
import {TaskService} from '../../services/Task.service';
import {addedTask, addTask, loadedTasks, loadTasks, updatedTask, updateTask} from '../Entities/Task/task.actions';
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
        return this.taskService.addTask(user, action.task)
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
}