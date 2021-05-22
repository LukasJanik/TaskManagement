export interface Board {
  name: string;
  id: number;
  lists: TaskList[];
}

export interface TaskList {
  items: Task[];
  name: string;
  id: number;
}

export interface Task {
  name: string;
  id: number;
}
