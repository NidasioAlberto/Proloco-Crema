import { Component, Inject, ElementRef, ViewChild, NgZone, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss']
})
export class DeleteConfirmDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data)
  }

  delete() {
    console.log('delete the place')
    this.dialogRef.close(true)
  }

  close() {
    console.log('close without delete')
    this.dialogRef.close(undefined)
  }
}
