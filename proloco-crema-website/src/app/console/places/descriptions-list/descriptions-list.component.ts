import { Component, Input, OnInit } from '@angular/core'
import { Description } from 'src/app/utils/description';

@Component({
    selector: 'app-descriptions-list',
    templateUrl: './descriptions-list.component.html',
    styleUrls: ['./descriptions-list.component.scss']
})
export class DescriptionsListComponent implements OnInit {

    @Input() descriptions: Description[]
    @Input() editable: any

    constructor() {}

    ngOnInit() {
        console.log('Is descriptions list editable? ', this.editable)
    }


    showDescription(description: Description) {
        console.log('Show description', description)
    }
}
