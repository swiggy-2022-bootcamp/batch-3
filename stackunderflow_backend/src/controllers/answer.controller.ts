import { Get, Route } from "tsoa";
import { DownvoteAnswerService } from "../services/answer/downvoteanswerservice";
import { UpvoteAnswerService } from "../services/answer/upvoteanswerservice";
import { getTokenFromHeaders } from "../utils/common/getTokenFromHeader";
import { getUserPkFromToken } from "../utils/common/getUserPkFromToken";
import { responseHandler } from "../utils/common/ResponseHandler";

@Route("answer")
export default class QuestionController {

  @Get("/{answerId}/upvote")
  public async upvoteAnswer (req :any, res: any) {
    console.log("Inside upvote answer");
    console.log(req.params.questionId);
    try {
      const token = getTokenFromHeaders(req);
      const userId: number = getUserPkFromToken(token);
      const answerId: number = req.params.answerId;
      const message = await UpvoteAnswerService(userId, answerId);
      responseHandler(res, {
        message: message
      }, 200);
    } catch(e) {
      responseHandler(res, {
        error: e.message
      }, e.statusCode);
    }
  }

  @Get("/{answerId}/downvote")
  public async downvoteAnswer (req :any, res: any) {
    console.log("Inside downvote answer");
    console.log(req.params.questionId);
    try {
      const token = getTokenFromHeaders(req);
      const userId: number = getUserPkFromToken(token);
      const answerId: number = req.params.answerId;
      const message = await DownvoteAnswerService(userId, answerId);
      responseHandler(res, {
        message: message
      }, 200);
    } catch(e) {
      responseHandler(res, {
        error: e.message
      }, e.statusCode);
    }
  }
}
