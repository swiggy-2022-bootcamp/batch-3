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
        if (!body.members) {
            body.members = []
        }
        body.members.push(email);
        body.creator=email;
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
            let t = await Team.findOne({ _id: id, members: email }).lean();
            if (!t) {
                throw new HTTP401Error('No such team exist/ you are not a member');
            }
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

    public async addToTeam(id: string, email: string, member: string) {
        if (isValidMongoId(id)) {
            let t = await Team.findOne({ _id: id, members: email }).lean();
            if (t.creator !== email) {
                throw new HTTP401Error('Only the creator can add a member');
            }
            let session = await startSession();
            session.startTransaction();
            try {
                await Team.updateOne({ _id: new ObjectID(id) }, { $addToSet: { members: member } }, { session })
                await Meet.updateMany({ teamId: new ObjectID(id) }, { $addToSet: { attendees: member } }, { session })
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

    public async removeFromTeam(id: string, email: string, member: string) {
        if (isValidMongoId(id)) {
            let t = await Team.findOne({ _id: id, members: email }).lean();
            if (t.creator !== email) {
                throw new HTTP401Error('Only the creator can remove a member');
            }
            let session = await startSession();
            session.startTransaction();
            try {
                await Team.updateOne({ _id: new ObjectID(id) }, { $pull: { members: member } }, { session })
                await Meet.updateMany({ teamId: new ObjectID(id) }, { $pull: { attendees: member } }, { session })
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