import {createReducer, on} from '@ngrx/store';
import {Status, Task} from './task.model';
import * as TaskActions from './task.actions';

export const tasksFeatureKey = 'tasks';

export interface State {
  toDo: Task[];
  inProgress: Task[];
  done: Task[];
}

export const initialState: State = {
  toDo: [],
  inProgress: [],
  done: []
};


export const reducer = createReducer(
  initialState,
  on(TaskActions.addTask,
    (state, action) => {
      return Object.assign({}, {
        toDo: [...state.toDo, Object.assign({}, action.task, {status: Status.todo})],
        inProgress: state.inProgress,
        done: state.done
      });
    }
  ),
  on(TaskActions.updateTask,
    (state, action) => {
      const status = action.task.status;
      const map = (taskList: Task[], updatedTask: Task) => taskList.map(task => task.id === updatedTask.id ? updatedTask : task);
      return Object.assign(
        {},
        {
          toDo: status === Status.todo ? map(state.toDo, action.task) : state.toDo,
          inProgress: status === Status.inProgress ? map(state.inProgress, action.task) : state.inProgress,
          done: status === Status.done ? map(state.done, action.task) : state.done
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
          toDo: status === Status.todo ? filter(state.toDo) : state.toDo,
          inProgress: status === Status.inProgress ? filter(state.inProgress) : state.inProgress,
          done: status === Status.done ? filter(state.done) : state.done
        });
    }
  ),
);
