import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../../store/Entities/Task/task.model';
import { selectCurrentBoard, State } from '../../store';
import { Store } from '@ngrx/store';
import { dragTask } from '../../store/Entities/Task/task.actions';
import { Observable } from 'rxjs';
import { TaskBaseComponent } from '../task-base/task-base.component';
import { Board } from '../../store/entities/entities';

@Component({
  selector: 'app-list-lists',
  templateUrl: './lists-list.component.html',
  styleUrls: ['./lists-list.component.css', '../../app.component.css']
})
export class ListsListComponent extends TaskBaseComponent implements OnInit {

  todo$: Observable<Task[]>;
  inProgress$: Observable<Task[]>;
  done$: Observable<Task[]>;

  currentBoard$: Observable<Board>;

  constructor(
    protected dialog: MatDialog,
    protected store: Store<State>,
  ) {
    super(dialog, store);
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
    this.currentBoard$ = this.store.select(selectCurrentBoard);
  }

}
