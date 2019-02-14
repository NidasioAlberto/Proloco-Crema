import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Path } from 'src/app/utils/path'

@Component({
  selector: 'app-path-dialog',
  templateUrl: './path-dialog.component.html',
  styleUrls: ['./path-dialog.component.scss']
})
export class PathDialogComponent {

    mode: 'create' | 'edit' = 'create'

    outData: Path = {
        title: {
            it: ''
        },
        description: {
            it: ''
        },
        association: ''
    }

    constructor(public dialogRef: MatDialogRef<PathDialogComponent>, @Inject(MAT_DIALOG_DATA) private pathToEdit: Path) {
        console.log(pathToEdit)
        if(pathToEdit != undefined) {
            this.mode = 'edit'

            this.outData.title.it = pathToEdit.title.it
            this.outData.description.it = pathToEdit.description.it
            this.outData.association = pathToEdit.association
        }
    }

    savePath() {
        //che the data and return
        if(this.mode == 'edit') {
            if(this.pathToEdit.title.it == this.outData.title.it
                && this.pathToEdit.description.it == this.outData.description.it) {
                console.log('The data are still the same')
                //since they haven't been modified we won't make an update to the database
                this.dialogRef.close(undefined)

                return
            }
        }
        
        if(this.outData.title.it != '' && this.outData.description.it != '') {
            this.dialogRef.close(this.outData)
        }
    }
}
