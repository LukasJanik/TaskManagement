import {Component, OnInit} from '@angular/core';
import {Task} from '../../store/entities/Task/task.model';
import {TaskDetailComponent} from '../task-detail/task-detail.component';
import {addTask, updateTask} from '../../store/entities/Task/task.actions';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {State} from '../../store';

@Component({
  selector: 'app-task-base',
  templateUrl: './task-base.component.html',
  styleUrls: ['./task-base.component.css']
})
export class TaskBaseComponent implements OnInit {

  constructor(
    protected dialog: MatDialog,
    protected store: Store<State>
  ) {
  }

  ngOnInit(): void {
  }

  openDialog(task?: Task): void {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '500px',
      data: !!task ? Object.assign({}, task, {due_date: !!task.due_date ? new Date(task.due_date) : null}) : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        result.due_date = !!result.due_date ? new Date(result.due_date).getTime() : result.due_date;
        const prop = {task: result};
        this.store.dispatch(!!task ? updateTask(prop) : addTask(prop));
      }
    });
  }

}
