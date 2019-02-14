import { Component } from '@angular/core'
import { Place } from 'src/app/utils/place'
import { ActivatedRoute } from '@angular/router'
import { FirestoreService } from 'src/app/core/firestore.service'
import { MatDialog, MatSnackBar } from '@angular/material'
import { NewPlaceDialogComponent } from './new-place-dialog/new-place-dialog.component'
import { NewDescriptionDialogComponent } from './new-description-dialog/new-description-dialog.component'
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component'
import { Description } from 'src/app/utils/description'

@Component({
    selector: 'app-places',
    templateUrl: './places.component.html',
    styleUrls: ['./places.component.scss']
})
export class PlacesComponent {

    places: Place[]
    associationId: string

    constructor(private router: ActivatedRoute, private firestore: FirestoreService, public dialog: MatDialog, private snackBar: MatSnackBar) {
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
        const dialogRef = this.dialog.open(NewPlaceDialogComponent, undefined);
      
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

    deletePlace(placeId: string) {
        console.log(placeId)
        const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
            data: {
                message: "Confermi di eliminare il monumento?"
            }
        });
      
        dialogRef.afterClosed().subscribe((result: boolean) => {
            console.log('The dialog was closed', result);

            //check the result
            if(result) {
                //the user wants to delete the place
                this.firestore.deletePlace(placeId).then(() => {
                    //the place was delete successfully, show a snackbar
                    this.snackBar.open('Monumento eliminato', undefined, {
                        duration: 3000
                      });
                }).catch(err => {
                    //and error occurred, show a snackbar to warn the user
                    this.snackBar.open('Qualcosa è andato storto', undefined, {
                        duration: 3000
                      });
                })
            } else {
                //the user doen't want to delete the place, good!!
            }
        });
    }

    addDescription(placeId: string) {
        this.dialog.open(NewDescriptionDialogComponent).afterClosed().subscribe(result => {
            if(result != undefined) {
                console.log(result, placeId)

                //we can save the new description
                this.firestore.addDescription(placeId, result as Description)
            }
        })
    }

    editPlace(place: Place) {
        //open the new place dialog in edit mode
        const dialogRef = this.dialog.open(NewPlaceDialogComponent, { data: place });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The edit dialog was closed', result);

            //check the data
            if(result != undefined) {
                //update the data in the firestore
                this.firestore.updatePlace(place.placeId, result).then(() => {
                    console.log('Place updated successfully')
                }).catch((err) => {
                    console.log(err)
                })
            }
        });
    }
}
