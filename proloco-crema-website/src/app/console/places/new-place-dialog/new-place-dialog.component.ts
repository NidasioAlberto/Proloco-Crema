import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
    selector: 'app-new-place-dialog',
    templateUrl: './new-place-dialog.component.html',
    styleUrls: ['./new-place-dialog.component.scss']
})
export class NewPlaceDialogComponent {

    outData: any = {}

    constructor(public dialogRef: MatDialogRef<NewPlaceDialogComponent>, @Inject(MAT_DIALOG_DATA) private inData: any) { }

    saveNewPlace() {
        //close the dialog with the given data
        this.dialogRef.close(this.outData)
    }
}
