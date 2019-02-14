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

    mode: 'create' | 'edit' = 'create'

    constructor(public dialogRef: MatDialogRef<NewDescriptionDialogComponent>, @Inject(MAT_DIALOG_DATA) private descriptionData: Description, public snackBar: MatSnackBar) {
        //check if the dialog has been opened in edit mode
        if(this.descriptionData != undefined) {
            this.mode = 'edit'

            Object.assign(this.description, descriptionData)
        }

        console.log(this.description)
    }

    saveDescription() {
        console.log(this.description)
        //check the data
        if(this.description.en != undefined || this.description.it != undefined) {
            //if the dialog is in edit mode
            if(this.mode == 'edit') {
                //check if the data has been modified
                let modified = false

                this.description.languages.forEach(language => {
                    if(this.description[language] != this.descriptionData[language]) {
                        modified = true
                    }
                })

                if(modified) {
                    console.log('data modified')
                    this.dialogRef.close(this.description)
                } else {
                    this.dialogRef.close(undefined)
                }
            } else {
                //the dialog was opened in create mode
                this.dialogRef.close(this.description)
            }
        } else {
            //show a snack bar to warn the user
            this.snackBar.open("Fill at least one language", null, { duration: 3000 })
        }
    }

    deleteDescription() {
        //return delete
        this.dialogRef.close('delete')
    }
}
