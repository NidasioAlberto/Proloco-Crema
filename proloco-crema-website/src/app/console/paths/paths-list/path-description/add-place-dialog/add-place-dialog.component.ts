import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Place } from 'src/app/utils/place'
import { FirestoreService } from 'src/app/core/firestore.service'
import { Path } from 'src/app/utils/path'

@Component({
  selector: 'app-add-place-dialog',
  templateUrl: './add-place-dialog.component.html',
  styleUrls: ['./add-place-dialog.component.scss']
})
export class AddPlaceDialogComponent {

  places: Place[]

  constructor(public dialogRef: MatDialogRef<AddPlaceDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: {
    associationId?: string,
    path?: Path,
    places?: Place[]
  }, public firestore: FirestoreService) {
    //check the data, if the association id is specified grab all the places of that association
    if(data.associationId != undefined) {
      this.firestore.getPlaces(data.associationId, data.path).subscribe(places => {
        this.places = places
      })
    }
  }

  //TODO: delete ! this is a test for the add plce dialog
  onSelected(index: number) {
      console.log('index: ', index)
      this.dialogRef.close(this.places[index].placeId)
  }
}