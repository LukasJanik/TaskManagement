
import { Board } from '../store/entities/entities';
import { Injectable } from '@angular/core';
import * as boardData from '../store/data/data.json';

@Injectable({providedIn: 'root'})
export class DataService {

  public constructor() {
  }

  /** returns all user's defined boards stored in local json file
   * @returns list of user's boards
   */
  public getBoardData(): Board[] {
    const boards = boardData.boards as any;
    return boards as Board[];
  }
}
