import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material'
import { Description } from 'src/app/utils/description'

@Component({
    selector: 'app-new-description-dialog',
    templateUrl: './new-description-dialog.component.html',
    styleUrls: ['./new-description-dialog.component.scss']
})
export class NewDescriptionDialogComponent {

    //we wont fill the languages parameter, it is not necessary to store it in the firestore
    description: Description = {
        it: undefined,
        en: undefined,
        languages: ['it', 'en'],
    }

    constructor(public dialogRef: MatDialogRef<NewDescriptionDialogComponent>, @Inject(MAT_DIALOG_DATA) private inData: any, public snackBar: MatSnackBar) { }

    saveNewDescription() {
        //check the data
        if(this.description.en != undefined || this.description.it != undefined) {
            this.description.languages = undefined
            this.dialogRef.close(this.description)
        } else {
            //show a snack bar to warn the user
            this.snackBar.open("Fill at least one language")
        }
    }
}
