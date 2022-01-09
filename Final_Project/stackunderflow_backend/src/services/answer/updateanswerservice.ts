import { Answers } from "../../entities/answer";
import { getAnswer, updateAnswer } from "../../repositories/question";
import { CustomError } from "../../utils/common/CustomError";

export const UpdateAnswerService = async (questionId: number, userId: number, answer: string ) => {
    if (!(questionId && answer)) {
        throw new CustomError("all parameters needed", 400);
    }
    const oldAnswer :Answers = await getAnswer(questionId, userId);
    if (!oldAnswer) {
        throw new CustomError("no answer by you found for this question", 404);
    }

    try {
        await updateAnswer(oldAnswer.pk, userId, questionId, answer, oldAnswer.votes);
    } catch (e) {
        throw new CustomError("an error occurred while updating the answer", 500);
    }
}
