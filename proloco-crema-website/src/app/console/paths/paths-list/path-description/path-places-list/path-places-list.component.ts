import { Component, OnChanges, Input, SimpleChanges } from '@angular/core'
import { Place } from 'src/app/utils/place'
import { DocumentReference } from '@angular/fire/firestore';
import { FirestoreService } from 'src/app/core/firestore.service';
import { Subscription } from 'rxjs';
import { Description } from 'src/app/utils/description';

@Component({
    selector: 'app-path-places-list',
    templateUrl: './path-places-list.component.html',
    styleUrls: ['./path-places-list.component.scss']
})
export class PathPlacesListComponent implements OnChanges {

    @Input() places: Place[]

    constructor(public firestore: FirestoreService) { }

    ngOnChanges(changes: SimpleChanges) {
        this.places = changes.places.currentValue as Place[]
    }

}
