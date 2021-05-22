import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../../store/entities/entities';
import { Store } from '@ngrx/store';
import { selectBoards, State } from '../../store';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { dialogData } from '../../definitions/constants';
import { CommonDialogData, dialogTypes } from '../../definitions/types';
import { addBoard, deleteBoard } from '../../store/entities/board/board.actions';
import { openDialog } from '../../utils/utils';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css', '../../app.component.css']
})
export class BoardListComponent implements OnInit, OnDestroy {

  boards$: Observable<Board[]>;
  openDialog: (modalData: CommonDialogData) => Promise<string>;

  constructor(
    private store: Store<State>,
    private dialog: MatDialog,
    private titleService: Title) {
    this.titleService.setTitle('Trello-Clone - Boards');
    this.openDialog = openDialog.bind(null, this.dialog, CommonDialogComponent);
  }

  ngOnInit(): void {
    this.boards$ = this.store.select(selectBoards);
  }

  addBoard(): void {
    this.openDialog(dialogData[dialogTypes.newBoard]).then(name => {
      this.store.dispatch(addBoard({name}));
    });
  }

  removeBoard(clickEvent: Event, id: number): void {
    clickEvent.stopPropagation();
    this.openDialog(dialogData[dialogTypes.deleteBoard]).then(() => {
      this.store.dispatch(deleteBoard({id}));
    });
  }

  ngOnDestroy(): void {
  }

}
