import {createReducer, on} from '@ngrx/store';
import {Status, Task} from './task.model';
import * as TaskActions from './task.actions';
import {moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

export const tasksFeatureKey = 'tasks';

export interface State {
  todo: Task[];
  in_progress: Task[];
  done: Task[];
}

export const initialState: State = {
  todo: [],
  in_progress: [],
  done: []
};

function updateTaskList(taskList: Task[], updatedTask: Task, targetId?: number): Task[] {
  const id = targetId ? targetId : updatedTask.id;
  return taskList.map(task => task.id === id ? updatedTask : task);
}

export const reducer = createReducer(
  initialState,
  on(TaskActions.addTask,
    (state, action) => {
      return Object.assign({}, {
        todo: [...state.todo, Object.assign({}, action.task, {status: Status.todo, index: state.todo.length})],
        in_progress: state.in_progress,
        done: state.done
      });
    }
  ),

  on(TaskActions.addedTask,
    (state, action) => {
      return Object.assign(
        {},
        {
          todo: updateTaskList(state.todo, action.remoteTask, action.localTask.id),
          in_progress: state.in_progress,
          done: state.done
        });
    }
  ),

  on(TaskActions.updateTask,
    (state, action) => {
      const status = action.task.status;
      return Object.assign(
        {},
        {
          todo: status === Status.todo ? updateTaskList(state.todo, action.task) : state.todo,
          in_progress: status === Status.inProgress ? updateTaskList(state.in_progress, action.task) : state.in_progress,
          done: status === Status.done ? updateTaskList(state.done, action.task) : state.done
        });
    }
  ),
  on(TaskActions.removeTask,
    (state, action) => {
      const status = action.task.status;
      const filter = (taskList: Task[]) => taskList.filter(taskItem => taskItem.id !== action.task.id);
      return Object.assign(
        {},
        {
          todo: status === Status.todo ? filter(state.todo) : state.todo,
          in_progress: status === Status.inProgress ? filter(state.in_progress) : state.in_progress,
          done: status === Status.done ? filter(state.done) : state.done
        });
    }
  ),
  on(TaskActions.loadedTasks,
    (state, action) => {
      const newState = {todo: [], in_progress: [], done: []};
      action.tasks.forEach(task => {
        newState[task.status].push(task);
      });

      Object.keys(newState).forEach(key => {
        newState[key] = newState[key].sort((a, b) => a.index - b.index);
      });

      return newState;
    }
  ),

  on(TaskActions.dragTask,
    (state, action) => {
      const newState = Object.assign({}, state);
      if (action.previousList === action.currentList) {
        newState[action.currentList] = [...newState[action.currentList]];
        moveItemInArray(newState[action.currentList], action.previousIndex, action.currentIndex);
      } else {
        newState[action.previousList] = [...newState[action.previousList]];
        newState[action.currentList] = [...newState[action.currentList]];
        transferArrayItem(newState[action.previousList],
          newState[action.currentList],
          action.previousIndex,
          action.currentIndex);
      }
      return newState;
    }),

  on(TaskActions.updatedTasks,
    (state, action) => {
      const newState = Object.assign({}, {
        todo: [...state.todo],
        in_progress: [...state.in_progress],
        done: [...state.done]
      });

      action.tasks.forEach(task => {
        newState[task.status][task.index] = Object.assign({}, newState[task.status][task.index], {
          status: task.status,
          index: task.index
        });
      });

      return newState;
    }),
);
