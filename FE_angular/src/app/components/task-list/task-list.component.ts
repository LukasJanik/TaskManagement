import { Component, OnInit } from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import {TaskDetailComponent} from '../task-detail/task-detail.component';
import {Task} from '../../store/Entities/Task/task.model';
import {doneTasks, inProgressTasks, State, toDoTasks} from '../../store';
import {Store} from '@ngrx/store';
import {addTask, dragTask, updateTask} from '../../store/Entities/Task/task.actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css', '../../app.component.css']
})
export class TaskListComponent implements OnInit {

  todo$: Observable<Task[]>;
  inProgress$: Observable<Task[]>;
  done$: Observable<Task[]>;

  constructor(
    public dialog: MatDialog,
    private store: Store<State>
  ) {
    this.todo$ = this.store.select(toDoTasks);
    this.inProgress$ = this.store.select(inProgressTasks);
    this.done$ = this.store.select(doneTasks);
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

  drop(event: CdkDragDrop<Task[]>) {
    this.store.dispatch(dragTask({
      previousList: event.previousContainer.id,
      currentList: event.container.id,
      previousIndex: event.previousIndex,
      currentIndex: event.currentIndex
    }));
  }

  ngOnInit(): void {
  }

}
