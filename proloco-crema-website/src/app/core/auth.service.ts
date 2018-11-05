import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { auth } from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class AuthService {

    user: Observable<firebase.User>

    constructor(private afAuth: AngularFireAuth, private router: Router) {
        this.user = this.afAuth.authState
    }

    //opens a new popup page to login with google
    googleLogin() {
        const provider = new auth.GoogleAuthProvider()
        return this.oAuthLogin(provider).then(userCredentials => {
            return userCredentials.user
        })
    }

    private oAuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
    }

    signOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/'])
        }).catch(err => {
            console.log('error while logging out !')
        })
    }

    //this function return the current user object
    getUser() {
        return this.afAuth.auth.currentUser
    }

    logout() {
        this.afAuth.auth.signOut()
    }
}