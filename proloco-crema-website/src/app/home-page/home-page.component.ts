import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../core/auth.service'

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

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

    constructor(private router: Router, private auth: AuthService) {
        this.auth.user.subscribe(user => {
            console.log('user photo url: ', user.photoURL)
            this.userPhotoUrl = user.photoURL
        })
    }

    ngOnInit() {
    }

    login() {
        this.router.navigate(['/public/login'])
    }

    showUserProfile() {
        this.router.navigate(['/public/user-profile'])
    }
}