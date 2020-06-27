import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../store/Entities/User/user.model';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Task} from '../store/Entities/Task/task.model';

@Injectable({providedIn: 'root'})
export class TaskService {

  public constructor(private httpClient: HttpClient) {
  }

  /** returns user based on google id (if user does not exist, user is created)
   * @returns list of user's tasks
   */
  public getUserTasks(user: User): Observable<Task[]> {
    const finalPath = `${environment.host()}/api/tasks/${user.google_id}`;
    return this.httpClient.get(finalPath, {observe: 'response'}).pipe(
      map(resp => {
        const tasks = resp.body as Task [];
        return tasks;
      })
    );
  }

  /** adds new task
   * @returns new task
   */
  public addTask(user: User, task: Task): Observable<Task> {
    const finalPath = `${environment.host()}/api/tasks/${user.google_id}`;
    return this.httpClient.post(finalPath, task, {observe: 'response'}).pipe(
      map(resp => {
        const newTask = resp.body as Task;
        return newTask;
      })
    );
  }

  /** updates task
   * @returns user object
   */
  public updateTask(task: Task): Observable<Task> {
    const finalPath = `${environment.host()}/api/tasks/${task.id}`;
    return this.httpClient.put(finalPath, task, {observe: 'response'}).pipe(
      map(resp => {
        const updatedTask = resp.body as Task;
        return updatedTask;
      })
    );
  }
}