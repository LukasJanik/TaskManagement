import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../store/Entities/Task/task.model';
import {State} from '../../store';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css', '../../app.component.css']
})
export class TaskListItemComponent implements OnInit {
  @Input() task: Task = null;
  @Output() showDetails: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private store: Store<State>
  ) {
  }

  ngOnInit(): void {
  }

  delete(): void {

  }

}