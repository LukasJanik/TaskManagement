import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../store/Entities/Task/task.model';
import { NgForm } from '@angular/forms';
import { CommonDialogData } from '../../definitions/types';

@Component({
  selector: 'app-task-detail',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.css', '../../app.component.css']
})
export class CommonDialogComponent {

  @ViewChild('form', {static: false}) form: NgForm;
  public name: string;

  get result(): string {
    return this.name || 'ok';
  }

  constructor(
    public dialogRef: MatDialogRef<CommonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommonDialogData
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
