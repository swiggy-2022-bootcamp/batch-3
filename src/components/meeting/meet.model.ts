import { Meet } from './meet.schema';
import { IMeetModel } from './meet.interface';
import { HTTP401Error } from '../../lib/utils/httpErrors';
import { isValidMongoId } from '../../lib/helpers';
import { ObjectID } from 'bson';
class MeetModel {

    private default = "startDate endDate createdAt attendees title"

    public async create(body: any, email: string) {
        if (!body.startDate || !body.endDate || !body.title || !body.attendees || !Array.isArray(body.attendees)) {
            throw new HTTP401Error('Fields Missing')
        }
        body.attendees.push(email);
        body.creator = email;
        let m: IMeetModel = new Meet(body);
        await m.save();
        return { meetingId: m._id };
    }

    public async fetchAllMeets(email: string) {
        return await Meet.find({ attendees: email }).select(this.default).lean();
    }

    public async fetchMeetingByid(id: string) {
        if (isValidMongoId(id)) {
            let m = await Meet.findById(id).select(this.default).lean();
            if (m) {
                return m;
            } else {
                throw new HTTP401Error('No such meeting exist')
            }
        } else {
            throw new HTTP401Error('Not a Valid Mongodb Id')
        }
    }

    public async dropOff(id: string, email: string) {
        if (isValidMongoId(id)) {
            await Meet.updateOne({ _id: new ObjectID(id) }, { $pull: { attendees: email } }, { runValidators: true });
            return { success: true }
        } else {
            throw new HTTP401Error('Not a Valid Mongodb Id')
        }
    }

}

export default new MeetModel();