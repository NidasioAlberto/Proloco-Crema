import { Component, Inject, ElementRef, ViewChild, NgZone, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Place } from '../../../utils/place'
import { MapsAPILoader } from '@agm/core'
import { firestore } from 'firebase'
import { Autocomplete, PlaceResult } from 'googlemaps'

@Component({
    selector: 'app-new-place-dialog',
    templateUrl: './new-place-dialog.component.html',
    styleUrls: ['./new-place-dialog.component.scss']
})
export class NewPlaceDialogComponent implements OnInit {

    mode: 'create' | 'edit' = 'create'

    outData: Place = {
        title: '',
        address: {
            title: ''
        },
    }

    public latitude: number;
    public longitude: number;
    public zoom: number;
    
    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(public dialogRef: MatDialogRef<NewPlaceDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public placeToEdit: Place,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone) {
        //if placeToEdit isn't undefined display the values and set the dialog in edit mode
        if(placeToEdit != undefined) {
            this.mode = 'edit'

            //copy only the title and the address to update only then when writing to the database
            this.outData.title = placeToEdit.title
            this.outData.address.title = placeToEdit.address.title
            if(placeToEdit.address.geopoint != undefined) {
                this.outData.address.geopoint = new firestore.GeoPoint(
                    placeToEdit.address.geopoint.latitude,
                    placeToEdit.address.geopoint.longitude)
            }

            console.log('Dialog now in edit mode')
        }

        console.log(this.outData)
    }

    ngOnInit() {
        //set the map if the address geopoint isn't null
        if(this.outData.address.geopoint != undefined) {
            this.latitude = this.outData.address.geopoint.latitude
            this.longitude = this.outData.address.geopoint.longitude
            this.zoom = 12

            console.log('the map should show the place location')
        } else {
            //set google maps defaults
            this.zoom = 4
            this.latitude = 39.8282
            this.longitude = -98.5795
        }
        
        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    
                    //set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;

                    //save the latitude and longiture also in outputdata
                    this.outData.address.geopoint = new firestore.GeoPoint(this.latitude, this.longitude)
                    console.log('data changed', this.outData)
                });
            });
        });
    }
    
    savePlace() {
        //if in edit mode compare the data against the previous one
        console.log(this.placeToEdit, this.outData)
        if(this.mode == 'edit') {
            if(this.placeToEdit.title == this.outData.title
                && this.placeToEdit.address.title == this.outData.address.title
                && (
                    this.placeToEdit.address.geopoint == this.outData.address.geopoint
                    || this.outData.address.geopoint == null)) {
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

    close() {
        this.dialogRef.close(undefined)
    }
}
