import { Document, Model, model, Schema } from "mongoose";
import { IMeet, IMeetModel } from "./meet.interface";
import { HTTP401Error } from '../../lib/utils/httpErrors';
export const MeetSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        date: { type: Date, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        attendees: [String],
        creator: String,
        teamId: { type: Schema.Types.ObjectId, ref: 'Teams' }
    },
    {
        timestamps: true
    }
);

MeetSchema.pre<IMeetModel>('save', async function (next) {
    let existingMeeting = await this.checkDoubleBooking(this.date, this.startTime, this.endTime, this.creator);
    if (existingMeeting) {
        throw new HTTP401Error('Meetings already exist in this time slot')
    } else {
        next()
    }
})


MeetSchema.methods.checkDoubleBooking = async (date: string, startTime: string, endTime: string, email: string) => {
    let condition = {
        $and: [{ date: date }, { attendees: email }, {
            $or: [{
                $and: [{ startTime: { $lte: startTime } }, { endTime: { $gt: startTime } }]
            },
            {
                $and: [{ startTime: { $lt: endTime } }, { endTime: { $gte: endTime } }]
            },
            {
                $and: [{ startTime: { $gte: startTime } }, { endTime: { $lte: endTime } }]
            }]
        }]
    }
    return await Meet.findOne(condition).lean();
}

export const Meet: Model<IMeetModel> = model<IMeetModel>("Meet", MeetSchema);