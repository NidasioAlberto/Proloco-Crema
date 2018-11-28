import { Component } from '@angular/core'
import { Place } from 'src/app/utils/place'
import { ActivatedRoute } from '@angular/router'
import { FirestoreService } from 'src/app/core/firestore.service'

@Component({
    selector: 'app-places',
    templateUrl: './places.component.html',
    styleUrls: ['./places.component.scss']
})
export class PlacesComponent {

    places: Place[]
    associationId: string

    constructor(private router: ActivatedRoute, private firestore: FirestoreService) {
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

    }
}
