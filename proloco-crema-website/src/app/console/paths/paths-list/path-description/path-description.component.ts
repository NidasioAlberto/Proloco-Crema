import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { Path } from 'src/app/utils/path'
import { MatDialog, MatSnackBar } from '@angular/material'
import { DeleteConfirmDialogComponent } from 'src/app/console/delete-confirm-dialog/delete-confirm-dialog.component';
import { FirestoreService } from 'src/app/core/firestore.service';

@Component({
    selector: 'app-path-description',
    templateUrl: './path-description.component.html',
    styleUrls: ['./path-description.component.scss']
})
export class PathDescriptionComponent implements OnChanges {
  
    @Input() path: Path

    constructor(public firestore: FirestoreService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

    ngOnChanges(changes: SimpleChanges) {
        this.path = changes.path.currentValue as Path
    }

    onPlaceSelected(index: number) {
        console.log(index)

        this.dialog.open(DeleteConfirmDialogComponent, {
            data: {
                message: "Confermi di rimuovere il monumento dal percorso?"
            }
        }).afterClosed().subscribe((result: boolean) => {
            console.log('The dialog was closed', result);

            //check the result
            if(result) {
                console.log('removing element', index)
                this.path.places.slice(index, 1)
                console.log(this.path)
                //the user wants to delete the path
                this.firestore.removePlaceFromPath(this.path.pathId, this.path.places[index]).then(() => {
                    //the place was delete successfully, show a snackbar
                    this.snackBar.open('Monumento rimosso', undefined, {
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
}
