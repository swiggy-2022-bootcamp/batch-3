import { NextFunction, Request, Response } from "express";
import teamModel from "./team.model";
import ResponseHandler from "../../lib/helpers/responseHandler";
import { team as msg } from "../../lib/helpers/customMessage";
import { Team } from "./team.schema";
class MeetController {
    public fetchAll = async (req: Request, res: Response, next: NextFunction) => {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler.reqRes(req, res).onFetch(msg.FETCH_ALL, await Team.find({ members: req.userId }).lean()).send();
        } catch (e) {
            // send error with next function.
            next(responseHandler.sendError(e));
        }
    };

    public fetchTeamMeets = async (req: Request, res: Response, next: NextFunction) => {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler.reqRes(req, res).onFetch(msg.FETCH_TEAM_MEET, await teamModel.fetchTeamMeets(req.params.id)).send();
        } catch (e) {
            // send error with next function.
            next(responseHandler.sendError(e));
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction) => {
        const responseHandler = new ResponseHandler();
        try {
            let data = await teamModel.create(req.body['team'], req.userId);
            responseHandler
                .reqRes(req, res)
                .onCreate(msg.CREATED, data)
                .send();
        } catch (e) {
            next(responseHandler.sendError(e));
        }
    };

    public createMeeting = async (req: Request, res: Response, next: NextFunction) => {
        const responseHandler = new ResponseHandler();
        try {
            let data = await teamModel.createMeeting(req.body['meeting'], req.params.id, req.userId);
            responseHandler
                .reqRes(req, res)
                .onCreate(msg.TEAM_MEETING, data)
                .send();
        } catch (e) {
            next(responseHandler.sendError(e));
        }
    };

    public leave = async (req: Request, res: Response, next: NextFunction) => {
        const responseHandler = new ResponseHandler();
        try {
            let data = await teamModel.leave(req.params.id, req.userId);
            responseHandler
                .reqRes(req, res)
                .onCreate(msg.LEAVE, data)
                .send();
        } catch (e) {
            next(responseHandler.sendError(e));
        }
    };

    public removeFromTeam = async (req: Request, res: Response, next: NextFunction) => {
        const responseHandler = new ResponseHandler();
        try {
            let data = await teamModel.removeFromTeam(req.body.id, req.userId, req.body.email);
            responseHandler
                .reqRes(req, res)
                .onCreate(msg.LEAVE, data)
                .send();
        } catch (e) {
            next(responseHandler.sendError(e));
        }
    };

}

export default new MeetController();

