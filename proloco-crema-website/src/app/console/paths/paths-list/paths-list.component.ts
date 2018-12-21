import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { Path } from 'src/app/utils/path'

@Component({
    selector: 'app-paths-list',
    templateUrl: './paths-list.component.html',
    styleUrls: ['./paths-list.component.scss']
})
export class PathsListComponent implements OnChanges {
  
    @Input() paths: Path[]

    constructor() { }

    ngOnChanges(changes: SimpleChanges) {
        this.paths = changes.paths.currentValue as Path[]
        console.log(this.paths)
    }

}
