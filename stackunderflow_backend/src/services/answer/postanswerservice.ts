import { Answers } from "../../entities/answer";
import { findQuestionByPk, postAnswer } from "../../repositories/question"
import { CustomError } from "../../utils/common/CustomError";
import { UNIQUE_KEY_ALREADY_PRESENT } from "../../utils/errorcodes/dberrorcodes";

interface PostAnswerServiceParameters {
    userId: number,
    questionId: number,
    answer: string
}

export const PostAnswerService = async ({userId, questionId, answer}: PostAnswerServiceParameters): Promise<Answers>=> {
    if (!questionId && !answer) {
        throw new CustomError("all parameters required", 400);
    }
    
    const question = await findQuestionByPk(questionId);
    if (!question) {
        throw new CustomError("question not found", 404);
    }

    try {
        console.log("Post QUESTIONID: ", questionId);
        return await postAnswer(userId, questionId, answer);
    } catch (e) {
        if (e.code && e.code == UNIQUE_KEY_ALREADY_PRESENT) {
            console.log("error code :", e.code);
            throw new CustomError("answer already posted by you on this question", 400);
        } 
        console.log("PostAnswer: ", e);
        throw new CustomError("an error occurred while posting answer", 500);
    }
}
