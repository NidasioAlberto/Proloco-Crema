import { Description } from './description'

export interface Place {
    title: string
    placeId?: string
    address: {
        title: string
        geopoint?: firebase.firestore.GeoPoint
    }
    association?: string
    descriptions?: Description[]
    defaultDescription?: number,
    photoUrl?: string
}