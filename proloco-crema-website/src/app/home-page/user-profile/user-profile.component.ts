import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../core/auth.service'
import { FirestoreService } from 'src/app/core/firestore.service'
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    user: firebase.User
    userRole: String = null

    constructor(private auth: AuthService, private firestore: FirestoreService, private router: Router) {
        this.auth.user.subscribe(user => {
            this.user = user

            //if the user object is null the user is not logged, redirect to the login page
            if(user == undefined) this.router.navigate(['/public/login'])
        })

        //subscribe to the user data
        this.firestore.user.subscribe(user => {
            if(user != null) this.userRole = user.role
            else this.userRole = null
        })
    }

    ngOnInit() {
    }

    logout() {
        this.auth.logout()
    }

    goToConsole() {
        this.router.navigate(['/console'])
    }
}
