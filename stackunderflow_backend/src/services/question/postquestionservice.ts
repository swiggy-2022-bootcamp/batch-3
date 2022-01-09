import { Users } from "../../entities";
import { findUserByPk } from "../../repositories/user";
import { postQuestion } from "../../repositories/question";
import { Questions } from "../../entities/question";
import { getUserPkFromToken } from "../../utils/common/getUserPkFromToken";
import { CustomError } from "../../utils/common/CustomError";

class QuestionDetails {
    title: string;
    body: string;
}

interface PostQuestionParameters {
    token: string;
    questionDetails: QuestionDetails;
}

export const PostQuestionService = async ({token, questionDetails} : PostQuestionParameters) :Promise<Questions> => {
    const userId: number = getUserPkFromToken(token);
    const title: string = questionDetails.title;
    const body: string = questionDetails.body;

    if (!title || !body) {
        throw new CustomError("question details not found", 400)
    }

    try {
        const question = await postQuestion(title, body, userId);
        return question
    } catch (e) {
        throw new CustomError("an error occurred while posting question", 500)
    }
}

