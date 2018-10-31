import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { auth } from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider)
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/'])
    })
  }

  getUser() {
    console.log(this.afAuth.auth.currentUser)
    return(this.afAuth.auth.currentUser != null)
  }
}