import { Answers } from "../../entities/answer";
import { getAllAnswer } from "../../repositories/question";
import { CustomError } from "../../utils/common/CustomError";

export const getAllAnswerForQuestionService = async (questionId: number): Promise<Answers[]> => {
    try {
        const answers = await getAllAnswer(questionId);
        return answers
    } catch (e) {
        console.log(e);
        throw new CustomError("error while getting all answers", 500)
    }
}
