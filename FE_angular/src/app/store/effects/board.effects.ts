import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { selectBoards, selectCurrentBoard, State } from '../index';
import { Store } from '@ngrx/store';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  addBoard,
  loadedBoards,
  deleteBoard,
  findBoard,
  addedBoard, deletedBoard, reloadBoards
} from '../entities/board/board.actions';
import { setBoardData } from '../entities/task-lists/task-lists.actions';
import { Board } from '../entities/entities';
import { BoardService } from '../../services/board.service';

@Injectable()
export class BoardEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private dataService: BoardService,
  ) {
  }


  loadBoards$ = createEffect(() => this.actions$
    .pipe(ofType(ROOT_EFFECTS_INIT),
      mergeMap(() => this.dataService.getBoards()
        .pipe(
          map((boards: Board[]) => {
            return loadedBoards({boards});
          }),
        )
      )
    )
  );

  addBoard$ = createEffect(() => this.actions$
    .pipe(ofType(addBoard),
      mergeMap((action) => this.dataService.addBoard(action.name)
        .pipe(
          map((board: Board) => {
            return addedBoard({board});
          }),
        )
      )
    )
  );

  deleteBoard$ = createEffect(() => this.actions$
    .pipe(ofType(deleteBoard),
      mergeMap((action) => this.dataService.deleteBoard(action.id)
        .pipe(
          map(() => {
            return deletedBoard({id: action.id});
          }),
        )
      )
    )
  );

  findBoard$ = createEffect(() => this.actions$
    .pipe(ofType(findBoard),
      withLatestFrom(this.store.select(selectBoards)),
      map(([action, boards]) => {
        const board = boards.find(item => item.id === action.boardId);
        return setBoardData({board});
      })
    )
  );

  reloadBoards$ = createEffect(() => this.actions$
    .pipe(ofType(reloadBoards),
      withLatestFrom(this.store.select(selectCurrentBoard)),
      mergeMap(([action, board]) =>
        this.dataService.getBoards().pipe(
          switchMap(boards =>
            board.id || action.boardId ?
              [
                loadedBoards({boards}),
                setBoardData({board: boards.find(reloadedBoard => reloadedBoard.id === (board.id || action.boardId))})
              ] : [loadedBoards({boards})]
          )
        )
      )
    )
  );
}
