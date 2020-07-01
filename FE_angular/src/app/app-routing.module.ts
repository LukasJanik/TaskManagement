import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {TaskListComponent} from './components/task-list/task-list.component';
import {CurrentUserGuard} from './guards/currentUser.guard';
import {TaskSearchComponent} from './components/task-search/task-search.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'tasks', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'tasks', component: TaskListComponent,
    canActivate: [CurrentUserGuard]
  },
  {
    path: 'search', component: TaskSearchComponent,
    canActivate: [CurrentUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
