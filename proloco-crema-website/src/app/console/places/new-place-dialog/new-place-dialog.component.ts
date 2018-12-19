import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Place } from '../../../utils/place'

@Component({
    selector: 'app-new-place-dialog',
    templateUrl: './new-place-dialog.component.html',
    styleUrls: ['./new-place-dialog.component.scss']
})
export class NewPlaceDialogComponent {

    mode: 'create' | 'edit' = 'create'

    outData: Place = {
        title: '',
        address: '',
    }

    constructor(public dialogRef: MatDialogRef<NewPlaceDialogComponent>, @Inject(MAT_DIALOG_DATA) public placeToEdit: Place) {
        //if placeToEdit isn't undefined display the values and set the dialog in edit mode
        if(placeToEdit != undefined) {
            this.mode = 'edit'

            //copy only the title and the address to update only then when writing to the database
            this.outData.title = placeToEdit.title
            this.outData.address = placeToEdit.address

            console.log('Dialog now in edit mode')
        }
    }

    saveNewPlace() {
        //if in edit mode compare the data against the previous one
        if(this.mode == 'edit') {
            if(this.placeToEdit.title == this.outData.title && this.placeToEdit.address == this.outData.address) {
                console.log('The data are still the same')
                //since they haven't been modified we won't make an update to the database
                this.dialogRef.close(undefined)

                //return to end the function
                return
            }
        }

        //close the dialog with the given data
        this.dialogRef.close(this.outData)
    }
}
