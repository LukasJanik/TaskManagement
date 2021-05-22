import { createReducer, on } from '@ngrx/store';
import * as TaskActions from './task-lists.actions';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task, Board } from '../entities';

export const tasksFeatureKey = 'tasks';

export const initialState: Board = {
  lists: [],
  id: null,
  name: null,
};

function modifyTaskList(state: Board, listId: number, modification: (list: Task[]) => Task[]): Board {
  return Object.assign({}, state, {
    lists: state.lists.map(list => {
      if (list.id === listId) {
        return Object.assign({}, list, {items: modification(list.items)});
      }
      return list;
    })
  });
}

export const reducer = createReducer(
  initialState,
  on(TaskActions.setBoardData,
    (state, action) => {
      return action.board;
    }
  ),
  on(TaskActions.addedTask,
    (state, action) => {
      return modifyTaskList(state, action.listId, (taskList) => [...taskList, action.task]);
    }
  ),

  on(TaskActions.deletedTask,
    (state, action) => {
      return modifyTaskList(state, action.listId, (taskList) => taskList.filter(task => task.id !== action.taskId));
    }
  ),

  on(TaskActions.deletedTaskList,
    (state, action) => {
      return Object.assign({}, state, {lists: state.lists.filter(list => list.id !== action.listId)});
    }
  ),

  on(TaskActions.addedTaskList,
    (state, action) => {
      return Object.assign({}, state, {lists: [...state.lists, action.taskList]});
    }
  ),

  on(TaskActions.dragTask,
    (state, action) => {
      const newState = Object.assign({}, state, {lists: [...state.lists]});
      const beforeSwap = (id: number): number => {
        const index = newState.lists.findIndex(list => list.id === id);
        newState.lists[index] = Object.assign(
          {},
          newState.lists[index],
          {items: [...newState.lists[index].items]}
        );
        return index;
      };

      if (action.previousListId === action.currentListId) {
        const currentListIndex = beforeSwap(action.currentListId);
        moveItemInArray(newState.lists[currentListIndex].items, action.previousIndex, action.currentIndex);
      } else {
        const previousListIndex = beforeSwap(action.previousListId);
        const currentListIndex = beforeSwap(action.currentListId);

        transferArrayItem(
          newState.lists[previousListIndex].items,
          newState.lists[currentListIndex].items,
          action.previousIndex,
          action.currentIndex
        );
      }
      return newState;
    }),
);
