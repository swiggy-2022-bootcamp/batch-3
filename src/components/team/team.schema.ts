import { Model, model, Schema } from "mongoose";
import { ITeamModel } from "./team.interface";

export const TeamSchema: Schema = new Schema(
    {
        name: String,
        members: [String],
        creator: String
    },
    {
        timestamps: true
    }
);


export const Team: Model<ITeamModel> = model<ITeamModel>("Team", TeamSchema);