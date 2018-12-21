import { Description } from './description'
import { DocumentReference } from '@angular/fire/firestore'

export interface Path {
    title: Description
    description: Description
    pathId?: string
    association?: string
    places?: DocumentReference[]
    order: {
        type: string
    }
}