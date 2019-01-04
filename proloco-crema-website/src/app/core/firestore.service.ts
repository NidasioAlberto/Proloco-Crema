import { Injectable } from '@angular/core'
import { AngularFirestore, associateQuery, DocumentReference } from '@angular/fire/firestore'
import { AuthService } from './auth.service'
import { Observable, Observer } from 'rxjs'
import { UserData, Association } from '../utils/user-data'
import { map, first, take } from 'rxjs/operators'
import { Place } from '../utils/place'
import { Description } from '../utils/description'
import * as firebase from 'firebase/app'
import { Path } from '../utils/path';

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

                    data.descriptions = this.addDescriptionLanaguagesToDescriptions(data.descriptions)

                    return data
                })
            })
        )
    }

    /**
     * It retrieve the place data from it's document reference
     * @param placeRef The place's document reference
     */
    getPlace(placeRef: DocumentReference) {
        if(placeRef != undefined) {
            return this.firestore.doc<Place>(placeRef).valueChanges().pipe(
                map(place => {
                    place.descriptions = this.addDescriptionLanaguagesToDescriptions(place.descriptions)

                    return place
                })
            )
        } else {
            return undefined
        }
    }

    /**
     * It adds a languages list to each description in the given array
     * @param descriptions the array of descriptio to which add the languages list
     */
    addDescriptionLanaguagesToDescriptions(descriptions: Description[]) {
        if(descriptions != undefined) descriptions.forEach(description => {
            description.languages = Object.keys(description)
        })

        return descriptions
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

    /** 
     * It updates the data of one place given the id
     * @param placeId the place id to change
     * @param toUpdate this is the data to set
     */
    updatePlace(placeId: string, toUpdate: Place) {
        return this.firestore.collection('Places').doc(placeId).update(toUpdate)
    }

    addDescription(placeId: string, description: Description) {
        delete description.languages

        return this.firestore.collection('Places').doc(placeId).update({
            descriptions: firebase.firestore.FieldValue.arrayUnion(description)
        })
    }

    /**
     * It retrieves all the paths associated with the given association
     * @param associationId id of the association
     * @returns an observable of paths
     */
    getPaths(associationId: string) {
        return this.firestore.collection('Paths', ref => ref.where('association', '==', associationId)).snapshotChanges().pipe(
            map(paths => {
                return paths.map(path => {
                    var data = path.payload.doc.data() as Path

                    //add the document id to the data
                    data.pathId = path.payload.doc.id

                    //add the languages to each description
                    data.description.languages = Object.keys(data.description)

                    //add the languages also to the title
                    data.title.languages = Object.keys(data.title)

                    //retrieve the places data
                    var promises = []
                    data.places.forEach(place => {
                        this.firestore.doc<Place>(place).valueChanges().pipe(
                            take(1)
                        ).subscribe(placeData => {
                            if(data.placesData == undefined) data.placesData = []
                            data.placesData.push(placeData)
                        })
                    })

                    return data
                })
            })
        )
    }
}
