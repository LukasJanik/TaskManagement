import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Board } from '../../store/entities/entities';
import { selectBoards, selectCurrentBoard, State } from '../../store';
import { CommonDialogData, dialogTypes } from '../../definitions/types';
import { openDialog } from '../../utils/utils';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { dialogData } from '../../definitions/constants';
import { addTaskList } from '../../store/entities/task-lists/task-lists.actions';
import { ActivatedRoute } from '@angular/router';
import { findBoard, reloadBoards } from '../../store/entities/board/board.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-task-lists',
  templateUrl: './task-lists.component.html',
  styleUrls: ['./task-lists.component.css', '../../app.component.css']
})
export class TaskListsComponent implements OnInit {

  board$: Observable<Board>;
  openDialog: (modalData: CommonDialogData) => Promise<string>;

  constructor(
    private dialog: MatDialog,
    private store: Store<State>,
    private route: ActivatedRoute
  ) {
    this.openDialog = openDialog.bind(null, this.dialog, CommonDialogComponent);
    this.store.pipe(select(selectBoards), take(1)).toPromise().then((boards) => {
      const boardId = Number(this.route.snapshot.paramMap.get('id'));
      this.store.dispatch(
        boards && boards.length ? findBoard({boardId: Number(this.route.snapshot.paramMap.get('id'))}) : reloadBoards({boardId})
      );
    });
  }

  addList(): void {
    this.openDialog(dialogData[dialogTypes.newList]).then(name => {
      this.store.dispatch(addTaskList({name}));
    });
  }

  ngOnInit(): void {
    this.board$ = this.store.select(selectCurrentBoard);
  }

}
