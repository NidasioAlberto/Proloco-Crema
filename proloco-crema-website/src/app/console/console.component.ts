import { Component } from '@angular/core'
import { FirestoreService } from '../core/firestore.service'
import { ActivatedRoute } from '@angular/router'
import { Association } from '../utils/user-data';

@Component({
    selector: 'app-console',
    templateUrl: './console.component.html',
    styleUrls: ['./console.component.scss']
})
export class ConsoleComponent {

    association: Association = null
    links = [
        {
            lable: 'Percorsi',
            route: 'paths',
        },
        {
            lable: 'Monumenti',
            route: 'places',
        } 
    ]
    activeLink = this.links[0]

    constructor(private firestore: FirestoreService, private router: ActivatedRoute) {
        this.router.params.subscribe(params => {
            this.firestore.getAssociationData(params.associationId).subscribe((associationData: Association) => {
                this.association = associationData
            })
        })
    }
}
