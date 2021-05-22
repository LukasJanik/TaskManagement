import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Board } from '../store/entities/entities';

@Injectable({providedIn: 'root'})
export class BoardService {

  public constructor(private httpClient: HttpClient) {
  }

  /** returns user based on google id (if user does not exist, user is created)
   * @returns list of user's tasks
   */
  public getBoards(): Observable<Board[]> {
    const finalPath = `${environment.host()}/boards`;
    return this.httpClient.get(finalPath, {observe: 'response'}).pipe(
      map(resp => {
        const body = resp.body as any;
        return body.boards as Board[];
      })
    );
  }

  /** adds new board
   * @returns new board
   */
  public addBoard(name: string): Observable<Board> {
    const finalPath = `${environment.host()}/boards`;
    return this.httpClient.post(finalPath, {name}, {observe: 'response'}).pipe(
      map(resp => {
        return resp.body as Board;
      })
    );
  }

  /** adds new board
   * @returns remove board
   */
  public deleteBoard(id: number): Observable<boolean> {
    const finalPath = `${environment.host()}/boards/${id}`;
    return this.httpClient.delete(finalPath, {observe: 'response'}).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  //
  // /** removes specific task
  //  * @returns success/fail
  //  */
  // public removeTask(task: Task): Observable<boolean> {
  //   const finalPath = `${environment.host()}/api/tasks/${task.id}`;
  //   return this.httpClient.delete(finalPath, {observe: 'response'}).pipe(
  //     map(resp => {
  //       return true;
  //     })
  //   );
  // }
  //
  // /** updates task
  //  * @returns user object
  //  */
  // public updateTask(task: Task): Observable<Task> {
  //   const finalPath = `${environment.host()}/api/tasks/${task.id}`;
  //   return this.httpClient.put(finalPath, task, {observe: 'response'}).pipe(
  //     map(resp => {
  //       const updatedTask = resp.body as Task;
  //       return updatedTask;
  //     })
  //   );
  // }
  //
  // /** updates tasks after dragging
  //  * @returns user object
  //  */
  // public updateTasks(tasks: Task[]): Observable<Task[]> {
  //   const finalPath = `${environment.host()}/api/tasks`;
  //   return this.httpClient.put(finalPath, tasks, {observe: 'response'}).pipe(
  //     map(resp => {
  //       const updatedTasks = resp.body as Task[];
  //       return updatedTasks;
  //     })
  //   );
  // }
}
