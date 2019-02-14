import { Component, OnChanges, Input, SimpleChanges, EventEmitter, Output } from '@angular/core'
import { Place } from 'src/app/utils/place'

@Component({
    selector: 'app-path-places-list',
    templateUrl: './path-places-list.component.html',
    styleUrls: ['./path-places-list.component.scss']
})
export class PathPlacesListComponent implements OnChanges {

    @Input() places: Place[]
    @Output() onSelected: EventEmitter<number> = new EventEmitter()

    constructor() { }

    ngOnChanges(changes: SimpleChanges) {
        this.places = changes.places.currentValue as Place[]
    }

    placeSelected(index) {
        this.onSelected.emit(index)
    }

}
