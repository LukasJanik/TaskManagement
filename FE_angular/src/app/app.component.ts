import {Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './store';
import { reloadBoards } from './store/entities/board/board.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private store: Store<State>) {}

  reloadBoards(): void {
    this.store.dispatch(reloadBoards({}));
  }
}
