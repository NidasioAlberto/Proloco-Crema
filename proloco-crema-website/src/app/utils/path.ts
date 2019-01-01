import { Description } from './description'
import { DocumentReference } from '@angular/fire/firestore'
import { Place } from './place';

export interface Path {
    title: Description
    description: Description
    pathId?: string
    association?: string
    places?: DocumentReference[]
    placesData?: Place[]
    order: {
        type: string
    }
}