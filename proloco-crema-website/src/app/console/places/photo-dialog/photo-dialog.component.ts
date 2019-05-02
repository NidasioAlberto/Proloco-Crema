import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Place } from 'src/app/utils/place'
import { FirestoreService } from 'src/app/core/firestore.service'
import { AngularFireStorage } from '@angular/fire/storage'
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.scss']
})
export class PhotoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PhotoDialogComponent>, @Inject(MAT_DIALOG_DATA) public place: Place, public firestore: FirestoreService, private storage: AngularFireStorage) { }

  ngOnInit() {
    console.log(this.place)

    if(this.place.photoUrl == undefined) {
      console.log('Photo missing, opnening file selector')
      let fileSelector = document.querySelector('#file') as HTMLElement
      fileSelector.click()
    }
  }

  close() {
    this.dialogRef.close(undefined)
  }

  addPhoto() {
    const inputNode: any = document.querySelector('#file')

    let file = inputNode.files[0]

    let fileRef = this.storage.ref('Places/' + this.place.placeId)
    
    fileRef.put(file).snapshotChanges().pipe(
      finalize(async () => {
        let link = await fileRef.getDownloadURL().toPromise()

        this.place.photoUrl = link
        this.firestore.setPhotoUrlToPlace(this.place.placeId, link)
      })
    ).subscribe()
  }
}
