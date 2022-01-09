import { Answers } from "../../entities/answer";
import { getAllAnswer } from "../../repositories/question";

export const getAllAnswerForQuestionService = async (questionId: number): Promise<Answers[]> => {
    try {
        const answers = await getAllAnswer(questionId);
        return answers
    } catch (e) {
        console.log(e);
        throw new Error("error while getting all answers")
    }
}
