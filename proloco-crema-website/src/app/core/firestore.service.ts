import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { AuthService } from './auth.service'
import { map } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {
    constructor(private firestore: AngularFirestore, private auth: AuthService) { }

    getUserData(uid?: string) {//}: Promise<any> {
        if(!uid) {
            uid = this.auth.getUser().uid
        }
        console.log('uid', uid)
        console.log(this.auth.getUser())
        return this.firestore.collection('Users').doc(uid).snapshotChanges().pipe(
            map(data => {
                return data.payload.data()
            })
        )
    }
}
