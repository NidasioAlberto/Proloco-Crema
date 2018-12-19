import { Description } from './description'

export interface Place {
    placeId?: string
    address: string
    association?: string
    title: string
    descriptions?: Description[]
    defaultDescription?: number
}