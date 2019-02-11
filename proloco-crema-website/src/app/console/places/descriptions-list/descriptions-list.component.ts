import { Component, Input, OnInit } from '@angular/core'
import { Description } from 'src/app/utils/description'
import { MatDialog } from '@angular/material'
import { NewDescriptionDialogComponent } from '../new-description-dialog/new-description-dialog.component'
import { FirestoreService } from 'src/app/core/firestore.service';

@Component({
    selector: 'app-descriptions-list',
    templateUrl: './descriptions-list.component.html',
    styleUrls: ['./descriptions-list.component.scss']
})
export class DescriptionsListComponent implements OnInit {

    @Input() descriptions: Description[]
    @Input() placeId: string
    @Input() editable: boolean

    constructor(public dialog: MatDialog, public firestore: FirestoreService) {}

    ngOnInit() {
        console.log('Is descriptions list editable? ', this.editable)
    }

    showDescription(description: Description) {
        console.log('Show description details')
        //if the list is editable show the dialog to edit the content
        if(this.editable) {
            //open the new place dialog in edit mode
            const dialogRef = this.dialog.open(NewDescriptionDialogComponent, { data: description });

            dialogRef.afterClosed().subscribe(result => {
                console.log('The edit dialog was closed', result);

                //check the data
                if(result != undefined) {
                    //find the description index in the array
                    let index = this.descriptions.indexOf(description)
                    //check if the user wants to delete the description or edit one
                    if(result === 'delete') {
                        console.log('delete description !')
                        this.descriptions.splice(index, 1)
                    } else {
                        //update the data in the firestore
                        this.descriptions[index] = result
                    }
                    console.log(index, this.placeId, this.descriptions)
                    this.firestore.updatePlaceDescriptions(this.placeId, this.descriptions)
                }
            });
        }
    }
}
