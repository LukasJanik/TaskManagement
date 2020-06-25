export enum Status {
  todo = 'todo',
  inProgress = 'in_progress',
  done = 'done'
}

export class Task {
  id: number;
  name: string;
  description?: string;
  due_date?: number;
  importance?: number;
  status: Status;

  constructor() {
    [this.name, this.description, this.due_date] = [null, null, null];
    this.id = Date.now();
    this.importance = 1;
    this.status = Status.todo;
  }
}
