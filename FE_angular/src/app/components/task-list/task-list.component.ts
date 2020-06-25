import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import {TaskDetailComponent} from '../task-detail/task-detail.component';
import {Task} from '../../store/Entities/Task/task.model';
import {doneTasks, inProgressTasks, State, toDoTasks} from '../../store';
import {Store} from '@ngrx/store';
import {addTask} from '../../store/Entities/Task/task.actions';
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
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        if (!!task) {

        } else {
          this.store.dispatch(addTask({task: result}));
        }
      }
      // this.animal = result;
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  ngOnInit(): void {
  }

}
