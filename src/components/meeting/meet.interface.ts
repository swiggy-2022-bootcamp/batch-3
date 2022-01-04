import {Document} from 'mongoose'
export interface IMeet {
    startDate: Date,
    endDate: Date,
    title: string,
    attendees: [string],
    creator:string
} 

export interface IMeetModel extends IMeet , Document{
    add():any
}