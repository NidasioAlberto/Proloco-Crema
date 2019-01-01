import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { Path } from 'src/app/utils/path'
import { FirestoreService } from 'src/app/core/firestore.service';

@Component({
    selector: 'app-paths-list',
    templateUrl: './paths-list.component.html',
    styleUrls: ['./paths-list.component.scss']
})
export class PathsListComponent implements OnChanges {
  
    @Input() paths: Path[]

    currentOpened: number

    constructor(public firestore: FirestoreService) { }

    ngOnChanges(changes: SimpleChanges) {
        this.paths = changes.paths.currentValue as Path[]
    }

    panelOpened(index: number) {
        console.log(index)
        this.currentOpened = index

        //load the places data for the opened path
        this.paths[index].places.forEach(place => {
            this.firestore.getPlace(place).subscribe(place => {
                console.log(place)
            })
        })
    }

}
