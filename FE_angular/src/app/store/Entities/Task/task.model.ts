export enum Status {
  todo = 'todo',
  inProgress = 'in_progress',
  done = 'done'
}

// export interface Task {
//   id?: number;
//   name: string;
//   description?: string;
//   due_date?: string;
//   importance?: number;
//   status: Status;
// }

export class Task {
  id?: number;
  name: string;
  description?: string;
  due_date?: number;
  importance?: number;
  status: Status;

  constructor() {
    [this.name, this.description, this.due_date] = [null, null, null];
    this.importance = 1;
    this.status = Status.todo;
  }
}
