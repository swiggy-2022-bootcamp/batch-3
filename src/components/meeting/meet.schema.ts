import { Document, Model, model, Schema } from "mongoose";
import { IMeet, IMeetModel } from "./meet.interface";

export const MeetSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        attendees: [String],
        creator: String,
        teamId:{type:Schema.Types.ObjectId,ref:'Teams'}
    },
    {
        timestamps: true
    }
);


export const Meet: Model<IMeetModel> = model<IMeetModel>("Meet", MeetSchema);