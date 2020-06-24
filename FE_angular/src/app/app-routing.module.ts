import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {TaskListComponent} from './components/task-list/task-list.component';
import {CurrentUserGuard} from './guards/currentUser.guard';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'tasks', component: TaskListComponent,
    canActivate: [CurrentUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
