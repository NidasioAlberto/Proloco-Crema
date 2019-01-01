import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { Path } from 'src/app/utils/path'

@Component({
    selector: 'app-path-description',
    templateUrl: './path-description.component.html',
    styleUrls: ['./path-description.component.scss']
})
export class PathDescriptionComponent implements OnChanges {
  
    @Input() path: Path

    constructor() { }

    ngOnChanges(changes: SimpleChanges) {
        this.path = changes.path.currentValue as Path
    }

}
