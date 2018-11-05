import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../core/auth.service'
import { FirestoreService } from '../core/firestore.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

    userPhotoUrl: String = null
    links = [
        {
            lable: 'Home',
            route: 'home',
        },
        {
            lable: 'How to',
            route: 'how-to',
        },
        {
            lable: 'About',
            route: 'about',
        } 
    ]
    activeLink = this.links[0]

    goToConsoleVisible: boolean = false

    constructor(private router: Router, private auth: AuthService, private firestore: FirestoreService) {
        //subscribe to the user account to show the photo in the top right
        this.auth.user.subscribe(user => {
            if(user != undefined) this.userPhotoUrl = user.photoURL
        }, err => {
            console.log('error !', err)
        })

        //subscribe to the user data to show or not the "go to console button"
        this.firestore.user.subscribe(user => {
            console.log('new user data !', user)
            this.goToConsoleVisible = user.role == 'admin'
        }, err => {
            //the user has logged out, the "go to console button" needs to be removed
            this.goToConsoleVisible = false
        })
    }

    /**
     * Redirects the user to the login page
     */
    login() {
        this.router.navigate(['/public/login'])
    }

    /**
     * Show the user profile page
     */
    showUserProfile() {
        this.router.navigate(['/public/user-profile'])
    }
}