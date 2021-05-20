import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BoardListComponent} from './components/board-list/board-list.component';
import {TaskListComponent} from './components/task-list/task-list.component';
import {TaskSearchComponent} from './components/task-search/task-search.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'tasks', pathMatch: 'full'
  },
  {
    path: 'login', component: BoardListComponent
  },
  {
    path: 'tasks', component: TaskListComponent,
  },
  {
    path: 'search', component: TaskSearchComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
