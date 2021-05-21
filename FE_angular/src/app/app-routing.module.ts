import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardListComponent } from './components/board-list/board-list.component';
import { ListsListComponent } from './components/lists-list/lists-list.component';
import { TaskSearchComponent } from './components/task-search/task-search.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'tasks', pathMatch: 'full'
  },
  {
    path: 'boards', component: BoardListComponent,
  },
  {
    path: 'boards/:id', component: ListsListComponent,
  },
  {
    path: 'tasks', component: ListsListComponent,
  },
  {
    path: 'search', component: TaskSearchComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
