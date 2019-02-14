import { Description } from './description'
import { GeoPoint } from 'firebase/firestore'

export interface Place {
    title: string
    placeId?: string
    address: {
        title: string
        geopoint?: GeoPoint
    }
    association?: string
    descriptions?: Description[]
    defaultDescription?: number
}