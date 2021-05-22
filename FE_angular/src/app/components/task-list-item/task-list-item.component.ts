import { Component, Input } from '@angular/core';
import { State } from '../../store';
import { Store } from '@ngrx/store';
import { Task } from '../../store/entities/entities';
import { deleteTask } from '../../store/entities/task-lists/task-lists.actions';
import { CommonDialogData, dialogTypes } from '../../definitions/types';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { openDialog } from 'src/app/utils/utils';
import { MatDialog } from '@angular/material/dialog';
import { dialogData } from '../../definitions/constants';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css', '../../app.component.css']
})
export class TaskListItemComponent {
  @Input() task: Task = null;
  @Input() listId: number;

  openDialog: (modalData: CommonDialogData) => Promise<string>;

  constructor(
    private store: Store<State>,
    private dialog: MatDialog
  ) {
    this.openDialog = openDialog.bind(null, this.dialog, CommonDialogComponent);
  }

  deleteTask(): void {
    this.openDialog(dialogData[dialogTypes.deleteItem]).then(() => {
      this.store.dispatch(deleteTask({listId: this.listId, taskId: this.task.id}));
    });
  }

}
