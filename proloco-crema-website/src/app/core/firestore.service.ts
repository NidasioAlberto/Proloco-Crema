import { Injectable } from '@angular/core'
import { AngularFirestore, associateQuery } from '@angular/fire/firestore'
import { AuthService } from './auth.service'
import { Observable, Observer } from 'rxjs'
import { UserData, Association } from '../utils/user-data'
import { map } from 'rxjs/operators'
import { Place } from '../utils/place'
import { Description } from '../utils/description'
import { firestore } from 'firebase'

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

    /**
     * It retrieves all the data saved in the selected association document
     * @param associationId id of the association
     * @returns an observable of the association data
     */
    getAssociationData(associationId: string) {
        return this.firestore.collection('Associations').doc(associationId).valueChanges().pipe(
            map((associationData: Association) => {
                associationData.id = associationId
                return(associationData)
            })
        )
    }

    /**
     * It retrieves all the places associated with the given association
     * @param associationId id of the association
     * @returns an observable of places
     */
    getPlaces(associationId: string) {
        return this.firestore.collection('Places', ref => ref.where('association', '==', associationId)).snapshotChanges().pipe(
            map(places => {
                return places.map(place => {
                    var data = place.payload.doc.data() as Place

                    //add the document id to the data
                    data.placeId = place.payload.doc.id

                    if(data.descriptions != undefined) {
                        //add the languages qty to each description
                        data.descriptions.forEach(description => {
                            description.languages = Object.keys(description)
                        })
                    }
                    return data
                })
            })
        )
    }

    /**
     * Change the default description of a given place
     * @param placeId the place id of which the default description will changed
     * @param defaultDescription the value to set
     */
    setDefaultDescription(placeId: string, defaultDescription: number) {
        console.log(placeId, defaultDescription)

        return this.firestore.collection('Places').doc(placeId).update({
            defaultDescription: defaultDescription
        })
    }

    /**
     * This function add in the firestore the place the user wants to create
     * @param place the data we want to add
     * @returns a promise of the document reference to the new place
     */
    createNewPlace(place: Place) {
        return this.firestore.collection('Places').add(place)
    }

    updatePlace(placeId: string, toUpdate: Place) {
        return this.firestore.collection('Places').doc(placeId).update(toUpdate)
    }

    addDescription(placeId: string, description: Description) {
        delete description.languages

        return this.firestore.collection('Places').doc(placeId).update({
            descriptions: firestore.FieldValue.arrayUnion(description)
        })
    }
}
