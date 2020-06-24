import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Task} from '../../store/Entities/Task/task.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css', '../../app.component.css']
})
export class TaskDetailComponent implements OnInit {

  @ViewChild('form', {static: false}) form: NgForm;

  title: string = null;

  constructor(
    public dialogRef: MatDialogRef<TaskDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
  }

  ngOnInit(): void {
    [this.title, this.data] = !!this.data ? ['Edit task', this.data] : ['Create new task', new Task()];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
