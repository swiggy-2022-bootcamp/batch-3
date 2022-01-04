import { Document } from 'mongoose'
export interface ITeam {
    name: string,
    members: [string]
}

export interface ITeamModel extends ITeam, Document {
    add(): any
}