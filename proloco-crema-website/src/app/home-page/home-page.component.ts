import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../core/auth.service'

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
        }
    ]
    activeLink = this.links[0]

    constructor(private router: Router, private auth: AuthService) {
        //subscribe to the user account to show the photo in the top right
        this.auth.user.subscribe(user => {
            if(user != undefined) this.userPhotoUrl = user.photoURL
            else this.userPhotoUrl = null
        }, err => {
            console.log('error !', err)
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