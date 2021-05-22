import { Component, Input } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { State } from '../../store';
import { Store } from '@ngrx/store';
import { Task, TaskList } from '../../store/entities/entities';
import { addTask, deleteTaskList, dragTask } from '../../store/entities/task-lists/task-lists.actions';
import { CommonDialogData, dialogTypes } from '../../definitions/types';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { openDialog } from 'src/app/utils/utils';
import { dialogData } from '../../definitions/constants';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css', '../../app.component.css']
})
export class TasksListComponent {

  @Input() data: TaskList;
  taskName: string;
  openDialog: (modalData: CommonDialogData) => Promise<string>;

  constructor(
    private store: Store<State>,
    private dialog: MatDialog,
    private titleService: Title
  ) {
    this.titleService.setTitle('Trello-Clone - Board detail');
    this.openDialog = openDialog.bind(null, this.dialog, CommonDialogComponent);
  }

  addTask(): void {
    if (this.taskName) {
      this.store.dispatch(addTask({listId: this.data.id, name: this.taskName}));
      this.taskName = null;
    }
  }

  deleteList(listId: number): void {
    this.openDialog(dialogData[dialogTypes.deleteList]).then(() => {
      this.store.dispatch(deleteTaskList({listId}));
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    this.store.dispatch(dragTask({
      previousListId: Number(event.previousContainer.id),
      currentListId: Number(event.container.id),
      previousIndex: event.previousIndex,
      currentIndex: event.currentIndex
    }));
  }
}
