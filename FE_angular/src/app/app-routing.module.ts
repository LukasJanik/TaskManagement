import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardListComponent } from './components/board-list/board-list.component';
import { TaskListsComponent } from './components/task-lists/task-lists.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'boards', pathMatch: 'full'
  },
  {
    path: 'boards', component: BoardListComponent,
  },
  {
    path: 'boards/:id', component: TaskListsComponent,
  },
  {
    path: 'tasks', component: TaskListsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
