import { NextFunction, Request, Response } from "express";
import meetModel from "./meet.model";
import ResponseHandler from "../../lib/helpers/responseHandler";
import { user as msg } from "../../lib/helpers/customMessage";

class MeetController {
    public fetchAll = async (req: Request, res: Response, next: NextFunction) => {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler.reqRes(req, res).onFetch('All Meetings Fetched', await meetModel.fetchAllMeets(req.userId)).send();
        } catch (e) {
            // send error with next function.
            next(responseHandler.sendError(e));
        }
    };

    public fetchById = async (req: Request, res: Response, next: NextFunction) => {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler.reqRes(req, res).onFetch('Meeting fetched by Id', await meetModel.fetchMeetingByid(req.params.id)).send();
        } catch (e) {
            // send error with next function.
            next(responseHandler.sendError(e));
        }
    };


    public create = async (req: Request, res: Response, next: NextFunction) => {
        const responseHandler = new ResponseHandler();
        try {
            let data = await meetModel.create(req.body['meeting'], req.userId);
            responseHandler
                .reqRes(req, res)
                .onCreate('New Meet Created', data)
                .send();
        } catch (e) {
            next(responseHandler.sendError(e));
        }
    };

    public dropOff = async (req: Request, res: Response, next: NextFunction) => {
        const responseHandler = new ResponseHandler();
        try {
            let data = await meetModel.dropOff(req.params.id, req.userId);
            responseHandler
                .reqRes(req, res)
                .onCreate('Droped Off from the meeting', data)
                .send();
        } catch (e) {
            next(responseHandler.sendError(e));
        }
    };

    public fetchByCondition = async (req: Request, res: Response, next: NextFunction) => {
        const responseHandler = new ResponseHandler();
        try {
            let data = await meetModel.fetchMeetingsByCondition(req.query, req.userId);
            responseHandler
                .reqRes(req, res)
                .onCreate('Filtered Meetings', data)
                .send();
        } catch (e) {
            next(responseHandler.sendError(e));
        }
    };

}

export default new MeetController();

