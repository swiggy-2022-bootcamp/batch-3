import { Team } from './team.schema';
import { ITeamModel } from './team.interface';
import { HTTP401Error } from '../../lib/utils/httpErrors';
import { isValidMongoId } from '../../lib/helpers';
import { ObjectID } from 'bson';
import { startSession } from 'mongoose';
import { Meet } from '../meeting/meet.schema';
import meetModel from '../meeting/meet.model';
class TeamModel {

    private default = "startDate endDate createdAt attendees title"

    public async create(body: any, email: string) {
        if (!body.name) {
            throw new HTTP401Error('Missing Fields');
        }
        body = { ...body, members: [] };
        body.members.push(email);
        let t: ITeamModel = new Team(body);
        await t.save();
        return { success: true, id: t._id };
    }

    public async fetchTeamMeets(id: string) {
        if (!isValidMongoId(id)) {
            throw new HTTP401Error('Not a valid mongoDb Id')
        }
        const data = await Meet.find({ teamId: new ObjectID(id) });
        return data;
    }

    public async leave(id: string, email: string) {
        if (isValidMongoId(id)) {
            let session = await startSession();
            session.startTransaction();
            try {
                await Team.updateOne({ _id: new ObjectID(id) }, { $pull: { members: email } }, { session })
                await Meet.updateMany({ teamId: new ObjectID(id) }, { $pull: { attendees: email } }, { session })
                await session.commitTransaction();
                session.endSession();
                return { success: true }
            } catch (e) {
                await session.abortTransaction();
                session.endSession();
            }
        } else {
            throw new HTTP401Error('Invalid MongoDb Id')
        }
    }

    public async createMeeting(body: any, id: string, email: string) {
        if (isValidMongoId(id)) {
            let team = await Team.findOne({ $and: [{ _id: new ObjectID(id) }, { members: email }] });       
            if (team) {
                return await meetModel.create({ ...body, teamId: id, attendees: team.members }, email);
            } else {
                throw new HTTP401Error('No Such Team Exists')
            }
        } else {
            throw new HTTP401Error('Invalid MongoDb Id')
        }
    }
}

export default new TeamModel();