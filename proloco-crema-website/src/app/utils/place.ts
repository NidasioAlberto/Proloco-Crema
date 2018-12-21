import { Description } from './description'

export interface Place {
    title: string
    placeId?: string
    address: string
    association?: string
    descriptions?: Description[]
    defaultDescription?: number
}