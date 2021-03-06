import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../core/auth.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit() {
    }

    login() {
        this.auth.googleLogin().then(user => {
            //we have the user !
            if(user != undefined) this.router.navigate(['/public/user-profile'])
        }).catch(err => {
            console.log('error!', err)
        })
    }
}
