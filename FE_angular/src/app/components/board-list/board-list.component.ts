import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../../store/entities/entities';
import { Store } from '@ngrx/store';
import { selectBoards, State } from '../../store';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { dialogData } from '../../definitions/constants';
import { CommonDialogData, dialogTypes } from '../../definitions/types';
import { addBoard, removeBoard, setCurrentBoard } from '../../store/entities/Board/board.actions';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css', '../../app.component.css']
})
export class BoardListComponent implements OnInit, OnDestroy {

  boards$: Observable<Board[]>;

  constructor(private store: Store<State>, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.boards$ = this.store.select(selectBoards);
  }

  addBoard(): void {
    this.openDialog(this.dialog, CommonDialogComponent, dialogData[dialogTypes.newBoard]).then(name => {
      this.store.dispatch(addBoard({name}));
    });
  }

  removeBoard(clickEvent: Event, id: number): void {
    clickEvent.stopPropagation();
    this.openDialog(this.dialog, CommonDialogComponent, dialogData[dialogTypes.deleteBoard]).then(() => {
      this.store.dispatch(removeBoard({id}));
    });
  }

  setCurrentBoard(id: number): void {
    this.store.dispatch(setCurrentBoard({id}));
  }

  ngOnDestroy(): void {
  }

  openDialog(dialog: MatDialog, component: ComponentType<{}> | TemplateRef<{}>, modalData: CommonDialogData): Promise<string> {
    const dialogRef = dialog.open(component, {
      width: '500px',
      data: modalData
    });

    return new Promise((resolve, reject) => {
      dialogRef.afterClosed().toPromise()
        .then(result => {
          return result ? resolve(result) : reject();
        });
    });
  }

}
