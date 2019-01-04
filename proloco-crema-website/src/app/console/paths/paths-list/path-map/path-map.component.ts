import { Component, OnChanges, Input, SimpleChanges } from '@angular/core'
import { FirestoreService } from 'src/app/core/firestore.service'
import { Place } from 'src/app/utils/place'

@Component({
    selector: 'app-path-map',
    templateUrl: './path-map.component.html',
    styleUrls: ['./path-map.component.scss']
})
export class PathMapComponent implements OnChanges {

    @Input()
    places: Place[]
    mapConfig: {
        latitude: number
        longitude: number
        zoom: number
    } = {
        latitude: 0,
        longitude: 0,
        zoom: 0
    }

    constructor(public firestore: FirestoreService) { }

    ngOnChanges(changes: SimpleChanges) {
        this.places = changes.places.currentValue as Place[]

        this.prepareMapConfig()
    }

    prepareMapConfig() {
        var latMax = 0
        var latMin = -1
        var lngMax = 0
        var lngMin = -1

        if(this.places != undefined) {
            this.places.forEach(place => {
                if(latMax < place.address.geopoint.latitude) latMax = place.address.geopoint.latitude
                if(latMin > place.address.geopoint.latitude || latMin == -1) latMin = place.address.geopoint.latitude
                if(lngMax < place.address.geopoint.longitude) lngMax = place.address.geopoint.longitude
                if(lngMin > place.address.geopoint.longitude || lngMin == -1) lngMin = place.address.geopoint.longitude
            })

            //compute the middle
            this.mapConfig.latitude = latMin + (latMax - latMin)/2
            this.mapConfig.longitude = lngMin + (lngMax - lngMin)/2
            this.mapConfig.zoom = 14
        }
    }

}
