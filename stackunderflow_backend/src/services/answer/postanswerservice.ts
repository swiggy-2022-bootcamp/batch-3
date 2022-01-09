import { Answers } from "../../entities/answer";
import { postAnswer } from "../../repositories/question"

interface PostAnswerServiceParameters {
    userId: number,
    questionId: number,
    answer: string
}

export const PostAnswerService = async ({userId, questionId, answer}: PostAnswerServiceParameters): Promise<Answers>=> {
    try {
        console.log("Post QUESTIONID: ", questionId);
        return await postAnswer(userId, questionId, answer);
    } catch (e) {
        console.log("PostAnswer: ", e);
        throw new Error("error while posting answer")
    }
}
