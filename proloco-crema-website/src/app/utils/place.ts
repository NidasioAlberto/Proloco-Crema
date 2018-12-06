import { Description } from './description'

export interface Place {
    placeId: string
    address: string
    association: string
    title: string
    descriptions: {
        default: number
        texts: Description[]
    }
    defaultDescription: number
}