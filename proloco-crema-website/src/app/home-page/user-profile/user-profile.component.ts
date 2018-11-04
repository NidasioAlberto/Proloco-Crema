import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../core/auth.service'
import { FirestoreService } from 'src/app/core/firestore.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    user: firebase.User
    userRole: string = null

    constructor(private auth: AuthService, private firestore: FirestoreService) {
        this.auth.user.subscribe(user => {
            this.user = user
        })

        //test the firestore service
        this.firestore.getUserData().subscribe(data => {
            this.userRole = (<any>data).role
        })
    }

    ngOnInit() {
    }
}
