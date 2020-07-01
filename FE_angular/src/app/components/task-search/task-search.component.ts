import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Task} from 'src/app/store/Entities/Task/task.model';
import {Store} from '@ngrx/store';
import {searchResults, State} from '../../store';
import {TaskBaseComponent} from '../task-base/task-base.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css', '../../app.component.css']
})
export class TaskSearchComponent extends TaskBaseComponent implements OnInit {

  searchResults$: Observable<Task[]>;

  constructor(
    protected dialog: MatDialog,
    protected store: Store<State>,
  ) {
    super(dialog, store);
    this.searchResults$ = this.store.select(searchResults);
  }

  ngOnInit(): void {
  }

}
