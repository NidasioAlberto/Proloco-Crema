import { Injectable } from '@angular/core'
import { AngularFirestore, associateQuery } from '@angular/fire/firestore'
import { AuthService } from './auth.service'
import { Observable, Observer } from 'rxjs'
import { UserData, Association } from '../utils/user-data'
import { map } from 'rxjs/operators';
import { Place } from '../utils/place';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    /**
     * This observable contains the user data stored in the firestore
     * if the user logs out an error occurs
     */
    user: Observable<UserData> = Observable.create((observer: Observer<UserData>) => {
        //when the user changes the observable needs to change as well
        this.auth.user.subscribe(user => {
            if(user) {
                //if the user is logged in we can retrieve it's data
                this.firestore.collection('Users').doc(user.uid).valueChanges().subscribe(data => {
                    observer.next(data)
                })
            } else {
                //otherwise the user data will be null the we can throw an error
                observer.next(null)
            }
        })
    })

    constructor(private firestore: AngularFirestore, private auth: AuthService) { }

    getAssociationData(associationId: string) {
        return this.firestore.collection('Associations').doc(associationId).valueChanges().pipe(
            map((associationData: Association) => {
                associationData.id = associationId
                return(associationData)
            })
        )
    }

    getPlaces(associationId: string) {
        return this.firestore.collection('Places', ref => ref.where('association', '==', associationId)).valueChanges().pipe(
            map((places: Place[]) => {
                places.forEach(place => {
                    place.descriptions.texts.forEach(description => {
                        description.languages = Object.keys(description)
                    })
                })
                return places
            })
        )
    }

    setDefaultDescription(associationId, placeIndex, defaultDescription) {
        //...
    }
}
