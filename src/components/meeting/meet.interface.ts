import { Document } from 'mongoose'
export interface IMeet {
    startTime: string,
    endTime: string,
    title: string,
    date:string,
    attendees: [string],
    creator: string,
    teamId?: string
}

export interface IMeetModel extends IMeet, Document {
    add(): any,
    checkDoubleBooking(date:string,startTime:string,endTime:string,email:string):any
}