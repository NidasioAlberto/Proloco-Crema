import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../core/auth.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private auth: AuthService) { }

    ngOnInit() {
    }

    login() {
        this.auth.googleLogin().then(user => {
            //we have the user !
            console.log(user)
        })
    }
}
