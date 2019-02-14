import { Component } from '@angular/core'
import { Path } from 'src/app/utils/path'
import { ActivatedRoute } from '@angular/router'
import { FirestoreService } from 'src/app/core/firestore.service'
import { MatDialog } from '@angular/material'
import { PathDialogComponent } from './path-dialog/path-dialog.component';

@Component({
    selector: 'app-paths',
    templateUrl: './paths.component.html',
    styleUrls: ['./paths.component.scss']
})
export class PathsComponent {

    paths: Path[]
    associationId: string

    constructor(private router: ActivatedRoute, private firestore: FirestoreService, public dialog: MatDialog) {
        this.router.parent.params.subscribe(params => {
            this.associationId = params.associationId
            
            this.firestore.getPaths(this.associationId).subscribe(paths => {
                this.paths = paths
            })
        })
    }

    addPath() {
        this.dialog.open(PathDialogComponent).afterClosed().subscribe((result: Path) => {
            //check the result
            if(result != undefined) {
                result.association = this.associationId
                console.log(result)
                this.firestore.addPath(result)
            }
        })
    }

}
