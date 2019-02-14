import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { Path } from 'src/app/utils/path'
import { FirestoreService } from 'src/app/core/firestore.service'
import { MatDialog, MatSnackBar } from '@angular/material'
import { ActivatedRoute } from '@angular/router'
import { AddPlaceDialogComponent } from './path-description/add-place-dialog/add-place-dialog.component';
import { PathDialogComponent } from '../path-dialog/path-dialog.component';
import { DeleteConfirmDialogComponent } from '../../delete-confirm-dialog/delete-confirm-dialog.component';


@Component({
    selector: 'app-paths-list',
    templateUrl: './paths-list.component.html',
    styleUrls: ['./paths-list.component.scss']
})
export class PathsListComponent implements OnChanges {
  
    @Input() paths: Path[]

    currentOpened: number
    associationId: string

    constructor(public firestore: FirestoreService, public dialog: MatDialog, private router: ActivatedRoute, public snackBar: MatSnackBar) {
        this.router.parent.params.subscribe(params => {
            this.associationId = params.associationId
        })
    }

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

    deletePath(pathId: string) {
        this.dialog.open(DeleteConfirmDialogComponent, {
            data: {
                message: "Confermi di eliminare il percorso?"
            }
        }).afterClosed().subscribe((result: boolean) => {
            console.log('The dialog was closed', result);

            //check the result
            if(result) {
                //the user wants to delete the path
                this.firestore.deletePath(pathId).then(() => {
                    //the place was delete successfully, show a snackbar
                    this.snackBar.open('Percorso eliminato', undefined, {
                        duration: 3000
                      });
                }).catch(err => {
                    //and error occurred, show a snackbar to warn the user
                    this.snackBar.open('Qualcosa è andato storto', undefined, {
                        duration: 3000
                      });
                })
            } else {
                //the user doen't want to delete the place, good!!
            }
        });
    }

    editPath(path: Path) {
        this.dialog.open(PathDialogComponent, { data: path }).afterClosed().subscribe(result => {
            console.log('The edit dialog was closed', result);

            //check the data
            if(result != undefined) {
                //update te path data
                this.firestore.updatePath(result, path.pathId)
            }
        });
    }

    addPlace(path: Path) {
        this.dialog.open(AddPlaceDialogComponent, {
            data: {
                associationId: this.associationId,
                pathId: path.pathId,
                path: path
            }
        }).afterClosed().subscribe(placeId => {
            if(placeId != undefined) {
                //add the place to the path
                this.firestore.addPlaceToPath(path.pathId, placeId)
            }
        })
    }

    panleOpened(pathIndex) {
        console.log(pathIndex)
    }
}
