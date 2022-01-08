import { Post, Route } from "tsoa";
import { ValidateRequest, ProcessRequest } from "../services/question/postquestionservice";
import {
  postAnswer
} from "../repositories/question";

@Route("question")
export default class QuestionController {
  @Post("/")
  public async postQuestion(req :any, res :any) {
      try {
        const user = await ValidateRequest({userDetails: req.body["user-details"], questionDetails: req.body["question"]});
        const question = await ProcessRequest({userId: user.pk, questionDetails: req.body["question"]});
        responseHandler(res, {
          message: "Question posted",
          questionId: question.pk
        }, 200);
      } catch (e) {
        responseHandler(res, {
          message: "an error occurred while posting the question"
        }, 500);
      } 
  }

  @Post("/{questionId}/answer")
  public async postAnswer(questionId :number, answer :string) {
      console.log("Inside question controllers!");
      postAnswer(questionId, answer);
  }
}

const responseHandler = (res: any, body: any, code: number) => {
  res.status(code);
  res.json(body);
};
