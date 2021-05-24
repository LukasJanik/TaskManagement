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

  /** Returns user defined boards
   * @returns list of user's boards
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

  /** Adds new board
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

  /** Deletes board
   * @returns True/False
   */
  public deleteBoard(id: number): Observable<boolean> {
    const finalPath = `${environment.host()}/boards/${id}`;
    return this.httpClient.delete(finalPath, {observe: 'response'}).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
