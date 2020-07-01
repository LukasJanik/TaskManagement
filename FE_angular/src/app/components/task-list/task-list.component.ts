import {Component, OnInit} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import {Task} from '../../store/Entities/Task/task.model';
import {doneTasks, inProgressTasks, State, toDoTasks} from '../../store';
import {Store} from '@ngrx/store';
import {dragTask} from '../../store/Entities/Task/task.actions';
import {Observable} from 'rxjs';
import {TaskBaseComponent} from '../task-base/task-base.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css', '../../app.component.css']
})
export class TaskListComponent extends TaskBaseComponent implements OnInit {

  todo$: Observable<Task[]>;
  inProgress$: Observable<Task[]>;
  done$: Observable<Task[]>;

  constructor(
    protected dialog: MatDialog,
    protected store: Store<State>
  ) {
    super(dialog, store);
    this.todo$ = this.store.select(toDoTasks);
    this.inProgress$ = this.store.select(inProgressTasks);
    this.done$ = this.store.select(doneTasks);
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
