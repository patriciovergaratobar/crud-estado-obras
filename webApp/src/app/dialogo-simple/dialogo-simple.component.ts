import { Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  contenido: string;
  titulo: string;
  salirText: string;
}
@Component({
  selector: 'app-dialogo-simple',
  templateUrl: './dialogo-simple.component.html',
  styleUrls: ['./dialogo-simple.component.css']
})
export class DialogoSimpleComponent {

  constructor(public dialogRef: MatDialogRef<DialogoSimpleComponent>,
     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
  close(): void {

    this.dialogRef.close();
  }

}
