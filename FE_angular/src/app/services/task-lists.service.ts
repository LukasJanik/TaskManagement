import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Task, TaskList } from '../store/entities/entities';

@Injectable({providedIn: 'root'})
export class TaskListsService {

  public constructor(private httpClient: HttpClient) {
  }

  /** Adds new Task list
   * @returns new Task list
   */
  public addTaskList(boardId: number, name: string): Observable<TaskList> {
    const finalPath = `${environment.host()}/boards/${boardId}/task-list`;
    return this.httpClient.post(finalPath, {name}, {observe: 'response'}).pipe(
      map(resp => {
        return resp.body as TaskList;
      })
    );
  }

  /** Adds new Task
   * @returns new Task list
   */
  public addTask(boardId: number, listId: number, name: string): Observable<Task> {
    const finalPath = `${environment.host()}/boards/${boardId}/task-list/${listId}/task`;
    return this.httpClient.post(finalPath, {boardId, listId, name}, {observe: 'response'}).pipe(
      map(resp => {
        return resp.body as Task;
      })
    );
  }

  /** Deletes Task List
   * @returns True/False
   */
  public deleteTaskList(boardId: number, listId: number): Observable<boolean> {
    const finalPath = `${environment.host()}/boards/${boardId}/task-list/${listId}`;
    return this.httpClient.delete(finalPath, {observe: 'response'}).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  /** Deletes Task
   * @returns True/False
   */
  public deleteTask(boardId: number, listId: number, taskId: number): Observable<boolean> {
    const finalPath = `${environment.host()}/boards/${boardId}/task-list/${listId}/task/${taskId}`;
    return this.httpClient.delete(finalPath, {observe: 'response'}).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  /** Updates TaskLists after Drag&Drop
   * @returns True/False
   */
  public updateTaskLists(boardId: number, lists: TaskList[]): Observable<boolean> {
    const finalPath = `${environment.host()}/boards/${boardId}/task-list`;
    return this.httpClient.put(finalPath, {lists}, {observe: 'response'}).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
