import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { TemplateRef } from '@angular/core';
import { CommonDialogData } from '../definitions/types';

export function openDialog(dialog: MatDialog,
                           component: ComponentType<{}> | TemplateRef<{}>,
                           modalData: CommonDialogData): Promise<string> {
  const dialogRef = dialog.open(component, {
    width: '500px',
    data: modalData
  });

  return new Promise((resolve, reject) => {
    dialogRef.afterClosed().toPromise()
      .then(result => {
        return result ? resolve(result) : reject();
      });
  });
}
