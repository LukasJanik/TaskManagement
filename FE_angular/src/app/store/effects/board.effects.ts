import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { State } from '../index';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { loadedBoards } from '../entities/Board/board.actions';

@Injectable()
export class BoardEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private dataService: DataService,
  ) {
  }


  loadTasks$ = createEffect(() => this.actions$
    .pipe(ofType(ROOT_EFFECTS_INIT),
      map(() => {
        const boards = this.dataService.getBoardData();
        return loadedBoards({boards});
      })
    )
  );

  // loadTasks$ = createEffect(() => this.actions$
  //   .pipe(ofType(setCurrentUser, loadTasks, loadSearchTasks),
  //     withLatestFrom(this.store),
  //     mergeMap(([action, store]) => {
  //       const user = store.users.currentUser;
  //       return this.handleTaskLoading(user, action, store.tasks.offset);
  //     })
  //   )
  // );
  //
  // addTasks$ = createEffect(() => this.actions$
  //   .pipe(ofType(addTask),
  //     withLatestFrom(this.store),
  //     mergeMap(([action, store]) => {
  //       const user = store.users.currentUser;
  //       const localTask = store.tasks.todo[store.tasks.todo.length - 1];
  //       return this.taskService.addTask(user, localTask)
  //         .pipe(
  //           map(task => addedTask({localTask: action.task, remoteTask: task})),
  //           catchError(() => {
  //             return of({type: 'Unable to add task for current user'});
  //           }),
  //         );
  //     })
  //   )
  // );
  //
  // updateTask$ = createEffect(() => this.actions$
  //   .pipe(ofType(updateTask),
  //     mergeMap((action) => this.taskService.updateTask(action.task)
  //       .pipe(
  //         map(() => updatedTask()),
  //         catchError(() => {
  //           return of(loadTasks);
  //         }),
  //       )
  //     )
  //   )
  // );
  //
  // updateTasks$ = createEffect(() => this.actions$
  //   .pipe(ofType(dragTask),
  //     withLatestFrom(this.store),
  //     mergeMap(([action, store]) => {
  //         const listsToCheck = action.previousList === action.currentList ?
  //           [action.currentList] : [action.currentList, action.previousList];
  //         const tasksToUpdate = [];
  //         const lists = store.tasks;
  //
  //         listsToCheck.forEach(listType => {
  //           const list = lists[listType];
  //           for (let i = 0; i < list.length; i++) {
  //             if (list[i].index !== i || list[i].status !== listType) {
  //               const toUpdate = Object.assign({}, list[i]);
  //               toUpdate.status = listType;
  //               toUpdate.index = i;
  //               tasksToUpdate.push(toUpdate);
  //             }
  //           }
  //         });
  //
  //         return this.taskService.updateTasks(tasksToUpdate)
  //           .pipe(
  //             map((tasks) => updatedTasks({tasks})),
  //             catchError(() => {
  //               return of(loadTasks);
  //             }),
  //           );
  //       }
  //     )
  //   )
  // );
  //
  // removeTask$ = createEffect(() => this.actions$
  //   .pipe(ofType(removeTask),
  //     mergeMap((action) => this.taskService.removeTask(action.task)
  //       .pipe(
  //         map(() => removedTask()),
  //         catchError(() => {
  //           return of(loadTasks);
  //         }),
  //       )
  //     )
  //   )
  // );
  //
  // private handleTaskLoading(user: User, action: any, offset: number): Observable<Action> {
  //   if (this.router.url.includes('tasks')) {
  //     return this.taskService.getUserTasks(user)
  //       .pipe(
  //         map(tasks => loadedTasks({tasks})),
  //         catchError(() => {
  //           return of({type: 'Unable to load current user\'s tasks'});
  //         }),
  //       );
  //   } else {
  //     return this.taskService.searchUserTasks(user, offset, action.expression)
  //       .pipe(
  //         map(tasks => loadedSearchTasks({tasks})),
  //         catchError(() => {
  //           return of({type: 'Unable to load current user\'s tasks'});
  //         }),
  //       );
  //   }
  // }
}
