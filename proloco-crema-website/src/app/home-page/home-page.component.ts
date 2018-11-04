import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
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

    constructor(private router: Router) { }

    ngOnInit() {
    }

    login() {
        this.router.navigate(['/public/login'])
    }
}