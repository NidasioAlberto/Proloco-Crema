import { Component, OnChanges, Input, SimpleChanges } from '@angular/core'
import { Path } from 'src/app/utils/path'
import { Subscription } from 'rxjs'
import { Place } from 'src/app/utils/place'
import { FirestoreService } from 'src/app/core/firestore.service'
import { DocumentReference } from '@angular/fire/firestore'

@Component({
    selector: 'app-path-map',
    templateUrl: './path-map.component.html',
    styleUrls: ['./path-map.component.scss']
})
export class PathMapComponent implements OnChanges {

    @Input() path: Path

    constructor(public firestore: FirestoreService) { }

    ngOnChanges(changes: SimpleChanges) {
        this.path = changes.path.currentValue as Path
    }

}
