import { Component, Input } from '@angular/core'
import { Description } from 'src/app/utils/description';

@Component({
    selector: 'app-descriptions-list',
    templateUrl: './descriptions-list.component.html',
    styleUrls: ['./descriptions-list.component.scss']
})
export class DescriptionsListComponent {

    @Input() descriptions: Description[]

    constructor() { }
}
