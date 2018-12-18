import { Component } from '@angular/core'
import { Place } from 'src/app/utils/place'
import { ActivatedRoute } from '@angular/router'
import { FirestoreService } from 'src/app/core/firestore.service'
import { MatDialog } from '@angular/material'
import { NewPlaceDialogComponent } from './new-place-dialog/new-place-dialog.component'
import { firestore } from 'firebase';
import { NewDescriptionDialogComponent } from './new-description-dialog/new-description-dialog.component';

@Component({
    selector: 'app-places',
    templateUrl: './places.component.html',
    styleUrls: ['./places.component.scss']
})
export class PlacesComponent {

    places: Place[]
    associationId: string

    constructor(private router: ActivatedRoute, private firestore: FirestoreService, public dialog: MatDialog) {
        this.router.parent.params.subscribe(params => {
            this.firestore.getPlaces(params.associationId).subscribe(places => {
                this.places = places
                console.log(this.places)
            })

            this.associationId = params.associationId
        })
    }

    changeDefaultDescription(placeIndex, defaultDescription) {
        //set the default description of the selected place
        this.firestore.setDefaultDescription(this.places[placeIndex].placeId, defaultDescription)
    }

    addPlace() {
        const dialogRef = this.dialog.open(NewPlaceDialogComponent, null);
      
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);

            //check if the result is valid
            if(result != undefined) if(result.title != undefined && result.address != undefined) {
                //create the new place

                this.firestore.createNewPlace({
                    association: this.associationId,
                    title: result.title,
                    address: result.address
                } as Place);
            }
        });
    }

    addDescription() {
        this.dialog.open(NewDescriptionDialogComponent).afterClosed().subscribe(result => {
            if(result != undefined) {
                console.log(result)

                //we can save the new description
            }
        })
    }
}
